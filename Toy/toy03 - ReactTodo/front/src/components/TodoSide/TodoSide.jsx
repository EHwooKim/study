import React, { memo, useState, useEffect, useRef, useContext } from 'react'
import './TodoSide.css'

import { UserContext } from '../../App'
import api from '../../apis/index'


function TodoSide() {
  const [value, setValue] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [followerTodo, setFollowerTodo] = useState([])
  const [clickedFollower, setClickedFollower] = useState('')

  const { Followings } = useContext(UserContext)
  const timeout = useRef(0)

  const onChange = (e) => {
    setValue(e.target.value)
  }
  const onClickBtn = (id) => async () => {
    const result = await api.follow({ id })
    console.log(result)
  }
  const onClickUser = (id, userAccount) => async () => {
    try {
      const result = await api.getUserTodo({ id })
      setFollowerTodo( result.data )
      setClickedFollower(userAccount)
    } catch (e) {
      console.error(e)
    }
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
      <div class="follower-list">
        <h3>친구목록</h3>
        <ul>
          {Followings && Followings.map((v, i) => (
            <li key={v.userAccount + i} onClick={onClickUser(v.id, v.userAccount)}>{v.userAccount}</li>
          ))}
        </ul>
      </div>
      <div className="follower-status">
        {clickedFollower &&
          <> 
            <h3>{clickedFollower}' Todo</h3>
            <ul>
              {
                followerTodo.map((v, i) => (
                  <li key={i}>{v.todo}</li>
                ))
              }
            </ul>
          </> 
        }
      </div>
    </div>
  )
}

export default memo(TodoSide)