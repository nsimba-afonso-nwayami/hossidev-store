import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import ClienteLayout from "./components/ClienteLayout";
import Modal from "./components/Modal";
import {
  listarEnderecos,
  criarEndereco,
  atualizarEndereco,
  removerEndereco,
} from "../../services/enderecoService";
import { enderecoSchema } from "../../validations/enderecoSchema";

export default function Enderecos() {
  const [enderecos, setEnderecos] = useState([]);
  const [busca, setBusca] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(enderecoSchema),
  });

  useEffect(() => {
    async function carregar() {
      try {
        const data = await listarEnderecos();
        setEnderecos(data || []);
      } catch (error) {
        console.error("Erro ao carregar endereços:", error);
        toast.error("Falha na sincronização de endereços.");
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, []);

  const enderecosFiltrados = enderecos.filter((item) => {
    if (!busca) return true;
    return (
      item.rua?.toLowerCase().includes(busca.toLowerCase()) ||
      item.cidade?.toLowerCase().includes(busca.toLowerCase()) ||
      item.provincia?.toLowerCase().includes(busca.toLowerCase()) ||
      item.pais?.toLowerCase().includes(busca.toLowerCase())
    );
  });

  const abrirModal = (endereco = null) => {
    setEnderecoSelecionado(endereco);
    const valoresIniciais = {
      rua: endereco?.rua || "",
      cidade: endereco?.cidade || "",
      provincia: endereco?.provincia || "",
      codigo_postal: endereco?.codigo_postal || "",
      pais: endereco?.pais || "",
    };
    reset(valoresIniciais);
    setOpenModal(true);
  };

  const salvarEndereco = async (data) => {
    setSaving(true);
    const toastId = toast.loading(
      enderecoSelecionado ? "Atualizando registro..." : "Criando novo registro...",
    );

    try {
      if (enderecoSelecionado) {
        await atualizarEndereco(enderecoSelecionado.id, data);
        toast.success("Endereço atualizado!", { id: toastId });
      } else {
        await criarEndereco(data);
        toast.success("Endereço registrado!", { id: toastId });
      }
      const novos = await listarEnderecos();
      setEnderecos(novos || []);
      setOpenModal(false);
    } catch (error) {
      toast.error("Erro na operação de salvamento.", { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  const excluirEndereco = async (id) => {
    if (!window.confirm("Confirmar a exclusão deste endereço?")) return;
    try {
      await removerEndereco(id);
      const data = await listarEnderecos();
      setEnderecos(data || []);
      toast.success("Endereço removido.");
    } catch (error) {
      toast.error("Erro ao remover endereço.");
    }
  };

  if (loading) {
    return (
      <ClienteLayout title="Endereços">
        <section className="w-full py-32 text-center">
          <i className="fas fa-spinner fa-spin text-3xl text-blue-900 mb-4"></i>
          <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Localizando Dados...</p>
        </section>
      </ClienteLayout>
    );
  }

  return (
    <>
      <title>Endereços | HOSSIDEV Store</title>

      <ClienteLayout title="Gestão de Localidades">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="relative w-full md:max-w-md">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"></i>
            <input
              type="text"
              placeholder="Filtrar por rua, cidade ou país..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-neutral-100 focus:border-blue-900/20 focus:outline-none text-sm font-medium shadow-sm transition-all"
            />
          </div>
          
          <button
            onClick={() => abrirModal()}
            className="w-full md:w-auto px-8 py-4 cursor-pointer bg-blue-900 hover:bg-blue-800 text-neutral-50 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20 transition-all active:scale-95"
          >
            <i className="fas fa-plus-circle text-sm"></i> Novo Endereço
          </button>
        </div>

        {enderecosFiltrados.length === 0 ? (
          <div className="bg-white p-20 rounded-3xl border border-neutral-100 text-center">
            <i className="fas fa-map-location-dot text-5xl text-neutral-100 mb-6"></i>
            <p className="text-sm font-black text-neutral-400 uppercase tracking-widest">
              Nenhuma localidade registrada.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {enderecosFiltrados.map((endereco) => (
              <div
                key={endereco.id}
                className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm hover:shadow-md transition-all relative group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-neutral-50 rounded-xl flex items-center justify-center text-blue-900 border border-neutral-100 group-hover:bg-blue-900 group-hover:text-white transition-all">
                    <i className="fas fa-map-pin"></i>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => abrirModal(endereco)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-neutral-50 text-neutral-400 hover:text-blue-900 hover:bg-blue-50 transition-all cursor-pointer"
                      title="Editar"
                    >
                      <i className="fas fa-pen-to-square"></i>
                    </button>
                    <button
                      onClick={() => excluirEndereco(endereco.id)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-neutral-50 text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                      title="Remover"
                    >
                      <i className="fas fa-trash-can"></i>
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-neutral-700 uppercase tracking-tight">
                    {endereco.rua}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-widest">
                    <span>{endereco.cidade}</span>
                    <span className="w-1 h-1 bg-neutral-200 rounded-full"></span>
                    <span>{endereco.provincia}</span>
                  </div>
                  <div className="pt-2 flex items-center gap-2 text-[10px] font-black text-blue-900/60 uppercase">
                    <i className="fas fa-globe-africa"></i>
                    <span>{endereco.pais}</span>
                    {endereco.codigo_postal && (
                      <>
                        <span className="ml-2 px-2 py-0.5 bg-neutral-100 rounded text-neutral-500">
                          {endereco.codigo_postal}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Modal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title={enderecoSelecionado ? "Modificar Endereço" : "Registrar Endereço"}
          icon="fas fa-map-location"
        >
          <form onSubmit={handleSubmit(salvarEndereco)} className="space-y-5">
            {[
              { id: "rua", label: "Rua / Logradouro", icon: "fa-road" },
              { id: "cidade", label: "Cidade", icon: "fa-city" },
              { id: "provincia", label: "Província", icon: "fa-layer-group" },
              { id: "codigo_postal", label: "Código Postal", icon: "fa-mailbox" },
              { id: "pais", label: "País", icon: "fa-earth-africa" }
            ].map((campo) => (
              <div key={campo.id} className="group">
                <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2 ml-1">
                  {campo.label}
                </label>
                <div className="relative">
                  <i className={`fas ${campo.icon} absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-blue-900 transition-colors`}></i>
                  <input
                    type="text"
                    {...register(campo.id)}
                    disabled={saving}
                    className={`w-full pl-12 pr-4 py-4 bg-neutral-50 border rounded-2xl focus:outline-none transition-all font-bold text-sm text-neutral-700 ${
                      errors[campo.id] 
                        ? "border-red-200 focus:border-red-400" 
                        : "border-neutral-100 focus:border-blue-900/20 focus:bg-white"
                    }`}
                  />
                </div>
                {errors[campo.id] && (
                  <p className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1 tracking-tighter">
                    {errors[campo.id].message}
                  </p>
                )}
              </div>
            ))}

            <div className="flex flex-col-reverse md:flex-row justify-end gap-3 mt-10">
              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="px-8 py-4 text-[11px] font-black uppercase tracking-widest text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                disabled={saving}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="px-10 py-4 bg-blue-900 hover:bg-blue-800 text-neutral-50 text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-blue-900/20 transition-all disabled:opacity-50 cursor-pointer"
                disabled={saving}
              >
                {saving ? "Processando..." : "Finalizar Registro"}
              </button>
            </div>
          </form>
        </Modal>
      </ClienteLayout>
    </>
  );
}