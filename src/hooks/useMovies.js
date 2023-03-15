import notImg from '../image/notImg.png'
import { useState } from 'react'

const API_KEY = '6c0fafb5306d990365d2ccfd48b3550c'

export const useMovies =({search})=>{
    const [allMovies, setAllMovies] = useState([])
    const [searchMovies, setSearchMovies] = useState([])
    const [errorMovies, setErrorMovies] = useState('')
    
    const movies = search ? searchMovies.results :  allMovies.results
    const mappedMovies = movies?.map(movie=>(
        {
        id: movie.id,
        title: movie.title,
        year: movie.release_date,
        poster: `https://image.tmdb.org/t/p/w300/${movie.poster_path}` || notImg,
        description: movie.overview
    }
    ))

    const getMovies = async()=>{
        if(search) {
            const result = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`)
            const movies = await result.json()
            setSearchMovies(movies)
        } else {
            setErrorMovies('No results for your search')
        }
    }

    const bestAllMovies = async() =>{
        console.log('hola');
        const result = await fetch(`https://api.themoviedb.org/3/movie/top_rated?&api_key=${API_KEY}`)
        const movies = await result.json()
        console.log(movies)
        setAllMovies(movies)
    }

    return{ movies : mappedMovies, getMovies, errorMovies, bestAllMovies}
    
}