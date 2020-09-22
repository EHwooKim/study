import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems } from '../../../_actions/user_actions'

function CartPage(props) {
  const dispatch = useDispatch()

  useEffect(() => {

    let cartImtes =[]

    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach(item => {
          cartImtes.push(item.id)
        })

        dispatch(getCartItems(cartImtes, props.user.userData.cart))
      }
    }
  }, [props.user.userData])
  return (
    <div>
      CartPage
    </div>
  )
}

export default CartPage