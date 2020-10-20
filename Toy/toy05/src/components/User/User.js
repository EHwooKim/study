import React, { useState, useEffect } from 'react'
import { StyledUsers } from './StyledUsers'
import SkeletonUser from '../Skeleton/SkeletonUser'

function Users() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    setTimeout(async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
      const data = await res.json()
      setProfile(data)
    }, 3000)
  }, [])

  useEffect(() => {
    console.log(profile)
  }, [profile])

  return (
    <StyledUsers>
      <h2>User Details</h2>
      {profile && (
        <>
          <h3>{profile.name}</h3>
          <p>{profile.email}</p>
      <a href={profile.website}>{ profile.website }</a>
        </>
      )}
      {!profile && <SkeletonUser />}
    </StyledUsers>
  )
}

export default Users