import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export default function HeaderCliente({ sidebarOpen, setSidebarOpen, title }) {
  const { user } = useAuth();

  return (
    <header
      className="
        bg-neutral-50/80 backdrop-blur-md
        border-b border-neutral-100
        fixed top-0 right-0 left-0 md:left-64
        h-16 flex items-center justify-between
        px-4 sm:px-6
        z-30
      "
    >
      {/* Gatilho Menu Mobile */}
      <button
        className="md:hidden text-2xl text-neutral-700 hover:text-blue-900 transition-colors"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <i className="fas fa-bars-staggered"></i>
      </button>

      {/* Título da Página Dinâmico */}
      <h2 className="text-sm sm:text-base font-black text-neutral-700 uppercase tracking-[0.15em]">
        {title}
      </h2>

      <div className="flex items-center gap-4">
        {/* Notificações Premium */}
        <Link
          to="/dashboard/cliente/notificacoes"
          className="relative w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-blue-900 transition-all rounded-xl hover:bg-neutral-100"
        >
          <i className="fas fa-bell"></i>
          <span className="absolute top-2 right-2 bg-blue-900 text-neutral-50 text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black border-2 border-neutral-50">
            3
          </span>
        </Link>

        {/* Perfil e Identidade */}
        <div className="flex items-center gap-3 pl-4 border-l border-neutral-100">
          <div className="hidden sm:flex flex-col text-right leading-tight">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">
              Cliente
            </span>
            <span className="text-xs font-bold text-neutral-700">
              {user?.username || user?.nome?.split(' ')[0]}
            </span>
          </div>
          
          <Link
            to="/dashboard/cliente/perfil"
            className="w-10 h-10 bg-blue-900 text-neutral-50 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-all active:scale-95"
          >
            <i className="fas fa-user-astronaut"></i>
          </Link>
        </div>
      </div>
    </header>
  );
}