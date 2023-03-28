import { useSliderMovies } from "../hooks/useSliderMovies"


const SliderPopularMovies =()=>{
  const {listPopularMovies} = useSliderMovies()

  return(
    <section className="h-[250px] m-auto overflow-hidden relative w-full">
      <div className="flex w-[calc(180px*20)] gap-4 opacity-40 animate-scroll items-center">
        {
          listPopularMovies &&
          listPopularMovies.map(list =>{
            return (
                <div>
                  <img 
                  key={list.id} className='object-cover h-full w-[180px]' 
                  alt={`url poster: ${list.poster}`} src={list.poster}
                  />
                </div>
                )
              })
            } 
      </div>
    </section>
  )
}

export default SliderPopularMovies
