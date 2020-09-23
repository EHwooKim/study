import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems } from '../../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock'

function CartPage(props) {
  const dispatch = useDispatch()

  const [total, setTotal] = useState(0)

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
  }

  return (
    <div style={{ width: '85%', margin: '3rem auto'}}>
      <h1>CartPage</h1>
      <div>
        <UserCardBlock products={props.user.cartDetail}/>
      </div>
      <div style={{ marginTop: '3rem' }}>
        <h2>Total Amount: ${total}</h2>
      </div>
      
    </div>
  )
}

export default CartPage