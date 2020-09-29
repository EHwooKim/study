const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require("../models/Product");
const { Payment } = require("../models/Payment");

const { auth } = require("../middleware/auth");
const async = require('async')

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history,
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/addToCart", auth, (req, res) => {
    // 유저 정보 가져오기 auth 미들웨어덕분에 req.user에서 _id 사용가능 
    User.findOne({ _id: req.user._id },
        (err, userInfo) => {
            let duplicate = false
            userInfo.cart.forEach((item) => {
                if (item.id === req.body.productID) {
                    duplicate = true
                }
            })

            if (duplicate) { // 상품이 이미 카트에 존재
                User.findOneAndUpdate(
                    { _id: req.user._id, "cart.id": req.body.productID },
                    { $inc: { "cart.$.quantity" : 1 }}, // quantity 1 증가
                    { new: true }, // 아래에서 Update된 유저 정보를 받으러면 이 조건이 필요
                    (err, userInfo) => {
                        if (err) return res.status(400).json({ success: false, err })
                        res.status(200).send(userInfo.cart)
                    }
                )
            } else {
                User.findOneAndUpdate(
                    { _id: req.user._id },
                    {
                        $push: {
                            cart: {
                                id: req.body.productID,
                                quantity: 1,
                                date: Date.now()
                            }
                        }
                    },
                    { new: true }, // Update된 정보 받기
                    (err, userInfo) => {
                        if (err) return res.status(400).json({ success: false, err })
                        res.status(200).send(userInfo.cart)
                    }
                )
            }

        })
});

router.get('/removeFromCart', auth, (req, res) => {
    // cart안에 내가 지우려고 한 상품 지우기
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$pull": 
                { "cart": { "id": req.query.id } }
        },
        { new: true },
        (err, userInfo) => {
            let cart = userInfo.cart
            // product collection에서 현재 남아있는 상품들의 정보를 가져오기
            let array = cart.map(item => {
                return item.id
            })
            Product.find({ _id: { $in: array }})
                .populate('writer')
                .exec((err, productInfo) => {
                    return res.status(200).json({
                        productInfo,
                        cart
                    })
                })
        }
    )
})
router.get('/removeFromCart', auth, (req, res) => {
    // cart안에 내가 지우려고 한 상품 지우기
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$pull": 
                { "cart": { "id": req.query.id } }
        },
        { new: true },
        (err, userInfo) => {
            let cart = userInfo.cart
            // product collection에서 현재 남아있는 상품들의 정보를 가져오기
            let array = cart.map(item => {
                return item.id
            })
            Product.find({ _id: { $in: array }})
                .populate('writer')
                .exec((err, productInfo) => {
                    return res.status(200).json({
                        productInfo,
                        cart
                    })
                })
        }
    )
})

router.post('/successBuy', auth, (req, res) => {
    // User collection 안에 history 필드 안에 간단 결제 내역 넣기
    let history = []
    let transactionData = {}

    req.body.cartDetail.forEach((item) => {
        history.push({
            dateOfPurchase: Date.now(),
            name: item.title,
            id: item.id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        })
    })

    // payment collection 안에 상세 결제 내역 넣기
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    transactionData.data = req.body.paymentData
    transactionData.product = history

    // history 정보 저장
    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history: history }, $set: { cart: [] } },
        { new: true },
        (err, user) => {
            if (err) return res.json({ success: false, err })

            // Payment에 transactionData 정보 저장
            const payment = new Payment(transactionData)
            payment.save((err, doc) => {
                if (err) return res.json({ success: false, err })
                
                // product collection 안에 있는 sold 필드 정보 업데이트 시켜주기
                
                // 상품 당 몇개의 quantity를 샀는지
                let products = []
                doc.product.forEach(item => {
                    products.push({ id: item.id, quantity: item.quantity })
                })

                // 반복문으로 Product를 업데이트 시키는 것 너무 코드가 이상하다. 그래서 사용하는 async
                async.eachSeries(products, (item, callback) => {
                    Product.update(
                        { _id: item.id },
                        {
                            $inc: {
                                "sold": item.quantity
                            }
                        },
                        { new: false },
                        callback
                    )
                }, (err) => {
                    if (err) return res.status(400).json({ success: false, err })
                    res.status(200).json({
                        success: true,
                        cart: user.cart,
                        cartDetail: []
                    })
                })
            })

        }
    )
})

module.exports = router;
