import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { buscarProdutoPorSlug } from "../../services/produtosService";
import { useCart } from "../../contexts/CartContext";

export default function DetalhesProduto() {
  const { slug } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const formatImageUrl = (url) => {
    if (!url) return "";
    return url.replace("/media/", "/api/media/");
  };

  useEffect(() => {
    async function carregarProduto() {
      try {
        const data = await buscarProdutoPorSlug(slug);
        setProduto(data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
        setProduto(null);
      } finally {
        setLoading(false);
      }
    }
    carregarProduto();
  }, [slug]);

  useEffect(() => {
    if (produto) {
      document.title = `${produto.descricao} | Hossidev Store`;
    }
  }, [produto]);

  if (loading) {
    return (
      <section className="w-full bg-neutral-50 min-h-screen pt-40 flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-blue-900/20 border-t-blue-900 rounded-full animate-spin mb-4"></div>
        <p className="text-neutral-500 font-medium animate-pulse">Sincronizando detalhes...</p>
      </section>
    );
  }

  return (
    <section className="w-full bg-white min-h-screen pt-32 md:pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {!produto ? (
          <div className="max-w-md mx-auto text-center py-20">
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">Produto não localizado</h2>
            <Link to="/produtos" className="text-blue-900 font-bold uppercase tracking-widest text-xs border-b-2 border-blue-900/20 pb-1">
              Voltar ao catálogo
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Galeria/Imagem à Esquerda */}
            <div className="lg:w-1/2">
              <div className="sticky top-40 bg-neutral-50 rounded-3xl p-8 md:p-12 border border-neutral-100 shadow-sm">
                {produto.imagem && produto.imagem.split("/").pop().toLowerCase().startsWith("store_1_") ? (
                  <div className="w-full h-auto object-contain mix-blend-multiply flex items-center justify-center text-neutral-300 text-5xl">
                    <i className="fas fa-shopping-cart"></i>
                  </div>
                ) : (
                  <img
                    src={formatImageUrl(produto.imagem)}
                    alt={produto.descricao}
                    className="w-full h-auto object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
                  />
                )}
              </div>
            </div>

            {/* Informações à Direita */}
            <div className="lg:w-1/2 flex flex-col">
              {/* Breadcrumb simples */}
              <nav className="flex gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6">
                <Link to="/" className="hover:text-blue-900 transition-colors">Home</Link>
                <span>/</span>
                <Link to="/produtos" className="hover:text-blue-900 transition-colors">Produtos</Link>
                <span>/</span>
                <span className="text-neutral-800 truncate">{produto.categoria_nome}</span>
              </nav>

              <h1 className="text-3xl md:text-4xl font-black text-neutral-800 leading-tight mb-4 tracking-tight">
                {produto.descricao}
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-[11px] font-bold bg-neutral-100 text-neutral-500 px-3 py-1 rounded-full uppercase tracking-widest">
                  SKU: {produto.codigo}
                </span>
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
                  produto.stock === "Disponível" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                }`}>
                  {produto.stock}
                </span>
              </div>

              <div className="mb-10">
                <p className="text-[13px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Preço com IVA</p>
                <p className="text-4xl font-black text-blue-900">
                  {Number(produto.preco_com_iva).toLocaleString("pt-AO")} <span className="text-lg">Kz</span>
                </p>
              </div>

              {/* Ações */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={() => addToCart({ ...produto, preco_com_iva: Number(produto.preco_com_iva) })}
                  disabled={produto.stock !== "Disponível"}
                  className="grow cursor-pointer bg-blue-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[12px] hover:bg-blue-800 transition-all duration-300 shadow-xl shadow-blue-900/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-400"
                >
                  {produto.stock === "Disponível" ? "Adicionar ao Carrinho" : "Produto Indisponível"}
                </button>
              </div>

              {/* Especificações / Detalhes */}
              <div className="border-t border-neutral-100 pt-10">
                <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-neutral-800 mb-6">
                  Sobre este item
                </h2>
                <div className="prose prose-sm text-neutral-600 leading-relaxed max-w-none">
                  {produto.descricao_detalhada ? (
                    <p className="whitespace-pre-line">{produto.descricao_detalhada}</p>
                  ) : (
                    <p>Equipamento de alta performance selecionado pela Nwayami Store para garantir a melhor eficiência técnica em seus projetos e rotina profissional.</p>
                  )}
                </div>

                {/* Grid de Informações Técnicas Rápidas */}
                <div className="grid grid-cols-2 gap-6 mt-10">
                  <div className="bg-neutral-50 p-4 rounded-xl">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Marca</p>
                    <p className="text-sm font-bold text-neutral-700 uppercase">{produto.marca || "Premium"}</p>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-xl">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Categoria</p>
                    <p className="text-sm font-bold text-neutral-700">{produto.categoria_nome}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}