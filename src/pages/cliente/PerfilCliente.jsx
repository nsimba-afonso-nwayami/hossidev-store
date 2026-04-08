import ClienteLayout from "./components/ClienteLayout";

export default function PerfilCliente() {
  return (
    <>
      <title>Meu Perfil | HOSSIDEV Store</title>

      <ClienteLayout title="Configurações de Conta">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* ===== HEADER DE PERFIL (CARD DE IDENTIDADE) ===== */}
          <section className="bg-blue-900 rounded-3xl p-8 md:p-10 shadow-2xl shadow-blue-900/20 relative overflow-hidden">
            {/* Elemento Decorativo Industrial */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 -mr-20 -mt-20 rounded-full blur-3xl"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="relative">
                <img
                  src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSgJ1FO3FHIR9B-BULDxnMCDBg19lJSDqozeZ9GvQyMZVwc1D01Ck1GVRNjOCUW"
                  alt="Cliente"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-white/10 object-cover shadow-2xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-blue-900" title="Conta Ativa"></div>
              </div>

              <div className="text-center md:text-left space-y-2">
                <p className="text-[10px] font-black text-blue-300 uppercase tracking-[0.4em]">Membro Verificado</p>
                <h2 className="text-3xl md:text-4xl font-black text-neutral-50 uppercase tracking-tighter">
                  João da Silva
                </h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                  <span className="flex items-center gap-2 text-xs font-bold text-blue-100/60 bg-white/5 px-3 py-1 rounded-lg">
                    <i className="fas fa-envelope text-[10px]"></i> joao@email.com
                  </span>
                  <span className="flex items-center gap-2 text-xs font-bold text-blue-100/60 bg-white/5 px-3 py-1 rounded-lg">
                    <i className="fas fa-phone text-[10px]"></i> +244 923 111 222
                  </span>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* ===== FORMULÁRIO DE EDIÇÃO ===== */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white border border-neutral-100 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center">
                    <i className="fas fa-user-gear"></i>
                  </div>
                  <h3 className="text-lg font-black text-neutral-700 uppercase tracking-tight">Dados Cadastrais</h3>
                </div>

                <form className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Nome Completo</label>
                      <input
                        type="text"
                        defaultValue="João da Silva"
                        className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-5 py-4 focus:bg-white focus:border-blue-900/20 focus:outline-none font-bold text-neutral-700 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">E-mail Corporativo</label>
                      <input
                        type="email"
                        defaultValue="joao@email.com"
                        className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-5 py-4 focus:bg-white focus:border-blue-900/20 focus:outline-none font-bold text-neutral-700 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Telefone / WhatsApp</label>
                    <input
                      type="text"
                      defaultValue="+244 923 111 222"
                      className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-5 py-4 focus:bg-white focus:border-blue-900/20 focus:outline-none font-bold text-neutral-700 transition-all"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full md:w-auto px-10 py-4 bg-blue-900 hover:bg-blue-800 text-neutral-50 text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-blue-900/20 transition-all cursor-pointer"
                    >
                      Atualizar Registros
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* ===== SEGURANÇA ===== */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-neutral-100 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center">
                    <i className="fas fa-shield-halved"></i>
                  </div>
                  <h3 className="text-lg font-black text-neutral-700 uppercase tracking-tight">Segurança</h3>
                </div>

                <form className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Senha Atual</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-5 py-4 focus:border-red-200 focus:outline-none font-bold transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Nova Senha</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-5 py-4 focus:border-blue-900/20 focus:outline-none font-bold transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-neutral-900 hover:bg-black text-neutral-50 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all cursor-pointer"
                  >
                    Alterar Credenciais
                  </button>
                </form>
              </div>

              {/* Informação de Rodapé do Perfil */}
              <div className="p-6 bg-neutral-50 rounded-3xl border border-dashed border-neutral-200">
                <p className="text-[10px] font-bold text-neutral-400 uppercase leading-relaxed text-center">
                  Sua conta está protegida pelos protocolos de segurança HOSSIDEV Cloud.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ClienteLayout>
    </>
  );
}