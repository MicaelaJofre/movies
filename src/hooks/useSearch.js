import { useEffect, useRef, useState } from "react"

export const useSearch=()=>{
  const [search, setSearch]= useState('')
  const [error, setError] = useState('')
  const isFirstInput = useRef(true)

  
  useEffect(() => {
    if(isFirstInput.current){
      isFirstInput.current = search === ''
      return
    }
    if(search === '') return setError('You must enter a movie to search for')
    if(search.length < 3) return setError('Must have at least three characters')
    if(search.match(/^\d+$/)) return setError(`You can't search for a movie with a number`)
    setError('')
  }, [search])
  

    return{
        search,
        setSearch,
        error
    }
}
