import { Link, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { checkoutSchema } from "../../validations/checkoutSchema";
import { criarPedido } from "../../services/pedidoService";
import logo from "../../assets/img/logo.jpg";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      nome: user?.username || "",
      endereco: "",
      referencia: "",
      instrucoes: "",
      pagamento: "",
    },
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      toast.error("Seu carrinho está vazio!");
      navigate("/carrinho");
    }
  }, [cartItems, navigate]);

  const round2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;
  const aplicar25Porcento = (preco) => round2(Number(preco || 0) * 1.25);

  const gerarProforma = (data) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const agora = new Date();
    const dataEmissao = agora.toLocaleDateString("pt-AO");
    const dataArquivo = dataEmissao.replaceAll("/", "-");
    const horaArquivo = agora.getHours().toString().padStart(2, "0") + agora.getMinutes().toString().padStart(2, "0");
    const nomeClienteLimpo = (data.nome || user?.username || "CLIENTE").split(" ")[0].toUpperCase();
    
    // Nome do arquivo com o novo nome da empresa
    const nomeArquivo = `PROFORMA_${nomeClienteLimpo}_NWAYAMI_STORE_${dataArquivo}_${horaArquivo}.pdf`;

    const dataVencimento = new Date(agora.getTime() + (5 * 24 * 60 * 60 * 1000)).toLocaleDateString("pt-AO");

    // CONFIGURAÇÕES DE CORES E LINHAS ORIGINAIS
    doc.setDrawColor(0, 0, 0);
    doc.setTextColor(0, 0, 0);

    try {
      doc.addImage(logo, "JPEG", 15, 10, 22, 12);
    } catch (e) {}

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("N-WAYAMI STORE", 15, 26); // Nome da empresa atualizado no topo

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text([
      "CENTRALIDADE DO KILAMBA,",
      "QUARTEIRÃO F, EDIFÍCIO 27,",
      "APARTAMENTO Nº91",
      "Contribuinte: 5002061422",
      "E-mail: geral@nwayami.com",
      "Tel: 924054954"
    ], 15, 30);

    doc.text("Exmo.(s) Sr.(s)", 140, 28);
    doc.setFont("helvetica", "bold");
    doc.text(data.nome?.toUpperCase() || user?.username?.toUpperCase() || "CONSUMIDOR FINAL", 140, 33);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("FATURA PROFORMA n.º", 15, 58);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("Original", 180, 58);

    doc.setLineWidth(0.2);
    doc.line(15, 61, 195, 61);

    doc.setFontSize(7.5);
    doc.text("Data", 15, 66);
    doc.text("Vencimento", 55, 66);
    doc.text("Contribuinte", 120, 66);
    doc.text("V/ Ref.", 165, 66);
    doc.line(120, 67, 155, 67);
    doc.text(dataEmissao, 15, 71);
    doc.text(dataVencimento, 55, 71);
    doc.text("5002061422", 120, 71);

    doc.setFont("helvetica", "bold");
    doc.text("Observações", 15, 80);
    doc.setLineWidth(0.1);
    doc.line(15, 81, 195, 81);
    doc.setFont("helvetica", "normal");
    doc.text("NÃO É UM DOCUMENTO DE VENDA, INVÁLIDO PARA SAÍDA DE MERCADORIA", 15, 85);
    doc.line(15, 86, 195, 86);

    autoTable(doc, {
      startY: 88,
      head: [["Código", "Descrição", "P. Uni.", "Uni. Qtd.", "Taxa", "Total"]],
      body: cartItems.map((item) => {
        const pUni = aplicar25Porcento(item.preco_com_iva);
        return [
          item.id.toString().slice(-4),
          item.descricao.toUpperCase(),
          `${pUni.toLocaleString("pt-AO")} Kz`,
          item.quantidade,
          "0 %",
          `${(pUni * item.quantidade).toLocaleString("pt-AO")} Kz`
        ];
      }),
      theme: "plain",
      styles: { fontSize: 7.5, cellPadding: 1.5, textColor: 0 },
      headStyles: { fontStyle: "bold", lineWidth: { bottom: 0.1 } },
      bodyStyles: { lineWidth: { bottom: 0.1 } },
      columnStyles: {
        2: { halign: "right" },
        3: { halign: "center" },
        4: { halign: "center" },
        5: { halign: "right" }
      }
    });

    let currentY = doc.lastAutoTable.finalY + 10;
    doc.setLineWidth(0.2);
    doc.line(15, currentY - 4, 100, currentY - 4);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("0 %", 15, currentY);
    doc.text("0,00 Kz", 92, currentY);
    doc.setFontSize(7);
    doc.text("(1) Regime Simplificado", 15, currentY + 4);

    const pagamentoY = currentY + 14;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Meio de", 15, pagamentoY);
    doc.text("Pagamento", 15, pagamentoY + 5);
    doc.setLineWidth(0.2);
    doc.line(15, pagamentoY + 7, 100, pagamentoY + 7);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Transferência", 15, pagamentoY + 13);
    doc.text("Bancária", 15, pagamentoY + 18);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Dados Bancários", 15, pagamentoY + 28);
    doc.setLineWidth(0.2);
    doc.line(15, pagamentoY + 30, 100, pagamentoY + 30);
    doc.text("NIB", 15, pagamentoY + 36);
    doc.text("IBAN", 15, pagamentoY + 43);
    doc.setFont("helvetica", "normal");
    doc.text("BANCO BIC", 50, pagamentoY + 36);
    doc.text("0051 0000 2251 7229 10156", 50, pagamentoY + 43);
    doc.line(15, pagamentoY + 46, 100, pagamentoY + 46);

    const linhaY = pagamentoY + 55;
    doc.setLineWidth(0.4);
    doc.line(15, linhaY, 195, linhaY);

    const resumoX = 120;
    const resumoY = linhaY + 12;
    doc.setLineWidth(0.2);
    doc.line(resumoX, resumoY - 4, 195, resumoY - 4);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Taxa Base", resumoX, resumoY);
    doc.text("IVA", resumoX + 32, resumoY);
    doc.text("Sumário", resumoX + 50, resumoY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`S/IVA : ${totalPrice.toLocaleString("pt-AO")} Kz`, resumoX, resumoY + 7);
    doc.text("IVA:", resumoX + 32, resumoY + 7);
    doc.setFont("helvetica", "bold");
    doc.text("Total Descontos", resumoX, resumoY + 15);
    doc.setFont("helvetica", "normal");
    doc.text("%", resumoX + 32, resumoY + 15);
    doc.text("00,00 kz", resumoX, resumoY + 23);
    doc.text("0", resumoX + 32, resumoY + 23);
    doc.text(`${totalPrice.toLocaleString("pt-AO")} kz`, 195, resumoY + 23, { align: "right" });
    doc.setLineWidth(0.3);
    doc.line(resumoX, resumoY + 27, 195, resumoY + 27);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Total", resumoX, resumoY + 38);

    const footerY = 280;
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text("N-WAYAMI STORE", 15, footerY); // Nome da empresa no rodapé
    doc.text("Tel. +244 924 054 954", 15, footerY + 3);
    doc.text("Centralidade do Kilamba, Quarteirão F27, Apt n.91", 50, footerY);
    doc.text("geral@nwayami.com", 50, footerY + 3);
    doc.text("Município de Kilamba, Luanda, República de Angola", 120, footerY);
    doc.text("www.store.nwayami.com", 120, footerY + 3);

    doc.save(nomeArquivo);
  };

  const onSubmit = async (data) => {
    if (!isAuthenticated) {
      toast.error("Faça login para continuar.");
      return;
    }
    const linhas = cartItems.map((item) => ({
      id: item.id,
      preco_com_iva: aplicar25Porcento(item.preco_com_iva),
      quantity: item.quantidade || 1,
    }));

    const pedido = {
      endereco: data.endereco,
      pontoReferencia: data.referencia,
      instrucoesEntrega: data.instrucoes,
      metodoPagamento: data.pagamento,
      cart: linhas,
    };

    const toastId = toast.loading("Criando pedido...");
    try {
      const response = await criarPedido(pedido);
      toast.success(response?.email === "enviado" ? "Pedido confirmado e e-mail enviado!" : "Pedido confirmado!", { id: toastId });
      clearCart();
      navigate("/");
    } catch (error) {
      toast.error("Erro ao criar pedido. Tente novamente.", { id: toastId });
    }
  };

  return (
    <>
      <title>Checkout | Nwayami Store</title>
      <section className="w-full min-h-screen bg-neutral-50 py-16 pt-47">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-10 tracking-tight">
            Finalizar Compra
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            <form className="flex-1 space-y-8" onSubmit={handleSubmit(onSubmit)}>
              
              <div className="bg-white rounded-xl shadow-sm p-8 border border-neutral-200">
                <h2 className="text-lg font-bold text-neutral-800 mb-6 uppercase tracking-wider border-b pb-4">
                  Dados de Entrega
                </h2>

                <div className="grid grid-cols-1 gap-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-neutral-700 ml-1">Nome Completo</label>
                    <input
                      type="text"
                      {...register("nome")}
                      className={`w-full p-3 rounded-lg bg-neutral-50 border focus:outline-none transition-all ${
                        errors.nome ? "border-red-500" : "border-neutral-300 focus:border-blue-900"
                      }`}
                    />
                    {errors.nome && (
                      <p className="text-red-500 text-sm mt-1 ml-1">{errors.nome.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-neutral-700 ml-1">Endereço Completo</label>
                    <input
                      type="text"
                      {...register("endereco")}
                      className={`w-full p-3 rounded-lg bg-neutral-50 border focus:outline-none transition-all ${
                        errors.endereco ? "border-red-500" : "border-neutral-300 focus:border-blue-900"
                      }`}
                    />
                    {errors.endereco && (
                      <p className="text-red-500 text-sm mt-1 ml-1">{errors.endereco.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-neutral-700 ml-1">Ponto de Referência</label>
                    <input
                      type="text"
                      {...register("referencia")}
                      className={`w-full p-3 rounded-lg bg-neutral-50 border focus:outline-none transition-all ${
                        errors.referencia ? "border-red-500" : "border-neutral-300 focus:border-blue-900"
                      }`}
                    />
                    {errors.referencia && (
                      <p className="text-red-500 text-sm mt-1 ml-1">{errors.referencia.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-neutral-700 ml-1">Instruções de Entrega</label>
                    <textarea
                      rows="3"
                      {...register("instrucoes")}
                      className={`w-full p-3 rounded-lg bg-neutral-50 border focus:outline-none transition-all resize-none ${
                        errors.instrucoes ? "border-red-500" : "border-neutral-300 focus:border-blue-900"
                      }`}
                    />
                    {errors.instrucoes && (
                      <p className="text-red-500 text-sm mt-1 ml-1">{errors.instrucoes.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-8 border border-neutral-200">
                <h2 className="text-lg font-bold text-neutral-800 mb-6 uppercase tracking-wider border-b pb-4">
                  Método de Pagamento
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["multicaixa", "transferencia", "entrega"].map((metodo) => (
                    <label
                      key={metodo}
                      className="flex items-center gap-3 border border-neutral-300 rounded-lg p-4 cursor-pointer hover:border-blue-900 transition-colors has-checked:border-blue-900 has-checked:bg-blue-50/30"
                    >
                      <input
                        type="radio"
                        {...register("pagamento")}
                        value={metodo}
                        className="w-4 h-4 accent-blue-900"
                      />
                      <span className="text-sm font-bold text-neutral-800">
                        {metodo === "multicaixa"
                          ? "Multicaixa Express"
                          : metodo === "transferencia"
                            ? "Transferência"
                            : "Na Entrega"}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.pagamento && (
                  <p className="text-red-500 text-sm mt-4 ml-1">{errors.pagamento.message}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={handleSubmit(gerarProforma)}
                  className="flex-1 bg-neutral-800 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-neutral-900 transition active:scale-95 cursor-pointer"
                >
                  Gerar Fatura Proforma
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-blue-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-blue-800 transition shadow-lg shadow-blue-900/20 active:scale-95 cursor-pointer"
                >
                  Confirmar Pedido
                </button>
              </div>
            </form>

            <aside className="w-full lg:w-96">
              <div className="bg-white rounded-xl shadow-md p-6 border border-neutral-100 sticky top-40">
                <h2 className="text-lg font-bold text-neutral-800 mb-6">Resumo do Pedido</h2>

                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm items-start gap-4">
                      <span className="text-neutral-600 leading-tight">
                        {item.descricao} <b className="text-blue-900">x{item.quantidade}</b>
                      </span>
                      <span className="font-bold text-neutral-800 whitespace-nowrap">
                        {(item.preco_com_iva * item.quantidade).toLocaleString("pt-AO")} Kz
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-100">
                  <div className="flex justify-between text-sm text-neutral-400">
                    <span>Subtotal</span>
                    <span>{totalPrice.toLocaleString("pt-AO")} Kz</span>
                  </div>

                  <div className="flex justify-between text-xl font-black text-blue-900">
                    <span>Total</span>
                    <span>{totalPrice.toLocaleString("pt-AO")} Kz</span>
                  </div>
                </div>

                <Link
                  to="/carrinho"
                  className="block text-center mt-8 text-xs font-bold text-neutral-400 uppercase tracking-tighter hover:text-blue-900 transition"
                >
                  ← Voltar ao Carrinho
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
