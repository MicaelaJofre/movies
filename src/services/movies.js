import notImg from '../image/notImg.png'

const API_KEY = '6c0fafb5306d990365d2ccfd48b3550c'

export const getSearchMovies = async ({search})=>{
    if(search === '' ) return null
    try {
        const result = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`)
        const json = await result.json()
        const movies = json.results
        return movies?.map(movie=>(
                {
                id: movie.id,
                title: movie.title,
                year: movie.release_date,
                poster: movie.poster_path 
                ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
                : notImg,
                description: movie.overview
            }
        ))
        
    } catch (error) {
        throw new Error('No results for your search')        
    }
    
    
}

export const getBestAllMovies = async() =>{
    try {
        const result = await fetch(`https://api.themoviedb.org/3/movie/top_rated?&api_key=${API_KEY}`)
        const json = await result.json()
        const movies = json.results
        return movies?.map(movie=>(
            {
                id: movie.id,
                title: movie.title,
                year: movie.release_date,
                poster: `https://image.tmdb.org/t/p/w300/${movie.poster_path}` || notImg,
                description: movie.overview
            }
        ))
    } catch (error) {
        throw new Error('Not best movies') 
    }
}

export const popularMovies = async()=>{
    try {
        const result = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
        const json = await result.json()
        const movies = json.results
        return movies?.map(movie=>(
            {
                id: movie.id,
                poster: `https://image.tmdb.org/t/p/w300/${movie.poster_path}`,
            }
        ))
    } catch (error) {
        throw new Error('Not best movies') 
    }
}
