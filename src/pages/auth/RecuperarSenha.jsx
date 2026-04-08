import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { recuperarSenhaSchema } from "../../validations/recuperarSenhaSchema";

export default function RecuperarSenha() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(recuperarSenhaSchema),
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading("Enviando link de recuperação...");

    try {
      // Simulação de envio para API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Link de recuperação enviado para o seu email!", {
        id: toastId,
      });
      reset();
    } catch (error) {
      toast.error("Erro ao enviar o link.", { id: toastId });
    }
  };

  return (
    <>
      <section className="w-full min-h-screen flex items-center justify-center bg-neutral-100 py-20 px-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 border border-neutral-100">
          
          {/* Ícone da Loja */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center bg-blue-900 text-white rounded-full text-3xl shadow-lg shadow-blue-900/20">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-neutral-800 mb-4 text-center tracking-tight">
            Recuperar Senha
          </h1>

          <p className="text-sm text-neutral-500 text-center mb-8 leading-relaxed">
            Digite o seu email e enviaremos um link para redefinir sua senha.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div>
              <label className="block mb-2 text-neutral-700 font-semibold ml-1">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <input
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  className={`w-full pl-12 p-4 rounded-xl bg-neutral-50 border transition-all ${
                    errors.email
                      ? "border-red-500"
                      : "border-neutral-200 focus:border-blue-900 focus:bg-white"
                  } focus:outline-none`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 ml-1 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Botão */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-black uppercase tracking-[0.15em] text-[12px] bg-blue-900 hover:bg-blue-800 transition-all cursor-pointer text-white shadow-xl shadow-blue-900/20 active:scale-95"
            >
              Enviar link de recuperação
            </button>

            {/* Voltar para login */}
            <p className="mt-6 text-center text-sm text-neutral-600">
              Lembrou da senha?{" "}
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