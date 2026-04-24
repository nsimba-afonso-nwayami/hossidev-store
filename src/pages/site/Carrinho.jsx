import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

export default function Carrinho() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalPrice,
  } = useCart();

  const formatImageUrl = (url) => {
    if (!url) return "";
    return url.replace("/media/", "/api/media/");
  };

  return (
    <>
      <title>Carrinho | Hossidev Store</title>
      <section className="w-full bg-neutral-100 min-h-screen pt-32 md:pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 tracking-tight">
              Carrinho de Compras
            </h1>

            {cartItems.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm("Tem certeza que deseja limpar o carrinho?")) {
                    clearCart();
                  }
                }}
                className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
              >
                <i className="fa-solid fa-broom"></i>
                Limpar Carrinho
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-3xl border border-neutral-200 p-16 text-center shadow-sm">
              <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-cart-shopping text-neutral-300 text-2xl"></i>
              </div>
              <p className="text-neutral-600 mb-8">Seu carrinho está vazio.</p>
              <Link
                to="/produtos"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-900 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-blue-800 transition shadow-lg shadow-blue-900/20"
              >
                <i className="fa-solid fa-arrow-left"></i>
                Ir para produtos
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 flex flex-col gap-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-neutral-200 p-4 md:p-6 flex flex-col sm:flex-row gap-6 items-center transition-hover hover:shadow-md"
                  >
                    {item.imagem && item.imagem.split("/").pop().toLowerCase().startsWith("store_1_") ? (
                        <div className="w-24 h-24 flex items-center justify-center text-neutral-300 text-5xl">
                          <i className="fas fa-shopping-cart"></i>
                        </div>
                      ) : (
                        <img
                          src={formatImageUrl(item.imagem)}
                          alt={item.descricao}
                          className="w-24 h-24 object-contain bg-neutral-50 rounded-xl"
                        />
                      )}
                    <div className="flex-1 text-center sm:text-left">
                      <h2 className="font-bold text-neutral-800 leading-snug">
                        {item.descricao}
                      </h2>
                      <p className="text-blue-900 font-black mt-2">
                        {Number(item.preco_com_iva).toLocaleString("pt-AO")} Kz
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantidade === 1}
                        className={`w-9 h-9 flex items-center justify-center rounded transition ${
                          item.quantidade === 1
                            ? "bg-neutral-100 cursor-not-allowed opacity-50"
                            : "bg-neutral-200 hover:bg-neutral-300 cursor-pointer"
                        }`}
                      >
                        <i className="fa-solid fa-minus text-xs"></i>
                      </button>

                      <span className="font-bold min-w-5 text-center">
                        {item.quantidade}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-9 h-9 flex items-center justify-center bg-neutral-200 rounded hover:bg-neutral-300 cursor-pointer transition"
                      >
                        <i className="fa-solid fa-plus text-xs"></i>
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 cursor-pointer text-lg flex items-center justify-center w-10 h-10 rounded-lg hover:bg-red-50 transition"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                ))}

                <div className="mt-4">
                  <Link
                    to="/produtos"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-400 text-neutral-700 rounded-lg font-semibold hover:bg-neutral-200 transition"
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                    Continuar a comprar
                  </Link>
                </div>
              </div>

              <aside className="w-full lg:w-80">
                <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm">
                  <h2 className="text-lg font-bold text-neutral-800 mb-4">
                    Resumo do Pedido
                  </h2>

                  <div className="flex justify-between text-sm text-neutral-600 mb-2">
                    <span>Subtotal</span>
                    <span>{totalPrice.toLocaleString("pt-AO")} Kz</span>
                  </div>

                  <div className="flex justify-between text-sm text-neutral-600 mb-6">
                    <span>Entrega</span>
                    <span className="text-green-600 font-bold">Grátis</span>
                  </div>

                  <div className="flex justify-between text-lg font-bold text-neutral-800 mb-8 border-t pt-4">
                    <span>Total</span>
                    <span className="text-blue-900">
                      {totalPrice.toLocaleString("pt-AO")} Kz
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (isAuthenticated) {
                        navigate("/checkout");
                      } else {
                        navigate("/login", {
                          state: { from: { pathname: "/checkout" } },
                        });
                      }
                    }}
                    className="w-full cursor-pointer bg-blue-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[12px] hover:bg-blue-800 transition shadow-xl shadow-blue-900/20"
                  >
                    Finalizar Compra
                  </button>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}