export default function Sobre() {
  return (
    <>
      <title>Sobre | Hossidev Store</title>

      <section className="w-full bg-neutral-50 pt-47 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Título */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-black text-neutral-800 tracking-tight">
              Sobre a HOSSIDEV STORE
            </h1>
            <div className="w-20 h-1 bg-blue-900 mx-auto mt-4 rounded-full"></div>
            <p className="text-neutral-600 mt-6 max-w-2xl mx-auto text-lg">
              A sua loja de confiança para produtos de tecnologia,
              eletrodomésticos e soluções de energia em Angola.
            </p>
          </div>

          {/* Conteúdo principal */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Texto */}
            <div className="space-y-6 text-neutral-600 leading-relaxed text-base">
              <p>
                A <strong className="text-blue-900 font-bold">HOSSIDEV STORE</strong> é uma loja dedicada a oferecer
                produtos de qualidade com preços competitivos, atendendo às
                necessidades do dia a dia dos nossos clientes com excelência e rigor.
              </p>

              <p className="font-semibold text-neutral-700">Trabalhamos com uma vasta variedade de produtos:</p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: "fa-plug", text: "Eletrodomésticos" },
                  { icon: "fa-bolt", text: "Energia" },
                  { icon: "fa-tv", text: "Imagem e Som" },
                  { icon: "fa-print", text: "Impressão" },
                  { icon: "fa-laptop", text: "Informática" },
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-neutral-200 shadow-sm">
                    <i className={`fa-solid ${item.icon} text-blue-900 w-5`}></i>
                    <span className="text-sm font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>

              <p>
                Nosso compromisso é oferecer atendimento de qualidade, produtos
                confiáveis e uma experiência de compra simples e segura para todos os nossos clientes.
              </p>
            </div>

            {/* Cards de Destaque */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "fa-truck-fast", title: "Entrega Rápida" },
                { icon: "fa-shield-halved", title: "Produtos Garantidos" },
                { icon: "fa-credit-card", title: "Pagamento Seguro" },
                { icon: "fa-headset", title: "Suporte ao Cliente" },
              ].map((card, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200 text-center hover:border-blue-900 transition-colors group">
                  <div className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-50 transition-colors">
                    <i className={`fa-solid ${card.icon} text-2xl text-blue-900`}></i>
                  </div>
                  <h3 className="font-bold text-neutral-700 text-sm md:text-base">
                    {card.title}
                  </h3>
                </div>
              ))}
            </div>
            
          </div>

          {/* Rodapé da Seção Sobre */}
          <div className="mt-20 grid md:grid-cols-3 gap-8 border-t border-neutral-200 pt-16">
            <div className="text-center">
              <h4 className="font-bold text-blue-900 uppercase tracking-widest text-xs mb-3">Nossa Missão</h4>
              <p className="text-sm text-neutral-500">Facilitar o acesso à tecnologia e inovação para todas as famílias.</p>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-blue-900 uppercase tracking-widest text-xs mb-3">Nossa Visão</h4>
              <p className="text-sm text-neutral-500">Ser a referência em e-commerce de eletrónicos em Angola.</p>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-blue-900 uppercase tracking-widest text-xs mb-3">Nossos Valores</h4>
              <p className="text-sm text-neutral-500">Transparência, integridade e foco na satisfação do cliente.</p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}