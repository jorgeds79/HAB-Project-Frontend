import { useState, useEffect } from 'react'

function useTransactions(url, token, reload) {
  const [transactions, setTransactions] = useState()

  useEffect(() => {
    
    fetch(url, {
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        method: 'GET'
    })
      .then(res => res.json())
      .then(transactions => {
        setTransactions(transactions)
      })
  }, [reload])

  return transactions
}

export default useTransactions;