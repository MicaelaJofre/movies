import { useEffect } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

const App = () => {
  const {search, setSearch, error} = useSearch()
  const {movies, getMovies, bestAllMovies} = useMovies({search})

  useEffect(() => {
    bestMovies()
}, [])

  const bestMovies =async()=>{
    const movies = await bestAllMovies()
    console.log(movies)
  }
  
  const handleSubmit =(e)=>{
    e.preventDefault()
    getMovies()
  }

  const handleChange =(e)=>{
    const newSearch = e.target.value
    setSearch(newSearch)
  }

  return (
    <div className='container'>
      <header className='headerApp'>
        <h1>Movies</h1>
        <form onSubmit={handleSubmit}>
          <input name='query' placeholder='Matrix...' value={search} onChange={handleChange}/>
          <button type='submit'>Search</button>
        </form>
        {error && <p>{error}</p>}
      </header>
      <main>
        <section>
          <Movies movies={movies}/>          
        </section>
      </main>
    </div>
  )
}

export default App
