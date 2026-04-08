import { Link } from "react-router-dom";
import ClienteLayout from "./components/ClienteLayout";

export default function NotFoundCliente() {
  return (
    <>
      <title>Erro 404 | HOSSIDEV Store</title>

      <ClienteLayout title="Recurso Indisponível">
        <main className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-3xl border border-neutral-100 shadow-sm px-6 text-center py-20 relative overflow-hidden">
          
          {/* Fundo Decorativo Industrial (Marca d'água técnica) */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
            <h1 className="text-[20rem] font-black leading-none">404</h1>
          </div>

          <div className="relative z-10">
            {/* Ícone de Erro de Sincronização */}
            <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
              <i className="fa-solid fa-network-wired text-blue-900 text-4xl animate-pulse"></i>
            </div>

            {/* Tag de Status do Sistema */}
            <span className="inline-block px-4 py-1 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-4">
              Error_Code: 404_NOT_FOUND
            </span>

            {/* Título e Mensagem */}
            <h2 className="text-3xl md:text-4xl font-black text-neutral-700 mb-4 uppercase tracking-tighter">
              Caminho Inexistente
            </h2>

            <p className="text-neutral-400 mb-10 max-w-sm mx-auto text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed">
              O recurso solicitado não foi localizado no diretório atual. A conexão permanece ativa, mas a rota é inválida.
            </p>

            {/* Botão Único de Retorno */}
            <Link
              to="/dashboard/cliente"
              className="inline-flex items-center gap-3 px-12 py-5 bg-blue-900 text-neutral-50 text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-blue-800 shadow-lg shadow-blue-900/20 transition-all active:scale-95 cursor-pointer"
            >
              <i className="fas fa-arrow-left"></i>
              Voltar ao Dashboard
            </Link>
          </div>
        </main>

        {/* Rodapé técnico discreto */}
        <div className="mt-8 text-center">
          <p className="text-[9px] font-black text-neutral-300 uppercase tracking-[0.4em]">
            HOSSIDEV Cloud Infrastructure • 2026
          </p>
        </div>
      </ClienteLayout>
    </>
  );
}