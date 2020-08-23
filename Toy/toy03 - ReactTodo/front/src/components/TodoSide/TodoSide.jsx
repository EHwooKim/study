import React, { memo, useState, useEffect, useRef } from 'react'
import './TodoSide.css'

import api from '../../apis/index'


function TodoSide() {
  const [value, setValue] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const timeout = useRef(0)

  const onChange = (e) => {
    setValue(e.target.value)
  }
  const onClickBtn = (id) => () => {
    console.log(id)
  }
  

  useEffect(() => { // 친구찾기 관련
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
    setSearchResults([]) // 입력 바뀌면 검색결과 없애기
    if (value.trim().length !== 0) { // 공백일때 작동안하게
      timeout.current = setTimeout(async () => {
        const payload = { 
          userAccount: value
        }
        const results = await api.searchUser(payload)
        console.log('Todoside', results.data)
        setSearchResults(results.data) // 검색결과 없을 때 처리해야해..

      }, 1000)
    }
  }, [value])

  return (
    <div className="todo-side-container">
      <input type="text" className="search-input" onChange={onChange} placeholder="친구 검색"/>
      <div className="search-results">
        {
          value && !searchResults.length ? 
          <div class="loading-container"><span class="loading"></span></div> :
          <ul>
            {searchResults.map((v) => (
              <li key={v.id}>
                <span>{v.userAccount}</span>
                <button onClick={onClickBtn(v.id)}>친구맺기</button>
              </li>
            ))}
          </ul>
        }
      </div>
    </div>
  )
}

export default memo(TodoSide)