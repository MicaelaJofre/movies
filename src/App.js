import { useEffect, useState } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

const App = () => {
  const [sort, setSort] = useState(null)
  const {search, setSearch, error} = useSearch()
  const {movies, getMovies, bestAllMovies, loading, errorMovies} = useMovies({search, sort})

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
    setSearch(newSearch)
    getMovies({search: newSearch})
  }

  const handleSort =()=>{
    setSort(!sort)
  }

  return (
    <div className='container'>
      <header className='headerApp'>
        <h1>Movies</h1>
        <form onSubmit={handleSubmit}>
          <input name='query' placeholder='Matrix...' value={search} onChange={handleChange}/>
          <input name='sort' type='checkbox' checked={sort} onChange={handleSort}/>
          <button type='submit'>Search</button>
        </form>
        {error && <p>{error}</p>}
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
