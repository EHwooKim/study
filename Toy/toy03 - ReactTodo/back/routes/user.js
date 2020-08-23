const express = require('express');
const bcrypt = require('bcrypt')
const passport = require('passport')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')
const { Op } = require('sequelize')
const { User } = require('../models');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res, next) => {
  const user = req.user
  res.json(user)
})

// 회원가입
router.post('/signup', isNotLoggedIn, async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 12)
    const exUser = await User.findOne({
      where: {
        userAccount: req.body.userAccount
      }
    })
    if (exUser) {
      return res.status(403).json({
        errorCode:1,
        message: '이미 회원가입되어있습니다.'
      })
    }
    await User.create({
      userAccount: req.body.userAccount,
      password: hash,
      githubAccount: req.body.githubAccount
    })
    return res.status(200).send('회원가입 성공')
    // 회원가입 후 바로 로그인 - 잠시 주석
    // passport.authenticate('local', (err, user, info) => {
    //   if (err) {
    //     console.error(err)
    //     return next(err)
    //   }
    //   if (info) {
    //     return res.status(401).send(info.reason)
    //   }
    //   return req.login(user, async (err) => {
    //     if (err) {
    //       console.error(err)
    //       return next(err)
    //     }
    //     return res.json(user)
    //   })
    // })(req, res, next)
  } catch (err) {
    console.log('6')
    console.error(err)
    return next(err)
  }
});

// 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
  console.log('0')
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log('1')
      console.error(err)
      return next(err)
    }
    if (info) {
      console.log('2')
      return res.status(401).send(info.reason)
    }
    return req.login(user, async (err) => {
      if (err) {
        console.log('3')
        console.error(err)
        return next(err)
      }
      console.log('4')
      return res.json(user)
    })
  })(req, res, next)
});

// 로그아웃
router.get('/logout', isLoggedIn, (req, res) => {
  if (req.isAuthenticated()) {
    req.logout()
    req.session.destroy()
    return res.status(200).send('로그아웃 되었습니다.')
  }
});

router.get('/search', async (req, res) => {
  const { userAccount } = req.query
  const results = await User.findAll({
    where: {
      userAccount: { 
        [Op.substring]: userAccount
      },
      id: {
        [Op.not]: req.user.id
      },
      isAdmin: false
    },
    attributes: ['id', 'userAccount']
  })
  res.send(results)
})

module.exports = router;
