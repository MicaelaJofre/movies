const ListMovies=({movies})=>{
  return(
    <div className='grid grid-cols-movies px-10 py-20 gap-1 gap-y-20'>
    {
      movies.map(movie=>{
        return(
            <div className="flex flex-col w-[180px] justify-between relative rounded-lg border-[3px] border-opacity-10 border-gray-700" key={movie.id}>
              <img className="h-full object-cover " src={movie.poster} alt= {movie.description}/>
              <span className="absolute w-full h-11 backdrop-blur-xl backdrop-opacity-75 bottom-0"></span>
              <h3 className="p-4 pl-2 uppercase text-white text-[10px] font-semibold whitespace-nowrap overflow-ellipsis overflow-hidden">{movie.title}</h3>    
            </div>
        )
        })   
    }
    </div>
  ) 
}

const NotSearchMovies =()=>{
  return(
    <div className="w-full flex flex-col justify-center items-center text-red pt-10">
      <h3 className="text-ms">No results for your search</h3>
      <p className="text-xs opacity-60">Try trying a different movie title</p>  
    </div>
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