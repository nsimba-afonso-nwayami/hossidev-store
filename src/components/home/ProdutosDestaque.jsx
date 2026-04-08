import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarProdutos } from "../../services/produtosService";
import { useCart } from "../../contexts/CartContext";

export default function ProdutosDestaque() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const formatImageUrl = (url) => {
    if (!url) return "";
    return url.replace("/media/", "/api/media/");
  };

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const data = await listarProdutos();
        const produtosAleatorios = data.sort(() => Math.random() - 0.5);
        setProdutos(produtosAleatorios.slice(0, 8));
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarProdutos();
  }, []);

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl p-4 shadow-sm animate-pulse">
      <div className="w-full h-48 bg-neutral-200 rounded-xl mb-4" />
      <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-neutral-200 rounded w-1/2 mb-4" />
      <div className="h-8 bg-neutral-100 rounded-lg w-full" />
    </div>
  );

  return (
    <section className="w-full py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header da Seção */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 tracking-tight mb-2">
              Destaques da Coleção
            </h2>
            <p className="text-neutral-500 text-sm md:text-base">
              Selecionamos as melhores soluções tecnológicas para o seu dia a dia.
            </p>
          </div>
          <Link
            to="/produtos"
            className="text-[11px] font-black uppercase tracking-widest text-blue-900 hover:text-blue-700 transition-colors border-b-2 border-blue-900/20 pb-1 no-underline"
          >
            Explorar Catálogo Full
          </Link>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            produtos.map((produto) => (
              <div
                key={produto.id}
                className="group bg-white rounded-2xl border border-neutral-100 p-4 flex flex-col transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1"
              >
                {/* Imagem Container */}
                <div className="relative w-full h-56 overflow-hidden rounded-xl bg-neutral-50 mb-4">
                  <img
                    src={formatImageUrl(produto.imagem)}
                    alt={produto.descricao}
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Badge de Stock */}
                  <div className={`absolute top-3 left-3 px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                    produto.stock === "Disponível" 
                    ? "bg-green-50 text-green-600" 
                    : "bg-red-50 text-red-600"
                  }`}>
                    {produto.stock}
                  </div>
                </div>

                {/* Info do Produto */}
                <div className="flex flex-col grow">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase mb-1">
                    SKU: {produto.codigo}
                  </p>
                  <Link 
                    to={`/produtos/${produto.descricao.toLowerCase().replaceAll(" ", "-").replaceAll("/", "")}`}
                    className="text-sm font-bold text-neutral-700 hover:text-blue-900 transition-colors line-clamp-2 mb-2 no-underline"
                  >
                    {produto.descricao}
                  </Link>
                  
                  <div className="mt-auto pt-4 flex flex-col gap-3">
                    <p className="text-xl font-bold text-blue-900">
                      {Number(produto.preco_com_iva).toLocaleString("pt-AO")} <span className="text-xs">Kz</span>
                    </p>

                    <div className="grid grid-cols-5 gap-2">
                      <button
                        onClick={() => addToCart({
                          id: produto.id,
                          descricao: produto.descricao,
                          codigo: produto.codigo,
                          preco_com_iva: Number(produto.preco_com_iva),
                          imagem: produto.imagem,
                        })}
                        className="col-span-1 h-10 flex items-center justify-center bg-neutral-100 text-neutral-600 rounded-lg hover:bg-blue-900 hover:text-white transition-all active:scale-90"
                        title="Rápido Adicionar"
                      >
                        <i className="fas fa-shopping-cart text-xs"></i>
                      </button>
                      
                      <Link
                        to={`/produtos/${produto.descricao.toLowerCase().replaceAll(" ", "-").replaceAll("/", "")}`}
                        className="col-span-4 h-10 flex items-center justify-center bg-blue-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-blue-800 transition-all no-underline shadow-lg shadow-blue-900/10"
                      >
                        Ver Detalhes
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
