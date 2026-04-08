import { useState } from "react";
import HeaderCliente from "./HeaderCliente";
import SidebarCliente from "./SidebarCliente";

export default function ClienteLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // Alterado para neutral-100 para criar contraste com os elementos brancos (neutral-50)
    <div className="min-h-screen flex bg-neutral-100 text-neutral-600 font-sans selection:bg-blue-900/10">
      
      {/* Sidebar */}
      <SidebarCliente
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Conteúdo principal */}
      <div className="flex-1 md:ml-64 flex flex-col overflow-x-hidden transition-all duration-300">
        
        {/* Header - Mantém-se geralmente em neutral-50 para destacar do fundo */}
        <HeaderCliente
          title={title}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Conteúdo da página */}
        <main
          className="
            mt-20
            px-4 sm:px-6 lg:px-8
            py-8
            max-w-7xl
            w-full
            mx-auto
            animate-in fade-in slide-in-from-bottom-3 duration-700
          "
        >
          {/* Os children (cards, tabelas, forms) agora se destacarão 
              automaticamente se usarem bg-white ou bg-neutral-50 
          */}
          <div className="text-neutral-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}