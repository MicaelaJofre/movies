import notImg from '../image/notImg.png'

const ListMovies=({movies})=>{
    return(
        <>
        {
            movies.map(movie=>{
            return(
                <div key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <img src={movie.poster} alt= {movie.description}/>
                </div>
            )
            })
        }
        </>
    )
}
const NotMovies =()=>{
    return(
        <h3>Not movies</h3>
    )
}

const NotSearchMovies =()=>{
    return(
        <h3>No results for your search</h3>
    )
}

export const Movies =({allMovies, searchMovies})=>{
    let movies = allMovies.results
    let moviesFilter = searchMovies
    const mappedMovies = movies?.map(movie=>(
        {
        id: movie.id,
        title: movie.title,
        year: movie.release_date,
        poster: `https://image.tmdb.org/t/p/w300/${movie.poster_path}` || notImg,
        description: movie.overview
    }
    ))
    return(
        <>
        {
            moviesFilter.length > 0
            ? <div>
                <h2>Results of your search</h2>
                <ListMovies movies={moviesFilter}/>
            </div>
            : <NotSearchMovies/>
        }
        {
            movies.length > 0
            ? <div>
                <h2>Best Movies</h2>
                <ListMovies movies={mappedMovies}/>
            </div>
            : <NotMovies/>
        }
        </>
    )
}