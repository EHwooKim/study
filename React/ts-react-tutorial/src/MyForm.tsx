import React, {useState} from 'react'

// 함수 props 역시 타입을 명시해줘야 한다.
type MyFormProps = {
  onSubmit: (form: { name: string, description: string }) => void
}

function MyForm({ onSubmit }: MyFormProps) {
  const [form, setForm] = useState({
    name: '',
    description: ''
  })
  
  const { name, description } = form
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target // 이 방법으로 onChange 여러 input태그에서 사용하는구나
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(form)
    setForm({
      name: '',
      description: ''
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={name} onChange={onChange}/>
      <input name="description" value={description} onChange={onChange}/>
      <button type="submit"> 등록</button>
    </form>
  )
  
}

export default MyForm