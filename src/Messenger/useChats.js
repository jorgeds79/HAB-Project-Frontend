import { useState, useEffect } from 'react'

function useChats(url, token, reload) {
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
  }, [reload])

  return chats
}

export default useChats;