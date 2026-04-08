import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { listarProdutos } from "../../services/produtosService";
import "swiper/css";
import "swiper/css/free-mode";

// SUAS IMAGENS
import EletrodomesticosImg from "../../assets/img/eletrodomesticos.png";
import EnergiaImg from "../../assets/img/energia.png";
import EscritorioeEscolaImg from "../../assets/img/escritorio-e-escola.png";
import ImagemeSomImg from "../../assets/img/imagem-e-som.png";
import ImpressorasImg from "../../assets/img/impressoras.png";
import InformaticaImg from "../../assets/img/informatica.png";
import RedeseInternetImg from "../../assets/img/redes-e-internet.png";
import SegurancaEletronicaImg from "../../assets/img/seguranca-eletronica.png";
import SmartphonesImg from "../../assets/img/smartphones.png";
import SoftwareImg from "../../assets/img/software.png";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);

  const imagensCategorias = {
    Electrodomésticos: EletrodomesticosImg,
    Energia: EnergiaImg,
    "Material de Escritório e Escolar": EscritorioeEscolaImg,
    "Imagem e Som": ImagemeSomImg,
    "Impressão": ImpressorasImg,
    Informática: InformaticaImg,
    "Redes, Internet e Telecomunicações": RedeseInternetImg,
    "Segurança Electrónica": SegurancaEletronicaImg,
    "Smartphones, Tablets e Telemóveis": SmartphonesImg,
    Software: SoftwareImg,
  };

  useEffect(() => {
    async function carregarCategorias() {
      try {
        const data = await listarProdutos();
        const categoriasUnicas = [...new Set(data.map((p) => p.categoria_nome))];
        const categoriasComImagem = categoriasUnicas.filter((categoria) => {
          return !!imagensCategorias[categoria];
        });
        setCategorias(categoriasComImagem);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    }
    carregarCategorias();
  }, []);

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Título Direto */}
        <h2 className="text-xl md:text-2xl font-bold text-neutral-800 mb-12 tracking-tight">
          Principais Categorias
        </h2>

        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={24}
          slidesPerView={2}
          freeMode={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 }, // 4 por slide no desktop
          }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
        >
          {categorias.map((categoria, index) => {
            const slug = categoria.toLowerCase().replaceAll(" ", "-").replaceAll("/", "");

            return (
              <SwiperSlide key={index}>
                <Link
                  to={`/categoria/${slug}`}
                  className="group flex flex-col items-center justify-center bg-neutral-50 rounded-2xl p-8 border border-transparent hover:border-neutral-100 hover:bg-white hover:shadow-xl hover:shadow-neutral-200/40 transition-all duration-300 no-underline"
                >
                  <div className="relative w-16 h-16 mb-5 flex items-center justify-center">
                    <img
                      src={imagensCategorias[categoria]}
                      alt={categoria}
                      className="w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  </div>

                  <span className="text-[12px] font-bold text-neutral-500 group-hover:text-blue-900 text-center tracking-widest uppercase transition-colors">
                    {categoria}
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