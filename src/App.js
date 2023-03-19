import debounce from 'just-debounce-it'
import { useCallback, useEffect, useState } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

import img from '../src/image/notImg.png'

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import { popularMovies } from './services/movies'

const App = () => {
  const [sort, setSort] = useState(false)
  const {search, setSearch} = useSearch()
  const {movies, getMovies, bestAllMovies, loading, errorMovies} = useMovies({search, sort})
  const [listPopularMovies, setListPopularMovies] = useState([])

  const getPopularMovies = async()=>{
    const list = await popularMovies()
    setListPopularMovies(list)
  }

  useEffect(() => {
    getPopularMovies()
  }, [])
  

  const debouncedGetMovies = useCallback(
      debounce(search=>{
        getMovies({search})
      }, 300)
    ,[getMovies],
  )
  

  useEffect(() => {
    bestMovies()
}, [])

  const bestMovies =async()=>{
    const movies = await bestAllMovies()
    return movies
  }
  
  const handleSubmit =(e)=>{
    e.preventDefault()
    getMovies({search})
  }

  const handleChange =(e)=>{
    const newSearch = e.target.value
    if(newSearch.startsWith(' '))return
    setSearch(newSearch)
    debouncedGetMovies(newSearch)    
  }

  const handleSort =()=>{
    setSort(!sort)
  }

  return (
    <div className='w-full h-full min-h-[100vh] bg-black text-white font-Poppins'>
      <header className='w-full h-96 pt-5 relative'>
        <div className='absolute opacity-20 h-96'> 
          <Swiper 
          navigation={false} 
          modules={{Autoplay}} 
          autoplay={{
            delay:300,
            disableOnInteraction:false
          }}
          className="mySwiper">
            {
              listPopularMovies?
              listPopularMovies.map(list =>{
                return (
                  <SwiperSlide key={list.id} className='flex justify-center'>
                    <img className='h-96 object-contain ' alt='img' src={list.poster}/>
                  </SwiperSlide>
                )
              })
              
            :null}
          </Swiper>
        </div>
        <div className='z-20 flex justify-around'>
          <h1 className="font-bold text-3xl">Movies</h1>
          <form className='flex gap-4 h-10 items-center' onSubmit={handleSubmit}>
            <input className='rounded-lg px-3 py-1 bg-[#222] placeholder-opacity-20 placeholder-white outline-none' name='query' placeholder='Matrix...' value={search} onChange={handleChange}/>
            <input name='sort' type='checkbox' checked={sort} onChange={handleSort}/>
            <button className='border-[1px] border-red px-2 py-1 rounded-lg text-red uppercase text-sm font-medium' type='submit'>Search</button>
          </form>
        </div>  
      </header>
      <main>
        <section>
          {
            loading ? <p>Cargando ...</p> : <Movies movies={movies}/>  
          }  
          {errorMovies && <p>{errorMovies}</p>}      
        </section>
      </main>
    </div>
  )
}

export default App
