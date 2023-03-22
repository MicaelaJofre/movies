import { useEffect, useState } from "react"
import { popularMovies } from "../services/movies"

export const useSliderMovies =()=>{
  const [listPopularMovies, setListPopularMovies] = useState([])

  useEffect(() => {
    const getPopularMovies = async()=>{
      const list = await popularMovies()
      setListPopularMovies(list)
    }
    getPopularMovies()
  }, [])
  

    return{
      listPopularMovies
    }
}