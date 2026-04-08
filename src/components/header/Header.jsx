import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useCart } from "../../contexts/CartContext";
import { listarProdutos } from "../../services/produtosService";
import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [resultados, setResultados] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Controle de Scroll para o efeito do background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear o scroll do corpo quando o menu mobile estiver aberto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

  // Carregar categorias
  useEffect(() => {
    async function carregarCategorias() {
      try {
        const data = await listarProdutos();
        const únicas = Array.from(new Set(data.map((p) => p.categoria_nome)));
        setCategorias(únicas);
      } catch (error) {
        console.error("Erro categorias:", error);
      }
    }
    carregarCategorias();
  }, []);

  // Busca com Debounce
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResultados([]);
      return;
    }
    const delayDebounceFn = setTimeout(async () => {
      setLoadingSearch(true);
      try {
        const data = await listarProdutos();
        const filtrados = data.filter((p) =>
          p.descricao.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResultados(filtrados.slice(0, 5));
      } finally {
        setLoadingSearch(false);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const getSlug = (desc) => desc.toLowerCase().replaceAll(" ", "-").replaceAll("/", "");

  return (
    <header className={`fixed top-0 left-0 w-full z-100 transition-all duration-500 ${
      scrolled ? "bg-neutral-50/90 backdrop-blur-lg shadow-md py-2" : "bg-neutral-50 py-4"
    }`}>
      
      {/* Top Bar Principal */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">
        
        {/* Logo Branding */}
        <Link to="/" className="flex flex-col leading-none group shrink-0 no-underline">
          <span className="text-2xl font-black tracking-tighter text-neutral-700 group-hover:text-blue-900 transition-colors">
            HOSSIDEV
          </span>
          <span className="text-[10px] font-bold tracking-[0.4em] text-blue-900 uppercase">
            Store
          </span>
        </Link>

        {/* Busca Desktop Premium */}
        <div className="hidden md:block flex-1 max-w-lg relative">
          <div className="relative group z-110">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <i className="fas fa-search text-neutral-400 group-focus-within:text-blue-900 transition-colors"></i>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="O que você está procurando hoje?"
              className="w-full bg-neutral-100 border border-transparent focus:bg-white focus:ring-4 focus:ring-blue-900/10 focus:border-blue-800 rounded-xl pl-12 pr-4 py-2.5 text-sm text-neutral-700 transition-all outline-none"
            />
          </div>

          {searchTerm && (
            <div className="absolute top-full left-0 mt-3 w-full bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-neutral-100 overflow-hidden z-120 animate-in fade-in slide-in-from-top-2">
              {loadingSearch ? (
                <div className="p-4 text-center text-sm text-neutral-500 italic">
                  <i className="fas fa-spinner fa-spin mr-2 text-blue-900"></i> Buscando...
                </div>
              ) : resultados.length > 0 ? (
                resultados.map((p) => (
                  <Link
                    key={p.id}
                    to={`/produtos/${getSlug(p.descricao)}`}
                    className="flex items-center p-4 hover:bg-neutral-50 border-b border-neutral-50 last:border-none transition-colors no-underline"
                    onClick={() => setSearchTerm("")}
                  >
                    <div className="w-8 h-8 bg-neutral-100 rounded flex items-center justify-center mr-3 text-blue-900">
                      <i className="fas fa-box-open text-xs"></i>
                    </div>
                    <span className="text-sm font-semibold text-neutral-700">{p.descricao}</span>
                  </Link>
                ))
              ) : (
                <div className="p-6 text-center text-sm text-neutral-400 font-medium italic">
                  Nenhum produto encontrado
                </div>
              )}
            </div>
          )}
        </div>

        {/* Ações do Usuário e Carrinho */}
        <div className="flex items-center gap-2 md:gap-5">
          {isAuthenticated ? (
            <div className="flex items-center gap-3 pr-4 border-r border-neutral-200">
              <div className="hidden md:block text-right leading-tight">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">Conta</p>
                <Link to="/dashboard/cliente" className="text-sm font-bold text-neutral-700 hover:text-blue-900 no-underline transition-colors">
                  Olá, {user?.username || user?.nome?.split(' ')[0]}
                </Link>
              </div>
              <button 
                onClick={() => { logout(); navigate("/"); }} 
                title="Terminar sessão"
                className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-red-50 hover:text-red-500 transition-all cursor-pointer"
              >
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden md:flex items-center gap-2 text-sm font-bold text-neutral-700 hover:text-blue-900 transition-colors uppercase tracking-widest text-[11px] no-underline">
              <i className="far fa-user-circle text-lg"></i> Entrar
            </Link>
          )}

          {/* Carrinho Floating */}
          <Link to="/carrinho" className="relative w-11 h-11 flex items-center justify-center bg-blue-900 text-neutral-50 rounded-xl hover:bg-blue-800 shadow-lg shadow-blue-900/30 transition-all active:scale-95">
            <i className="fas fa-shopping-bag text-lg"></i>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-neutral-50 text-blue-900 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-blue-900 animate-bounce">
                {totalItems}
              </span>
            )}
          </Link>

          <button onClick={() => setMenuOpen(true)} className="md:hidden text-neutral-700 p-2">
            <i className="fas fa-bars-staggered text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Navegação e Categorias */}
      <div className="max-w-7xl mx-auto px-6 mt-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-6 border-t border-neutral-100 pt-4">
          <nav className="hidden md:flex items-center gap-8 border-r border-neutral-200 pr-8 shrink-0">
            {["Início", "Produtos", "Sobre", "Contato"].map((item) => (
              <Link 
                key={item} 
                to={item === "Início" ? "/" : `/${item.toLowerCase()}`}
                className="text-xs uppercase font-bold tracking-[0.2em] text-neutral-500 hover:text-blue-900 transition-colors no-underline"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="w-full overflow-hidden">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={10}
              slidesPerView={"auto"}
              autoplay={{ delay: 3000 }}
              loop={categorias.length > 6}
              className="categories-swiper"
            >
              {categorias.map((cat, i) => (
                <SwiperSlide key={i} style={{ width: "auto" }}>
                  <Link
                    to={`/categoria/${cat.toLowerCase().replaceAll(" ", "-")}`}
                    className="inline-block px-4 py-1.5 bg-neutral-100 text-neutral-600 rounded-full text-[11px] font-bold uppercase tracking-tighter border border-transparent hover:border-blue-900 hover:bg-white hover:text-blue-900 transition-all no-underline"
                  >
                    {cat}
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Menu Mobile Overlay Corrigido */}
      <aside className={`fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-200 transition-all duration-500 md:hidden ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        {/* Camada para fechar ao clicar fora */}
        <div className="absolute inset-0" onClick={() => setMenuOpen(false)}></div>

        <div className={`fixed left-0 top-0 h-screen w-[80%] bg-white shadow-2xl transition-transform duration-500 overflow-y-auto ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="p-6 border-b border-neutral-100 flex justify-between items-center sticky top-0 bg-white z-10">
            <span className="font-black text-blue-900 tracking-tighter">HOSSIDEV STORE</span>
            <button onClick={() => setMenuOpen(false)} className="text-neutral-400 text-2xl"><i className="fas fa-times"></i></button>
          </div>
          
          <nav className="p-8 flex flex-col gap-6">
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-2xl font-bold text-neutral-800 no-underline">Início</Link>
            <Link to="/produtos" onClick={() => setMenuOpen(false)} className="text-2xl font-bold text-neutral-800 no-underline">Produtos</Link>
            
            {isAuthenticated && (
              <Link to="/dashboard/cliente" onClick={() => setMenuOpen(false)} className="text-2xl font-bold text-blue-900 no-underline">
                Olá, {user?.nome?.split(' ')[0]}
              </Link>
            )}

            <div className="pt-4 border-t border-neutral-100">
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">Categorias</p>
                <div className="flex flex-wrap gap-2">
                  {categorias.map(c => (
                    <Link 
                      key={c} 
                      to={`/categoria/${c.toLowerCase().replaceAll(" ", "-")}`} 
                      onClick={() => setMenuOpen(false)} 
                      className="px-3 py-1 bg-neutral-100 rounded-lg text-xs font-bold text-neutral-600 no-underline"
                    >
                      {c}
                    </Link>
                  ))}
                </div>
            </div>

            {isAuthenticated && (
              <button 
                onClick={() => { logout(); setMenuOpen(false); navigate("/"); }}
                className="mt-4 flex items-center gap-2 text-red-500 font-bold uppercase text-xs tracking-widest"
              >
                <i className="fas fa-power-off"></i> Sair da Conta
              </button>
            )}
          </nav>
        </div>
      </aside>
    </header>
  );
}