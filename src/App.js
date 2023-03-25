import debounce from 'just-debounce-it'
import { useCallback, useEffect, useState } from 'react'
import IconMovie from './components/IconMovie'
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
        <div className='pt-5 pb-14 flex flex-col items-center justify-center gap-6 md:flex-row md:justify-around md:gap-2'>
          <div className='flex gap-2'>
          <IconMovie/>
          <h1 className="font-bold text-[28px]">Movies</h1>
          </div>
          <form className='flex flex-col gap-4 h-30 z-20 items-center sm:flex-row' onSubmit={handleSubmit}>
            <input className='rounded-lg px-3 py-1 bg-[#222] placeholder-opacity-20 placeholder-white placeholder:text-sm outline-none' name='query' placeholder='Matrix, Train ...' value={search} onChange={handleChange}/>
            <div className='flex items-center gap-4 lg:flex-none'>
            <div className='checkbox-apple'>
              <input name='sort' type='checkbox' id="check-apple" className='yep' checked={sort} onChange={handleSort}/>
              <label htmlFor="check-apple"></label>
            </div>            
            <button className='border-[2px] border-red px-2 py-1 rounded-lg text-stone-300 uppercase text-sm font-medium' type='submit'>Search</button>
            </div>
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
