import React, { useCallback, memo } from 'react'

const Input = memo(({ value, data, onChange}) => {
  console.log('Input rendered')

  const onChangeValue = useCallback((e) => {
    onChange(data.name, e.target.value)
  }, [data, onChange])

  return (
    <input 
      {...data}
      value = {value}
      autoComplete="off"
      onChange={onChangeValue}
    />
  )
})

export default Input