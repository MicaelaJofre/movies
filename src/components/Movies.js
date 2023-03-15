

const ListMovies=({movies})=>{
    return(
        <div className='containerMovies'>
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
        </div>
    )
}

const NotSearchMovies =()=>{
    return(
        <h3>No results for your search</h3>
    )
}

export const Movies =({movies})=>{
    
    
    return(
        <>
        {
            movies?.length > 0
            ? <div className='movies'>
                <ListMovies movies={movies}/>
            </div>
            : <NotSearchMovies/>
        }
        </>
    )
}