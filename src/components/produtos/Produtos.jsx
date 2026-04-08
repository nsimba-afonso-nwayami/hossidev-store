import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listarProdutos } from "../../services/produtosService";
import { useCart } from "../../contexts/CartContext";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [visibleCount, setVisibleCount] = useState(16);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const formatImageUrl = (url) =>
    url ? url.replace("/media/", "/api/media/") : "";

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const data = await listarProdutos();
        setProdutos(shuffleArray(data));
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarProdutos();
  }, []);

  const categorias = Array.from(new Set(produtos.map((p) => p.categoria_nome)));
  const subcategorias = selectedCategory
    ? Array.from(
        new Set(
          produtos
            .filter((p) => p.categoria_nome === selectedCategory)
            .map((p) => p.subcategoria_nome),
        ),
      )
    : [];

  const produtosFiltrados = produtos
    .filter((p) => !selectedCategory || p.categoria_nome === selectedCategory)
    .filter((p) => !selectedSubcategory || p.subcategoria_nome === selectedSubcategory)
    .filter((p) =>
        p.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl p-4 shadow-sm animate-pulse border border-neutral-100">
      <div className="w-full h-48 bg-neutral-200 rounded-xl mb-4" />
      <div className="h-4 bg-neutral-200 rounded w-1/4 mb-2" />
      <div className="h-4 bg-neutral-200 rounded w-3/4 mb-4" />
      <div className="h-10 bg-neutral-100 rounded-lg w-full" />
    </div>
  );

  return (
    <section className="w-full bg-neutral-100 min-h-screen pt-32 md:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-8">
        
        {/* Header da Página */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 tracking-tight">Catálogo de Produtos</h1>
          <p className="text-neutral-500 text-sm">Encontre a tecnologia ideal para suas necessidades.</p>
        </div>

        {/* Barra de Filtros Premium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-neutral-200/50">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar por nome ou código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 transition-all text-sm"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubcategory("");
            }}
            className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-900/10 text-sm cursor-pointer"
          >
            <option value="">Todas as Categorias</option>
            {categorias.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
          </select>

          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            disabled={!selectedCategory}
            className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-900/10 text-sm cursor-pointer disabled:opacity-50"
          >
            <option value="">Todas as Subcategorias</option>
            {subcategorias.map((sub, idx) => <option key={idx} value={sub}>{sub}</option>)}
          </select>
        </div>

        {/* Listagem */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : produtosFiltrados.length === 0 ? (
          <div className="bg-white rounded-2xl p-20 text-center border border-dashed border-neutral-300">
            <h2 className="text-xl font-bold text-neutral-700">Nenhum resultado encontrado</h2>
            <p className="text-neutral-500 mt-2">Tente ajustar seus filtros ou termos de pesquisa.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">
                Exibindo {Math.min(visibleCount, produtosFiltrados.length)} de {produtosFiltrados.length} itens
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {produtosFiltrados.slice(0, visibleCount).map((produto) => {
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
                        produto.stock === "Disponível" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
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
                            className="col-span-1 h-10 flex items-center justify-center bg-neutral-100 text-neutral-600 rounded-lg hover:bg-blue-900 hover:text-white transition-all active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
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

            {/* Ver Mais Premium */}
            {visibleCount < produtosFiltrados.length && (
              <div className="flex justify-center mt-16">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 8)}
                  className="px-12 py-4 bg-white border border-neutral-200 text-neutral-800 text-[11px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 shadow-sm"
                >
                  Carregar mais produtos
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}