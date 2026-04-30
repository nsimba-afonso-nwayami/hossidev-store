import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <title>Página não encontrada | Hossidev Store</title>

      <section className="w-full min-h-[70vh] bg-neutral-100 pt-50 pb-16 flex items-center">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-neutral-50 rounded-3xl border border-neutral-400 shadow-sm p-8 text-center">
            {/* Ícone - Substituído para Blue-900 */}
            <div className="text-blue-900 text-5xl mb-4">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>

            {/* Código 404 - Cor de Headers (Neutral-700) */}
            <h1 className="text-5xl font-black text-neutral-700 mb-2">404</h1>

            {/* Mensagem - Cor de Headers (Neutral-700) */}
            <h2 className="text-xl font-bold text-neutral-700 mb-3 uppercase tracking-tight">
              Página não encontrada
            </h2>
            
            {/* Descrição - Cor padrão de texto (Neutral-500) */}
            <p className="text-sm text-neutral-500 mb-6">
              A página que você está procurando não existe ou foi movida.
            </p>

            {/* Botões - Adaptados para Blue-900 e Neutral-400 */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/"
                className="px-6 py-3 bg-blue-900 text-neutral-50 rounded-xl font-bold hover:bg-blue-800 transition flex items-center justify-center gap-2 active:scale-95 uppercase text-[11px] tracking-widest"
              >
                <i className="fa-solid fa-house"></i>
                Página inicial
              </Link>

              <Link
                to="/produtos"
                className="px-6 py-3 border border-neutral-400 text-neutral-700 rounded-xl font-bold hover:bg-neutral-200 transition flex items-center justify-center gap-2 uppercase text-[11px] tracking-widest"
              >
                <i className="fa-solid fa-bag-shopping"></i>
                Ver produtos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}