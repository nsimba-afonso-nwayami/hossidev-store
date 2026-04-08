import WhatsAppButton from "../../components/WhatsAppButton";
import Hero from "../../components/home/Hero";
import ProdutosDestaque from "../../components/home/ProdutosDestaque";
import Categorias from "../../components/home/Categorias";
import Marcas from "../../components/home/Marcas";
import OutrosProdutos from "../../components/home/OutrosProdutos";

export default function Home() {
  return (
    <>
      <title>Nwayami Store</title>

      <Hero />
      <ProdutosDestaque />
      <Categorias />
      <Marcas />
      <OutrosProdutos />

      {/* Botão WhatsApp fixo */}
      <WhatsAppButton phone="244924034804" size={64} />
    </>
  );
}
