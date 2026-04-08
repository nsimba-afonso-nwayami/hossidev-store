import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-50 text-neutral-700 border-t border-neutral-200 pt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Branding e Endereço */}
        <div className="md:col-span-4 flex flex-col">
          <Link to="/" className="flex flex-col leading-none mb-6 no-underline group">
            <span className="text-2xl font-[900] tracking-tighter text-neutral-700 group-hover:text-blue-900 transition-colors">
              HOSSIDEV
            </span>
            <span className="text-[10px] font-bold tracking-[0.4em] text-blue-900 uppercase">
              Store
            </span>
          </Link>
          <p className="text-neutral-500 text-sm leading-relaxed mb-6 max-w-sm">
            Centralidade do Kilamba, Quarteirão F, edifício F27, apartamento 91,
            Kilamba, Luanda - Angola
          </p>
          <div className="flex flex-col gap-3 text-sm font-medium">
            <a href="mailto:geral@hossidev.com" className="flex items-center gap-2 text-neutral-600 hover:text-blue-900 transition-colors no-underline">
              <i className="far fa-envelope text-blue-900"></i> geral@hossidev.com
            </a>
            <span className="flex items-center gap-2 text-neutral-600">
              <i className="fas fa-phone-alt text-blue-900"></i> (+244) 972 614 886
            </span>
          </div>
        </div>

        {/* Institucional - Sem <li> */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-900 mb-2">
            Institucional
          </h4>
          <Link to="/sobre" className="text-sm text-neutral-500 hover:text-blue-900 transition-colors no-underline">Sobre Nós</Link>
          <Link to="/politica-privacidade" className="text-sm text-neutral-500 hover:text-blue-900 transition-colors no-underline">Privacidade</Link>
          <Link to="/servicos" className="text-sm text-neutral-500 hover:text-blue-900 transition-colors no-underline">Serviços</Link>
          <Link to="/contato" className="text-sm text-neutral-500 hover:text-blue-900 transition-colors no-underline">Contactos</Link>
        </div>

        {/* Categorias - Sem <li> */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-900 mb-2">
            Categorias
          </h4>
          <Link to="/categoria/informatica-impressao" className="text-sm text-neutral-500 hover:text-blue-900 transition-colors no-underline">Informática & Impressão</Link>
          <Link to="/categoria/redes-internet-telecom" className="text-sm text-neutral-500 hover:text-blue-900 transition-colors no-underline">Redes & Internet</Link>
          <Link to="/categoria/energia-seguranca" className="text-sm text-neutral-500 hover:text-blue-900 transition-colors no-underline">Segurança Eletrónica</Link>
          <Link to="/categoria/smartphones-tablets" className="text-sm text-neutral-500 hover:text-blue-900 transition-colors no-underline">Smartphones & Tablets</Link>
        </div>

        {/* Suporte Técnico */}
        <div className="md:col-span-3">
          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-900 mb-6">
            Suporte Técnico
          </h4>
          <div className="bg-neutral-100 rounded-2xl p-6">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-tighter mb-1">Horário</p>
            <p className="text-sm font-bold text-neutral-700 mb-4">Seg - Sex: 08h às 17h</p>
            
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-tighter mb-1">WhatsApp</p>
            <a href="tel:+244921791707" className="text-sm font-black text-blue-900 hover:underline no-underline">
              (+244) 921 791 707
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-neutral-100 py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-neutral-500 font-medium">
            &copy; {currentYear} <span className="font-bold text-neutral-700">HOSSIDEV STORE</span>. 
            Todos os direitos reservados.
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-neutral-400 text-lg">
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
            </div>
            <Link to="/contato" className="text-[10px] font-black uppercase tracking-widest bg-blue-900 text-white px-6 py-2.5 rounded-full hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/10 no-underline">
              Falar Conosco
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}