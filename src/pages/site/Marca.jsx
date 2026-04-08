import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { listarProdutos } from "../../services/produtosService";
import { useCart } from "../../contexts/CartContext";

export default function Marca() {
  const { nome } = useParams();
  const { addToCart } = useCart();

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        const data = await listarProdutos();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, []);

  const formatImageUrl = (url) =>
    url ? url.replace("/media/", "/api/media/") : "";

  // Converter slug para nome original da marca
  const marcaFormatada = nome.replaceAll("-", " ").toUpperCase();

  // Filtra produtos pela marca
  const produtosPorMarca = produtos.filter(
    (p) => p.marca && p.marca.toUpperCase() === marcaFormatada,
  );

  // Filtra produtos por pesquisa
  const produtosFiltrados = produtosPorMarca.filter((p) =>
    p.descricao.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    document.title = `${marcaFormatada} | Nwayami Store`;
  }, [marcaFormatada]);

  if (loading) {
    return (
      <section className="w-full bg-neutral-50 min-h-screen pt-40 flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-blue-900/20 border-t-blue-900 rounded-full animate-spin mb-4"></div>
        <p className="text-neutral-500 font-medium">Carregando catálogo {marcaFormatada}...</p>
      </section>
    );
  }

  return (
    <section className="w-full bg-neutral-100 min-h-screen pt-32 md:pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header da Marca */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-900 mb-2 block">
              Produtos por Marca
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 tracking-tight">
              {marcaFormatada}
            </h1>
          </div>

          <div className="w-full md:w-80">
            <input
              type="search"
              placeholder="Buscar nesta marca..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-white border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 transition-all text-sm shadow-sm"
            />
          </div>
        </div>

        {produtosFiltrados.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-neutral-300">
             <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-tag text-neutral-300 text-xl"></i>
             </div>
            <h2 className="text-lg font-bold text-neutral-700">Nenhum produto encontrado</h2>
            <p className="text-neutral-500 text-sm mt-1">Não há itens disponíveis para {marcaFormatada} no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {produtosFiltrados.map((produto) => {
              const productSlug = produto.descricao.toLowerCase().replaceAll(" ", "-").replaceAll("/", "");
              
              return (
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
                    <div className={`absolute top-3 left-3 px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                      produto.stock === "Disponível" 
                      ? "bg-green-50 text-green-600" 
                      : "bg-red-50 text-red-600"
                    }`}>
                      {produto.stock}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col grow">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase mb-1">SKU: {produto.codigo}</p>
                    <Link 
                      to={`/produtos/${productSlug}`}
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
                          disabled={produto.stock !== "Disponível"}
                          onClick={() => addToCart({
                            id: produto.id,
                            descricao: produto.descricao,
                            codigo: produto.codigo,
                            preco_com_iva: Number(produto.preco_com_iva),
                            imagem: produto.imagem,
                          })}
                          className="col-span-1 h-10 flex items-center justify-center bg-neutral-100 text-neutral-600 rounded-lg hover:bg-blue-900 hover:text-white transition-all active:scale-90 disabled:opacity-50"
                        >
                          <i className="fas fa-shopping-cart text-xs"></i>
                        </button>
                        
                        <Link
                          to={`/produtos/${productSlug}`}
                          className="col-span-4 h-10 flex items-center justify-center bg-blue-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-blue-800 transition-all no-underline shadow-lg shadow-blue-900/10"
                        >
                          Ver Detalhes
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}