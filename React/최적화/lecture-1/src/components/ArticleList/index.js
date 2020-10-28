import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Skeleton from '../Skeleton/SkeletonArticle'
import Article from '../Article'
import './index.css'

function ArticleList(props) {
  const [articles, setArticles] = useState([])

  // 게시글 리스트 가져오기
  const getArticles = useCallback(() => {
    axios.get('http://localhost:3001/articles').then(success => {
      setArticles([...success.data])
    })
  }, [])

  useEffect(() => {
    getArticles()
  }, [getArticles])

  return (
    <ul className={'ArticleList'} style={{ listStyle: 'none', padding: 0 }}>
      {articles.map(item => (
        <li key={item.id}>
          <Link to={`/view/${item.id}`} style={{ textDecoration: 'none', color: 'initial' }}>
            <Article {...item} />
          </Link>
        </li>
      ))}
      {!articles.length && [1, 2, 3, 4, 5].map(() => <Skeleton/>)}
    </ul>
  )
}

export default ArticleList
