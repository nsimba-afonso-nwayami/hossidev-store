import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { listarProdutos } from "../../services/produtosService";
import "swiper/css";
import "swiper/css/free-mode";

// IMAGENS DAS MARCAS
import DellImg from "../../assets/img/dell.png";
import HpImg from "../../assets/img/hp.png";
import KingstonImg from "../../assets/img/kingston.png";
import LenovoImg from "../../assets/img/lenovo.png";
import LogiTechImg from "../../assets/img/logitech.png";
import MicrosoftImg from "../../assets/img/microsoft.png";
import SamsungImg from "../../assets/img/samsung.png";
import ToshibaImg from "../../assets/img/toshiba.png";
import WestwernDigitalImg from "../../assets/img/westwern-digital.png";
import XiaomiImg from "../../assets/img/xiaomi.png";

export default function Marcas() {
  const [marcas, setMarcas] = useState([]);

  const imagensMarcas = {
    DELL: DellImg,
    HP: HpImg,
    KINGSTON: KingstonImg,
    LENOVO: LenovoImg,
    LOGITECH: LogiTechImg,
    MICROSOFT: MicrosoftImg,
    SAMSUNG: SamsungImg,
    TOSHIBA: ToshibaImg,
    "WESTERN DIGITAL": WestwernDigitalImg,
    XIAOMI: XiaomiImg,
  };

  useEffect(() => {
    async function carregarMarcas() {
      try {
        const produtos = await listarProdutos();
        const marcasUnicas = [...new Set(produtos.map((p) => p.marca))];
        const marcasComImagem = marcasUnicas.filter((marca) => imagensMarcas[marca]);
        setMarcas(marcasComImagem);
      } catch (error) {
        console.error("Erro ao carregar marcas:", error);
      }
    }
    carregarMarcas();
  }, []);

  return (
    <section className="w-full py-16 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Título Direto e Sóbrio */}
        <h2 className="text-xl md:text-2xl font-bold text-neutral-800 mb-12 tracking-tight">
          Marcas em Destaque
        </h2>

        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={40}
          slidesPerView={2.5}
          freeMode={true}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 3.5 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 6 },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="flex items-center"
        >
          {marcas.map((marca, index) => {
            const slug = marca.toLowerCase().replaceAll(" ", "-");

            return (
              <SwiperSlide key={index}>
                <Link
                  to={`/marca/${slug}`}
                  className="group flex flex-col items-center justify-center h-24 no-underline"
                >
                  <img
                    src={imagensMarcas[marca]}
                    alt={marca}
                    className="max-h-10 md:max-h-12 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                  <span className="mt-4 text-[11px] font-bold text-neutral-400 group-hover:text-blue-900 uppercase tracking-widest transition-colors">
                    {marca}
                  </span>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}