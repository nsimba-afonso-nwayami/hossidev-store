import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import HeroImg1 from "../../assets/img/hero1.png";
import HeroImg2 from "../../assets/img/hero2.png";
import HeroImg3 from "../../assets/img/hero3.png";
import HeroImg4 from "../../assets/img/hero4.png";

const slides = [
  { img: HeroImg1, link: "/categoria/electrodomésticos" },
  { img: HeroImg2, link: "/categoria/energia" },
  { img: HeroImg3, link: "/categoria/imagem" },
  { img: HeroImg4, link: "/categoria/informática" }
];

export default function Hero() {
  return (
    <section className="relative w-full h-[65vh] md:h-[85vh] bg-neutral-100 pt-44 md:pt-32 overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        grabCursor={true}
        loop
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Link to={slide.link} className="block relative w-full h-full overflow-hidden">
              {/* Overlay sutil apenas para dar profundidade, sem bloquear a leitura da imagem */}
              <div className="absolute inset-0 bg-black/5 z-10 hover:bg-black/0 transition-colors duration-500" />
              
              <img
                src={slide.img}
                alt={`Banner HOSSIDEV ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover object-center animate-slow-zoom"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 15s ease-in-out infinite alternate;
        }
        /* Estilização dos indicadores para a paleta Blue-900 */
        .swiper-pagination-bullet-active {
          background: #1e3a8a !important; 
          width: 24px !important;
          border-radius: 4px !important;
        }
        .swiper-pagination-bullet {
          background: #94a3b8;
          opacity: 0.6;
        }
      `}} />
    </section>
  );
}