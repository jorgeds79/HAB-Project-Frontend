import { useState, useEffect } from 'react'

function useUser(url, token) {
  const [user, setUser] = useState()

  useEffect(() => {
    
    fetch(url, {
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        method: 'GET'
    })
      .then(res => res.json())
      .then(user => {
        setUser(user)
      })
  }, [])

  return user
}

export default useUser;