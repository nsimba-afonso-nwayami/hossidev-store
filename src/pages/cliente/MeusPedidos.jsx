import { useEffect, useState } from "react";
import ClienteLayout from "./components/ClienteLayout";
import Modal from "./components/Modal";
import { listarPedidos, buscarPedidoPorId } from "../../services/pedidoService";

export default function MeusPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [busca, setBusca] = useState("");
  const [openDetalhes, setOpenDetalhes] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarPedidos() {
      try {
        const data = await listarPedidos();
        setPedidos(data || []);
      } catch (error) {
        console.error("Erro ao carregar pedidos:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarPedidos();
  }, []);

  const pedidosFiltrados = pedidos.filter((item) => {
    if (!busca) return true;
    return (
      String(item.id).includes(busca) ||
      (item.produto?.nome || "").toLowerCase().includes(busca.toLowerCase())
    );
  });

  const abrirDetalhes = async (item) => {
    try {
      const detalhes = await buscarPedidoPorId(item.id);
      setPedidoSelecionado(detalhes);
      setOpenDetalhes(true);
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
    }
  };

  if (loading) {
    return (
      <ClienteLayout title="Meus Pedidos">
        <section className="w-full py-32 text-center">
          <i className="fas fa-spinner fa-spin text-3xl text-blue-900 mb-4"></i>
          <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Sincronizando Histórico...</p>
        </section>
      </ClienteLayout>
    );
  }

  return (
    <>
      <title>Meus Pedidos | HOSSIDEV Store</title>

      <ClienteLayout title="Histórico de Compras">
        {/* FILTRO DE BUSCA PREMIUM */}
        <section className="bg-white p-2 rounded-2xl shadow-sm border border-neutral-100 mb-8 flex items-center">
          <div className="pl-4 text-neutral-400">
            <i className="fas fa-search"></i>
          </div>
          <input
            type="text"
            placeholder="Pesquisar por ID do pedido ou nome do item..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="p-4 bg-transparent focus:outline-none w-full text-sm font-medium text-neutral-600"
          />
        </section>

        {/* LISTAGEM INDUSTRIAL */}
        <section className="space-y-4">
          {pedidosFiltrados.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-neutral-100 text-center">
              <i className="fas fa-box-open text-4xl text-neutral-100 mb-4"></i>
              <p className="text-sm font-bold text-neutral-400 uppercase tracking-tighter">
                Nenhum registro encontrado na sua conta.
              </p>
            </div>
          ) : (
            pedidosFiltrados.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm hover:border-blue-900/30 transition-all group"
              >
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-neutral-50 rounded-xl flex items-center justify-center text-blue-900 border border-neutral-100 group-hover:bg-blue-900 group-hover:text-white transition-all">
                      <i className="fas fa-receipt text-xl"></i>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Identificador</p>
                      <h4 className="font-black text-neutral-700 uppercase leading-none">
                        Pedido #{item.id.toString().padStart(5, '0')}
                      </h4>
                      <p className="text-sm font-bold text-blue-900 mt-1">
                        {item.produto?.nome || "Pacote de Itens Diversos"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-8">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Emissão</p>
                      <p className="text-sm font-bold text-neutral-600">
                        {item.criado_em ? new Date(item.criado_em).toLocaleDateString() : "-"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Investimento</p>
                      <p className="text-sm font-black text-neutral-700">
                        {item.total ? `${Number(item.total).toLocaleString()} AKZ` : "Kz 0,00"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end items-center mt-6 pt-4 border-t border-neutral-50">
                  <button
                    onClick={() => abrirDetalhes(item)}
                    className="flex items-center gap-2 text-[10px] font-black text-blue-900 uppercase tracking-widest hover:gap-4 transition-all cursor-pointer"
                  >
                    Analisar Detalhes <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        {/* MODAL DETALHES PERSONALIZADO */}
        <Modal
          isOpen={openDetalhes}
          onClose={() => setOpenDetalhes(false)}
          title="Ficha do Pedido"
          icon="fas fa-file-invoice"
        >
          {pedidoSelecionado && (
            <div className="space-y-6">
              <div className="bg-blue-900 p-8 rounded-2xl text-white relative overflow-hidden">
                <i className="fas fa-box-check absolute -right-4 -bottom-4 text-8xl opacity-10"></i>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Status: Concluído</p>
                <h3 className="text-2xl font-black uppercase tracking-tighter mt-1">
                  Pedido #{pedidoSelecionado.id}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-neutral-50 p-5 rounded-xl border border-neutral-100">
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Data da Transação</p>
                  <p className="font-bold text-neutral-700">
                    {pedidoSelecionado.criado_em ? new Date(pedidoSelecionado.criado_em).toLocaleString() : "-"}
                  </p>
                </div>

                <div className="bg-neutral-50 p-5 rounded-xl border border-neutral-100">
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Montante Total</p>
                  <p className="font-black text-blue-900 text-lg">
                    {pedidoSelecionado.total ? `${Number(pedidoSelecionado.total).toLocaleString()} AKZ` : "-"}
                  </p>
                </div>
              </div>

              <div className="p-6 border-2 border-dashed border-neutral-100 rounded-2xl">
                 <p className="text-center text-[11px] font-bold text-neutral-400 uppercase italic">
                    Obrigado por confiar na infraestrutura HOSSIDEV.
                 </p>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setOpenDetalhes(false)}
                  className="px-8 py-3 bg-neutral-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-900 transition-colors cursor-pointer shadow-lg shadow-neutral-900/20"
                >
                  Fechar Relatório
                </button>
              </div>
            </div>
          )}
        </Modal>
      </ClienteLayout>
    </>
  );
}