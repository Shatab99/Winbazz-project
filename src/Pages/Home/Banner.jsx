import { Swiper, SwiperSlide } from 'swiper/react';
import Img1 from '../../assets/Banner/1.png'
import Img2 from '../../assets/Banner/2.png'
import Img3 from '../../assets/Banner/3.png'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination} from 'swiper/modules';

const Banner = () => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide><img src={Img1} alt="" /></SwiperSlide>
                <SwiperSlide><img src={Img2} alt="" /></SwiperSlide>
                <SwiperSlide><img src={Img3} alt="" /></SwiperSlide>
            </Swiper>
        </>
    );
};

export default Banner;