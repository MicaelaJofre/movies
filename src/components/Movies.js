

const ListMovies=({movies})=>{
    return(
        <div className='grid grid-cols-movies px-32 py-20 gap-7 gap-y-20'>
        {
            movies.map(movie=>{
            return(
                <div className="flex flex-col gap-2 justify-between relative" key={movie.id}>
                    <h3 className="pl-2 opacity-60 text-[12px] font-semibold w-60 whitespace-nowrap overflow-ellipsis overflow-hidden">{movie.title}</h3>
                    <img className="w-full h-[370px] object-cover rounded-lg" src={movie.poster} alt= {movie.description}/>
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