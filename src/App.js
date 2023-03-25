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
        <div className='pt-5 pb-10 flex flex-col items-center gap-2 md:flex-row md:justify-around'>
          <div className='flex gap-2'>
          <IconMovie/>
          <h1 className="font-bold text-[28px]">Movies</h1>
          </div>
          <form className='flex gap-4 h-10 z-20 items-center' onSubmit={handleSubmit}>
            <input className='rounded-lg px-3 py-1 bg-[#222] placeholder-opacity-20 placeholder-white outline-none' name='query' placeholder='Matrix, Train...' value={search} onChange={handleChange}/>
            <div className='select-none relative w-12 h-6 m-5'>
              <input name='sort' type='checkbox' id="check-apple" checked={sort} onChange={handleSort}/>
              <label for="check-apple" className='absolute top-0 left-0 w-12 h-6 rounded-[50%] cursor-pointer transition-all'></label>
            </div>            
            <button className='border-[2px] border-red px-2 py-1 rounded-lg text-stone-300 uppercase text-sm font-medium' type='submit'>Search</button>
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
