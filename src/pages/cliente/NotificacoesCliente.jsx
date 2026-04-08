import { useState } from "react";
import ClienteLayout from "./components/ClienteLayout";

export default function NotificacoesCliente() {
  // Estados dos switches (Lógica HOSSIDEV)
  const [pedidos, setPedidos] = useState(true);
  const [promocoes, setPromocoes] = useState(true);
  const [mensagens, setMensagens] = useState(true);

  // Notificações dummy com branding atualizado
  const notificacoes = [
    {
      id: 1,
      tipo: "Logística",
      descricao: "O despacho do seu pedido #HOS-9902 foi processado e está em rota.",
      data: "Hoje, 14:20",
      icone: "fas fa-truck-fast",
      cor: "text-blue-900",
    },
    {
      id: 2,
      tipo: "Campanha",
      descricao: "Upgrade de infraestrutura disponível com 15% de desconto via HOSSIDEV Cloud.",
      data: "Ontem",
      icone: "fas fa-microchip",
      cor: "text-blue-900",
    },
    {
      id: 3,
      tipo: "Suporte",
      descricao: "O seu ticket de atendimento sobre integração de API foi respondido.",
      data: "07 Abr 2026",
      icone: "fas fa-headset",
      cor: "text-blue-900",
    },
  ];

  return (
    <>
      <title>Notificações | HOSSIDEV Store</title>

      <ClienteLayout title="Centro de Mensagens">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* CONFIGURAÇÕES DE PREFERÊNCIAS */}
          <section className="bg-white border border-neutral-100 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center">
                <i className="fas fa-sliders"></i>
              </div>
              <div>
                <h2 className="text-lg font-black text-neutral-700 uppercase tracking-tight">Preferências de Alerta</h2>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Controle o fluxo de dados para sua conta</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { state: pedidos, setter: setPedidos, title: "Atualizações de Pedidos", desc: "Status de envio, confirmação de pagamento e entrega." },
                { state: promocoes, setter: setPromocoes, title: "Ofertas e Tech News", desc: "Novos lançamentos, descontos e atualizações de serviços." },
                { state: mensagens, setter: setMensagens, title: "Comunicação de Suporte", desc: "Respostas de tickets e avisos de manutenção programada." }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-neutral-50 rounded-2xl border border-neutral-100 transition-all hover:border-blue-900/10">
                  <div className="pr-4">
                    <p className="text-sm font-black text-neutral-700 uppercase leading-none mb-1">{item.title}</p>
                    <p className="text-[11px] font-medium text-neutral-400">{item.desc}</p>
                  </div>
                  
                  <button 
                    onClick={() => item.setter(!item.state)}
                    className="relative inline-flex items-center cursor-pointer group focus:outline-none"
                  >
                    <div className={`w-14 h-7 rounded-full transition-all duration-300 shadow-inner ${item.state ? 'bg-blue-900' : 'bg-neutral-200'}`}></div>
                    <div className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${item.state ? 'translate-x-7' : 'translate-x-0'}`}></div>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* FEED DE NOTIFICAÇÕES RECENTES */}
          <section className="bg-white border border-neutral-100 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-8 border-b border-neutral-50 flex justify-between items-center bg-neutral-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-900 text-white rounded-xl flex items-center justify-center">
                  <i className="fas fa-bell"></i>
                </div>
                <h2 className="text-lg font-black text-neutral-700 uppercase tracking-tight">Atividades Recentes</h2>
              </div>
              <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline cursor-pointer">
                Marcar todas como lidas
              </button>
            </div>

            <div className="divide-y divide-neutral-50">
              {notificacoes.map((noti) => (
                <div
                  key={noti.id}
                  className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-neutral-50 transition-colors group cursor-default"
                >
                  <div className="flex gap-6 items-start">
                    <div className={`w-12 h-12 shrink-0 rounded-2xl border border-neutral-100 flex items-center justify-center bg-white shadow-sm group-hover:scale-110 transition-transform ${noti.cor}`}>
                      <i className={`${noti.icone} text-lg`}></i>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] font-black text-blue-900 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-tighter">
                          {noti.tipo}
                        </span>
                        <span className="text-[10px] font-bold text-neutral-300 uppercase hidden md:block">
                          ID-REF: 00{noti.id}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-neutral-600 leading-snug group-hover:text-neutral-900 transition-colors">
                        {noti.descricao}
                      </p>
                    </div>
                  </div>
                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center">
                    <span className="text-[11px] font-black text-neutral-400 uppercase tracking-tighter whitespace-nowrap">
                      {noti.data}
                    </span>
                    <i className="fas fa-circle text-[6px] text-blue-900 mt-2 hidden md:block animate-pulse"></i>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-neutral-50 text-center">
              <button className="text-[11px] font-black text-neutral-400 uppercase tracking-[0.2em] hover:text-blue-900 transition-colors cursor-pointer">
                Carregar Histórico Antigo
              </button>
            </div>
          </section>
        </div>
      </ClienteLayout>
    </>
  );
}