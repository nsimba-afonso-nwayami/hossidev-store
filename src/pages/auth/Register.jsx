import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { cadastrarSchema } from "../../validations/cadastrarSchema";
import { useAuth } from "../../contexts/AuthContext";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(cadastrarSchema),
  });

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);
    const toastId = toast.loading("Criando conta...");

    try {
      const success = await registerUser({
        username: data.nome,
        email: data.email,
        telefone: data.telefone,
        password: data.senha,
      });

      if (success) {
        toast.success("Conta criada com sucesso!", { id: toastId });
        reset();
        navigate("/login");
      } else {
        toast.error("Erro ao criar conta.", { id: toastId });
      }
    } catch (error) {
      toast.error("Erro inesperado.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="w-full min-h-screen flex items-center justify-center bg-neutral-100 py-20 px-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 border border-neutral-100">
          
          {/* Ícone do carrinho */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center bg-blue-900 text-white rounded-full text-3xl shadow-lg shadow-blue-900/20">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-neutral-800 mb-6 text-center tracking-tight">
            Criar uma conta
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Nome */}
            <div>
              <label className="block mb-2 text-neutral-700 font-semibold ml-1">
                Nome Completo
              </label>
              <input
                type="text"
                placeholder="Seu nome completo"
                className={`w-full p-4 rounded-xl bg-neutral-50 border transition-all ${
                  errors.nome
                    ? "border-red-500"
                    : "border-neutral-200 focus:border-blue-900 focus:bg-white"
                } focus:outline-none`}
                {...register("nome")}
              />
              {errors.nome && (
                <p className="text-red-500 text-sm mt-1 ml-1 font-medium">
                  {errors.nome.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-neutral-700 font-semibold ml-1">
                Email
              </label>
              <input
                type="email"
                placeholder="seuemail@exemplo.com"
                className={`w-full p-4 rounded-xl bg-neutral-50 border transition-all ${
                  errors.email
                    ? "border-red-500"
                    : "border-neutral-200 focus:border-blue-900 focus:bg-white"
                } focus:outline-none`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 ml-1 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Telefone */}
            <div>
              <label className="block mb-2 text-neutral-700 font-semibold ml-1">
                Telefone
              </label>
              <input
                type="tel"
                placeholder="923000000"
                className={`w-full p-4 rounded-xl bg-neutral-50 border transition-all ${
                  errors.telefone
                    ? "border-red-500"
                    : "border-neutral-200 focus:border-blue-900 focus:bg-white"
                } focus:outline-none`}
                {...register("telefone")}
              />
              {errors.telefone && (
                <p className="text-red-500 text-sm mt-1 ml-1 font-medium">
                  {errors.telefone.message}
                </p>
              )}
            </div>

            {/* Senha */}
            <div className="relative">
              <label className="block mb-2 text-neutral-700 font-semibold ml-1">
                Senha
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                className={`w-full p-4 pr-12 rounded-xl bg-neutral-50 border transition-all ${
                  errors.senha
                    ? "border-red-500"
                    : "border-neutral-200 focus:border-blue-900 focus:bg-white"
                } focus:outline-none`}
                {...register("senha")}
              />
              <span
                className="absolute right-4 top-12 text-neutral-400 cursor-pointer hover:text-blue-900"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
              {errors.senha && (
                <p className="text-red-500 text-sm mt-1 ml-1 font-medium">
                  {errors.senha.message}
                </p>
              )}
            </div>

            {/* Confirmar Senha */}
            <div className="relative">
              <label className="block mb-2 text-neutral-700 font-semibold ml-1">
                Confirmar Senha
              </label>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Repita sua senha"
                className={`w-full p-4 pr-12 rounded-xl bg-neutral-50 border transition-all ${
                  errors.confirmarSenha
                    ? "border-red-500"
                    : "border-neutral-200 focus:border-blue-900 focus:bg-white"
                } focus:outline-none`}
                {...register("confirmarSenha")}
              />
              <span
                className="absolute right-4 top-12 text-neutral-400 cursor-pointer hover:text-blue-900"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                <i className={`fa-solid ${showConfirm ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
              {errors.confirmarSenha && (
                <p className="text-red-500 text-sm mt-1 ml-1 font-medium">
                  {errors.confirmarSenha.message}
                </p>
              )}
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 mt-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[12px] transition-all text-white shadow-xl
              ${
                loading
                  ? "bg-neutral-400 cursor-not-allowed opacity-70"
                  : "bg-blue-900 hover:bg-blue-800 cursor-pointer shadow-blue-900/20 active:scale-95"
              }
            `}
            >
              {loading ? "Criando conta..." : "Criar Conta"}
            </button>

            {/* Link login */}
            <p className="mt-6 text-center text-sm text-neutral-600">
              Já tem uma conta?{" "}
              <Link
                to="/login"
                className="text-blue-900 font-bold hover:underline"
              >
                Entrar
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}