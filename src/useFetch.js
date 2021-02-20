import { useState, useEffect } from 'react'

function useFetch(url, key) {
  const [data, setData] = useState()

  useEffect(() => {
    const opts = {}

    // opts.params = { 'level': 'primaria' }

    fetch(url, opts)
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
  }, [url, key])

  return data
}

export default useFetch;
