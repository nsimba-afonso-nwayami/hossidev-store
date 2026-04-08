import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export default function SidebarCliente({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  // Estilo base para os links
  const linkClass = "flex items-center p-3 rounded-xl transition-all font-bold uppercase tracking-tighter text-[11px] no-underline mb-2";
  const activeClass = "bg-blue-900 text-neutral-50 shadow-lg shadow-blue-900/20";
  const inactiveClass = "text-neutral-500 hover:bg-neutral-100 hover:text-blue-900";

  return (
    <>
      <aside
        className={`
          bg-neutral-50 border-r border-neutral-100
          w-64 fixed top-0 left-0 h-screen p-6
          transition-transform duration-300 overflow-y-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}
          md:translate-x-0
          z-50 flex flex-col
        `}
      >
        {/* Botão fechar mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-2xl text-neutral-400 hover:text-blue-900 transition"
          onClick={() => setSidebarOpen(false)}
        >
          <i className="fas fa-times"></i>
        </button>

        {/* Cabeçalho Branding */}
        <div className="flex-1">
          <div className="flex flex-col leading-none mb-10 mt-6 md:mt-0">
            <span className="text-2xl font-black tracking-tighter text-neutral-700">
              HOSSIDEV
            </span>
            <span className="text-[10px] font-bold tracking-[0.4em] text-blue-900 uppercase">
              Store
            </span>
          </div>

          {/* Navegação Manual */}
          <nav className="text-sm">
            <Link
              to="/"
              onClick={() => setSidebarOpen(false)}
              className={`${linkClass} ${location.pathname === "/" ? activeClass : inactiveClass}`}
            >
              <i className="fas fa-desktop mr-3 text-sm"></i>
              Ver Site
            </Link>

            <Link
              to="/dashboard/cliente"
              onClick={() => setSidebarOpen(false)}
              className={`${linkClass} ${location.pathname === "/dashboard/cliente" ? activeClass : inactiveClass}`}
            >
              <i className="fas fa-gauge-high mr-3 text-sm"></i>
              Dashboard
            </Link>

            <Link
              to="/dashboard/cliente/pedidos"
              onClick={() => setSidebarOpen(false)}
              className={`${linkClass} ${location.pathname === "/dashboard/cliente/pedidos" ? activeClass : inactiveClass}`}
            >
              <i className="fas fa-box mr-3 text-sm"></i>
              Meus Pedidos
            </Link>

            <Link
              to="/dashboard/cliente/enderecos"
              onClick={() => setSidebarOpen(false)}
              className={`${linkClass} ${location.pathname === "/dashboard/cliente/enderecos" ? activeClass : inactiveClass}`}
            >
              <i className="fas fa-location-dot mr-3 text-sm"></i>
              Endereços
            </Link>

            <Link
              to="/dashboard/cliente/perfil"
              onClick={() => setSidebarOpen(false)}
              className={`${linkClass} ${location.pathname === "/dashboard/cliente/perfil" ? activeClass : inactiveClass}`}
            >
              <i className="fas fa-user mr-3 text-sm"></i>
              Meu Perfil
            </Link>

            <Link
              to="/dashboard/cliente/notificacoes"
              onClick={() => setSidebarOpen(false)}
              className={`${linkClass} ${location.pathname === "/dashboard/cliente/notificacoes" ? activeClass : inactiveClass}`}
            >
              <i className="fas fa-bell mr-3 text-sm"></i>
              Notificações
            </Link>
          </nav>
        </div>

        {/* Logout */}
        <div className="pt-6 border-t border-neutral-100">
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center cursor-pointer w-full p-3 rounded-xl text-neutral-400 hover:bg-red-50 hover:text-red-500 transition-all font-bold uppercase tracking-tighter text-[11px]"
          >
            <i className="fas fa-sign-out-alt mr-3 text-sm"></i>
            Sair da Conta
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}