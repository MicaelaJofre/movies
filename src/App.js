import { Movies } from './components/Movies'
import allMovies from './mosk/result.json'
//import searchMovies from './mosk/resultSearch.json'

const App = () => {
  return (
    <div className='container'>
      <header className='headerApp'>
        <h1>Movies</h1>
        <form>
          <input placeholder='Matrix...' />
          <button>Search</button>
        </form>
      </header>
      <main>
        <section>
          <Movies allMovies={allMovies} searchMovies={[]}/>          
        </section>
      </main>
    </div>
  )
}

export default App
