import { useState, useEffect } from "react"

function useQuery(url) {
  const [data, setData] = useState()

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setData(data))
  }, [])

  return data
}

function useIsFave(name) {

  const [isFave, setIsFave] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:3000/favourites?name=${name}`)
      .then(res => res.json())
      .then(data => setIsFave(!!data?.length))
  }, [])

  return isFave
}

export { useQuery, useIsFave }