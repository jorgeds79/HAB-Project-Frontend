import { useState, useEffect } from 'react'

function useChats(url, token, key) {
  const [chats, setChats] = useState()

  useEffect(() => {
    
    fetch(url, {
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        method: 'GET'
    })
      .then(res => res.json())
      .then(chats => {
        setChats(chats)
      })
  }, [key])

  return chats
}

export default useChats;