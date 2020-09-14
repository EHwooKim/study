import React, { useState, useEffect } from 'react'
import { Collapse, Checkbox } from 'antd'

const { Panel } = Collapse

function CheckBox(props) {
  const [checked, setChecked] = useState([])

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]
    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked) 
    props.handleFilters(newChecked)
  }

  const renderCheckBoxLists = () => props.list && props.list.map((value, index) => (
    <React.Fragment key={index}>
      <Checkbox onChange={() => handleToggle(value._id)}
          checked={checked.indexOf(value._id) === -1 ? false : true}/>
        <span>{value.name}</span>
    </React.Fragment>
  ))

  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="This is panel header 1" key="1">
          {renderCheckBoxLists()}
        </Panel>
      </Collapse>
    </div>
  )
}

export default CheckBox
