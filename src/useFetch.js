import { useState, useEffect } from 'react'

function useFetch(url, opts, key) {
  const [data, setData] = useState()

  useEffect(() => {
    fetch(url, opts)
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
  }, [url, key])

  return data
}

export default useFetch;
