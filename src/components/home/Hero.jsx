import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

import HeroImg1 from "../../assets/img/hero1.png";
import HeroImg2 from "../../assets/img/hero2.png";
import HeroImg3 from "../../assets/img/hero3.png";
import HeroImg4 from "../../assets/img/hero4.png";

const slides = [
  {
    img: HeroImg1,
    title: "Eletrodomésticos de Alta Performance",
    desc: "Inovação e design para transformar o dia a dia da sua residência.",
    link: "/categoria/electrodomesticos-software"
  },
  {
    img: HeroImg2,
    title: "Soluções em Energia & Segurança",
    desc: "Sistemas inteligentes para garantir proteção e economia total.",
    link: "/categoria/energia-seguranca"
  },
  {
    img: HeroImg3,
    title: "Experiência de Som e Imagem",
    desc: "O melhor do cinema profissional no conforto do seu espaço.",
    link: "/categoria/imagem-som"
  },
  {
    img: HeroImg4,
    title: "Sistemas Profissionais de Impressão",
    desc: "Alta definição e produtividade para o crescimento do seu negócio.",
    link: "/categoria/informatica-impressao"
  }
];

export default function Hero() {
  return (
    <section className="relative w-full h-[75vh] md:h-[80vh] bg-neutral-100 pt-35 md:pt-40">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        grabCursor={true}
        loop
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full flex items-center overflow-hidden">
              
              <div className="absolute inset-0 bg-linear-to-r from-neutral-900/60 via-neutral-900/20 to-transparent z-10" />
              
              <img
                src={slide.img}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover object-center animate-slow-zoom"
              />

              <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 w-full">
                <div className="max-w-xl">
                  {/* Título: Reduzido para text-5xl e font-bold (700) */}
                  <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
                    {slide.title}
                  </h1>

                  {/* Descrição: Mais leve e discreta */}
                  <p className="text-base md:text-lg text-neutral-200 font-normal mb-8 leading-relaxed max-w-md opacity-90">
                    {slide.desc}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      to={slide.link}
                      className="px-7 py-3.5 bg-white text-blue-900 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-blue-900 hover:text-white transition-all shadow-lg no-underline"
                    >
                      Ver Detalhes
                    </Link>
                    <Link
                      to="/contato"
                      className="px-7 py-3.5 border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all no-underline"
                    >
                      Consultoria
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.12); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 25s linear infinite alternate;
        }
      `}} />
    </section>
  );
}