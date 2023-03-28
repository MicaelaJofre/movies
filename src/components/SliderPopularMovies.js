import { useSliderMovies } from "../hooks/useSliderMovies"


const SliderPopularMovies =()=>{
  const {listPopularMovies} = useSliderMovies()

  return(
    <section className="h-[300px] m-auto overflow-hidden relative w-full">
      <hr className="border-red mb-6"/>
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
      <hr className="border-red p-1 mt-6"/>
    </section>
  )
}

export default SliderPopularMovies
