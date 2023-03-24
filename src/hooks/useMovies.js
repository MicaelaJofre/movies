import { useCallback, useMemo, useRef, useState } from 'react'
import { getSearchMovies } from '../services/movies'
import { getBestAllMovies } from '../services/movies'

export const useMovies =({search, sort})=>{
  const [allMovies, setAllMovies] = useState([])
  const [searchMovies, setSearchMovies] = useState([])
  const [errorMovies, setErrorMovies] = useState('')
  const [loading, setLoading] = useState(false)
  const previousSearch = useRef(search)
    
  const movies = search ? searchMovies :  allMovies

  const getMovies = useCallback(async({search})=>{
    if(search === previousSearch.current)return
    try {
      setLoading(true)
      setErrorMovies(null)
      previousSearch.current = search
      const newMovies = await getSearchMovies({search})
      setSearchMovies(newMovies)
    } catch (error) {
        setErrorMovies(error.message)
    }finally{
        setLoading(false)
    }  
  },[])   

  const bestAllMovies = async() =>{
    try {
      setLoading(true)
      setErrorMovies(null)
      const bestMovies = await getBestAllMovies()
      setAllMovies(bestMovies)
    } catch (error) {
        setErrorMovies(error.message)
    }finally{
        setLoading(false)
    }
}    

  const sortMovies = useMemo(() =>
  sort
  ? [...movies].sort((a,b)=> a.title.localeCompare(b.title))
  : movies 
  , [sort, movies])

  return{ 
    movies: sortMovies, 
    getMovies, 
    bestAllMovies, 
    loading, 
    errorMovies
  }  
}