import { useSliderMovies } from "../hooks/useSliderMovies"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Autoplay } from 'swiper'

// Import Swiper styles
import "swiper/css"
import 'swiper/swiper-bundle.css'

SwiperCore.use([Autoplay])

const SliderPopularMovies =()=>{
  const {listPopularMovies} = useSliderMovies()

    return(
        <div className='absolute w-full l-0 opacity-30 pt-24'> 
          <Swiper 
          navigation={false} 
          slidesPerView={8}
          spaceBetween={0}
          //preloadImages={true}
          //centeredSlides={true}
          autoplay={{
            delay: 300,
            disableOnInteraction: false
          }}
          speed={1200}
          effect={'slide'}
          loop={true}
          //loopAdditionalSlides={8}
          grabCursor={true}
          className="overflow-visible">
            {
              listPopularMovies?
              listPopularMovies.map(list =>{
                return (
                  <SwiperSlide key={list.id} className='flex justify-center'>
                    <div className="px-2">
                      <img className='object-contain ' alt={`imagen del cartel ${list.poster}`} src={list.poster}/>
                    </div>
                  </SwiperSlide>
                )
              })
              
            :null}
          </Swiper>
        </div>
    )
}

export default SliderPopularMovies