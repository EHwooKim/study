import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems, removeCartItem, onSuccessBuy } from '../../../_actions/user_actions'
import UserCartBlock from './Sections/UserCartBlock'
import { Empty, Result } from 'antd'
import Paypal from '../../utils/Paypal'

function CartPage(props) {
  const dispatch = useDispatch()

  const [total, setTotal] = useState(0)
  const [showTotal, setShowTotal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    let cartImtes =[]
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach(item => {
          cartImtes.push(item.id)
        })
        dispatch(getCartItems(cartImtes, props.user.userData.cart))
        .then(res => {calculateTotal(res.payload)})
      }
    }
  }, [props.user.userData])

  let calculateTotal = (cartDetail) => {
    let tmp = 0
    cartDetail.map(item => {
      tmp += parseInt(item.price, 10) *  item.quantity
    })
    setTotal(tmp)
    setShowTotal(true)
  }
  
  let removeFromCart = (productId) => {
    dispatch(removeCartItem(productId))
      .then(res => {
        if (res.payload.productInfo.length <= 0) {
          setShowTotal(false)
        }
      })
  }

  const transactionSuccess = (data) => {
    dispatch(onSuccessBuy({
      paymentData: data,
      cartDetail: props.user.cartDetail
    }))
      .then(res => {
        if (res.payload.success) {
          setShowTotal(false)
          setShowSuccess(true)
        }
      })
  }

  return (
    <div style={{ width: '85%', margin: '3rem auto'}}>
      <h1>CartPage</h1>
      <div>
        <UserCartBlock products={props.user.cartDetail} removeItem={removeFromCart}/>
      </div>

      {showTotal ? 
          <div style={{ marginTop: '3rem' }}>
            <h2>Total Amount: ${total}</h2>
          </div> 
          : showSuccess ?
            <Result
              status="success"
              title="Successfully Purchased Item"
            />
            :
            <>
              <br />
              <Empty description={false}/>
              <p>No Items In the Cart</p>
            </>
      }

      <Paypal 
        total={total}
        onSuccess={transactionSuccess}
      />


      
    </div>
  )
}

export default CartPage