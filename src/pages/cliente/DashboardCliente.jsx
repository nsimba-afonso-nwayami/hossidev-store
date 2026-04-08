import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClienteLayout from "./components/ClienteLayout";

import { listarPedidos } from "../../services/pedidoService";
import { listarEnderecos } from "../../services/enderecoService";

export default function DashboardCliente() {
  const [pedidos, setPedidos] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [pedidosData, enderecosData] = await Promise.all([
          listarPedidos(),
          listarEnderecos(),
        ]);

        setPedidos(pedidosData || []);
        setEnderecos(enderecosData || []);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  if (loading) {
    return (
      <ClienteLayout title="Minha Conta">
        <section className="w-full py-32 text-center">
          <i className="fas fa-spinner fa-spin text-3xl text-blue-900 mb-4"></i>
          <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">Carregando dados...</p>
        </section>
      </ClienteLayout>
    );
  }

  return (
    <>
      <title>Dashboard | HOSSIDEV Store</title>

      <ClienteLayout title="Painel de Controle">
        {/* RESUMO DE STATUS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Total Pedidos */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-900"></div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Total de Pedidos</p>
                <h3 className="text-3xl font-black text-neutral-700">
                  {pedidos.length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-neutral-50 rounded-xl flex items-center justify-center text-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-all">
                <i className="fas fa-box-open text-xl"></i>
              </div>
            </div>
          </div>

          {/* Total Endereços */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-neutral-400"></div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Meus Endereços</p>
                <h3 className="text-3xl font-black text-neutral-700">
                  {enderecos.length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-neutral-50 rounded-xl flex items-center justify-center text-neutral-500 group-hover:bg-neutral-700 group-hover:text-white transition-all">
                <i className="fas fa-map-marked-alt text-xl"></i>
              </div>
            </div>
          </div>
        </section>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          
          {/* ÚLTIMOS PEDIDOS */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-black text-neutral-700 uppercase tracking-widest">
                Atividade Recente
              </h2>
              <i className="fas fa-history text-neutral-300"></i>
            </div>

            {pedidos.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-sm text-neutral-400 italic">
                  Nenhum pedido registrado até o momento.
                </p>
              </div>
            ) : (
              <ul className="space-y-4">
                {pedidos.slice(0, 4).map((pedido) => (
                  <li key={pedido.id} className="flex justify-between items-center p-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors">
                    <div>
                      <p className="text-xs font-black text-neutral-700 uppercase">
                        #{pedido.id.toString().padStart(4, '0')}
                      </p>
                      <p className="text-[11px] font-bold text-blue-900">
                        {pedido.total || "Kz 0,00"}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-neutral-400">
                      {pedido.criado_em
                        ? new Date(pedido.criado_em).toLocaleDateString()
                        : "Recente"}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <Link
              to="/dashboard/cliente/pedidos"
              className="mt-6 flex items-center justify-center gap-2 text-[11px] font-black text-blue-900 uppercase tracking-widest hover:gap-4 transition-all no-underline"
            >
              Histórico Completo <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          {/* AÇÕES RÁPIDAS DE GESTÃO */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
            <h2 className="text-sm font-black text-neutral-700 uppercase tracking-widest mb-6">
              Gestão de Conta
            </h2>

            <div className="space-y-4">
              {[
                { to: "/dashboard/cliente/pedidos", icon: "fa-shopping-cart", title: "Pedidos", desc: "Acompanhe suas compras" },
                { to: "/dashboard/cliente/enderecos", icon: "fa-map-pin", title: "Endereços", desc: "Gerenciar locais de entrega" },
                { to: "/dashboard/cliente/perfil", icon: "fa-user-edit", title: "Perfil", desc: "Atualizar seus dados pessoais" },
              ].map((acao, idx) => (
                <Link
                  key={idx}
                  to={acao.to}
                  className="flex justify-between items-center p-4 rounded-2xl border border-neutral-50 hover:border-blue-900/20 hover:bg-blue-900/2 transition-all group no-underline"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400 group-hover:text-blue-900 transition-colors">
                      <i className={`fas ${acao.icon}`}></i>
                    </div>
                    <div>
                      <p className="text-xs font-black text-neutral-700 uppercase tracking-tight">{acao.title}</p>
                      <p className="text-[10px] text-neutral-400 font-bold">{acao.desc}</p>
                    </div>
                  </div>
                  <i className="fas fa-chevron-right text-neutral-300 group-hover:text-blue-900 group-hover:translate-x-1 transition-all"></i>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </ClienteLayout>
    </>
  );
}