import React from 'react'

function StepButton(props) {
  return (
    <li>
      <button onClick={props.onClick}>{props.desc}</button>
    </li>
  )
}

export default StepButton