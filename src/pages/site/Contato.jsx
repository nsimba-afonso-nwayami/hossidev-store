import WhatsAppButton from "../../components/WhatsAppButton";

export default function Contato() {
  return (
    <>
      <title>Contato | Hossidev Store</title>

      <section className="w-full bg-neutral-100 pt-47 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Título */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-black text-neutral-800 tracking-tight">
              Fale Connosco
            </h1>
            <div className="w-16 h-1 bg-blue-900 mx-auto mt-4 rounded-full"></div>
            <p className="text-neutral-600 mt-6 max-w-xl mx-auto">
              Entre em contato com a <span className="font-bold text-blue-900">HOSSIDEV STORE</span> para informações, compras ou
              assistência técnica especializada.
            </p>
          </div>

          {/* Grid de informações */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Horário */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 hover:border-blue-800 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <i className="fa-solid fa-clock text-blue-900 text-xl"></i>
                <h3 className="font-bold text-neutral-800">
                  Horário de Atendimento
                </h3>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                Segunda - Sexta
                <br />
                <span className="font-medium text-neutral-700">08:00h - 17:00h</span>
              </p>
            </div>

            {/* Localização */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 hover:border-blue-800 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <i className="fa-solid fa-location-dot text-blue-900 text-xl"></i>
                <h3 className="font-bold text-neutral-800">Localização</h3>
              </div>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Centralidade do Kilamba
                <br />
                Quarteirão F, edifício F27,
                <br />
                Apartamento 91 – Kilamba
                <br />
                Luanda - Angola
              </p>
            </div>

            {/* Telefones */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 hover:border-blue-800 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <i className="fa-solid fa-phone text-blue-900 text-xl"></i>
                <h3 className="font-bold text-neutral-800">Telefones</h3>
              </div>
              <p className="text-neutral-600 font-medium">
                (+244) 921 909 103
                <br />
                (+244) 972 614 886
              </p>
            </div>

            {/* Email geral */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 hover:border-blue-800 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <i className="fa-solid fa-envelope text-blue-900 text-xl"></i>
                <h3 className="font-bold text-neutral-800">Email</h3>
              </div>
              <p className="text-neutral-600 font-medium">geral@hossidev.com</p>
            </div>

            {/* WhatsApp */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 hover:border-blue-800 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <i className="fa-brands fa-whatsapp text-blue-900 text-xl"></i>
                <h3 className="font-bold text-neutral-800">WhatsApp</h3>
              </div>
              <p className="text-neutral-600 font-medium">(+244) 972 614 886</p>
            </div>

            {/* Contactos comerciais */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 hover:border-blue-800 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <i className="fa-solid fa-briefcase text-blue-900 text-xl"></i>
                <h3 className="font-bold text-neutral-800">
                  Contactos Comerciais
                </h3>
              </div>
              <p className="text-neutral-600">
                (+244) 921 793 774
                <br />
                <span className="text-sm">Email: geral@hossidev.com</span>
              </p>
            </div>

            {/* Assistência técnica */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 hover:border-blue-800 transition-colors md:col-span-2 lg:col-span-3">
              <div className="flex items-center gap-3 mb-4">
                <i className="fa-solid fa-screwdriver-wrench text-blue-900 text-xl"></i>
                <h3 className="font-bold text-neutral-800">
                  Assistência Técnica
                </h3>
              </div>
              <p className="text-neutral-600">
                (+244) 921 791 707 / 921 902 078
                <br />
                <span className="font-medium">Email: suporte@hossidev.com</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Botão WhatsApp fixo */}
      <WhatsAppButton phone="244972614886" size={64} />
    </>
  );
}