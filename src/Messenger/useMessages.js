import { useState, useEffect } from 'react'

function useMessages(url, token, key) {
  const [messages, setMessages] = useState()

  useEffect(() => {
    
    fetch(url, {
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        method: 'GET'
    })
      .then(res => res.json())
      .then(messages => {
        setMessages(messages)
      })
  }, [])

  return messages
}

export default useMessages;