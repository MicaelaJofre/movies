import debounce from 'just-debounce-it'
import { useCallback, useEffect, useState } from 'react'
import { Movies } from './components/Movies'
import SliderPopularMovies from './components/SliderPopularMovies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

const App = () => {
  const [sort, setSort] = useState(false)
  const {search, setSearch} = useSearch()
  const {movies, getMovies, bestAllMovies, loading, errorMovies} = useMovies({search, sort})
  
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
      <header className='w-full h-auto relative'>
        <div className='pt-5 pb-10 flex flex-col items-center gap-2 md:flex-row md:justify-around'>
          <h1 className="font-bold text-[28px]">Movies</h1>
          <form className='flex gap-4 h-10 z-20 items-center' onSubmit={handleSubmit}>
            <input className='rounded-lg px-3 py-1 bg-[#222] placeholder-opacity-20 placeholder-white outline-none' name='query' placeholder='Matrix, Train...' value={search} onChange={handleChange}/>
            <input name='sort' type='checkbox' checked={sort} onChange={handleSort}/>
            <button className='border-[2px] border-red px-2 py-1 rounded-lg text-red uppercase text-sm font-medium' type='submit'>Search</button>
          </form>
        </div>  
        <SliderPopularMovies/>
      </header>
      <main>
        <section>
          {
            loading ? 
            <div className="dot-spinner">
              {
                Array(8).fill(null).map((spinner, index)=>{
                  return(
                    <div key={index} className="dot-spinner__dot"></div>
                  )
                })
              }
            </div> 
        : <Movies movies={movies}/>  
          }  
          {errorMovies && <p>{errorMovies}</p>}      
        </section>
      </main>
    </div>
  )
}

export default App
