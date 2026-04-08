import WhatsAppButton from "../../components/WhatsAppButton";

export default function PoliticaPrivacidade() {
  return (
    <>
      <title>Política de Privacidade | Hossidev Store</title>

      <section className="w-full bg-neutral-100 pt-47 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-black text-neutral-800 mb-8 tracking-tight">
            Termos e Condições
          </h1>

          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-neutral-200 text-neutral-700 space-y-6 text-sm leading-relaxed">
            <p>
              Estes Termos e Condições regulam o acesso e a utilização da loja
              online da empresa{" "}
              <strong className="text-blue-900">
                HOSSIDEV COMÉRCIO GERAL E PRESTAÇÃO DE SERVIÇOS
              </strong>
              , NIF: 5002061422, com sede em Luanda, Centralidade do Kilamba,
              Quarteirão F, Apartamento 91, 9º andar. Ao utilizar o site{" "}
              <strong className="text-blue-900 font-bold">www.hossidev.com</strong>, o Cliente concorda com os
              termos descritos neste documento.
            </p>

            <h2 className="text-lg font-bold text-neutral-800 border-b pb-2">
              A. Informação Geral sobre os Produtos
            </h2>

            <p>
              <strong>1. Imagens:</strong> As imagens são ilustrativas e podem
              existir diferenças entre a imagem apresentada e o produto real.
            </p>

            <p>
              <strong>2. Descrições:</strong> Baseadas nas informações dos
              fabricantes. A <span className="font-semibold">Hossidev Store</span> não se responsabiliza por eventuais imprecisões técnicas.
            </p>

            <p>
              <strong>3. Fichas técnicas:</strong> São da inteira responsabilidade dos
              fabricantes, podendo sofrer alterações sem aviso prévio.
            </p>

            <p>
              <strong>4. Políticas dos fabricantes:</strong> Podem ser alteradas
              a qualquer momento sem responsabilidade direta da Hossidev.
            </p>

            <p>
              <strong>5. Manuais:</strong> Fornecidos pelos fabricantes, sem
              garantia absoluta de ausência de erros de tradução ou conteúdo.
            </p>

            <h2 className="text-lg font-bold text-neutral-800 border-b pb-2">
              B. Condições Gerais de Venda
            </h2>

            <p>
              Estas condições regulam o uso dos serviços do site
              <strong className="text-blue-900"> www.hossidev.com</strong>, incluindo a venda de
              produtos eletrônicos, informática, eletrodomésticos, áudio, vídeo
              e telemóveis.
            </p>

            <h3 className="font-bold text-neutral-800">
              Processo de Compra
            </h3>

            <ul className="list-disc pl-5 space-y-2">
              <li>O cliente seleciona os produtos, define a morada de entrega e o método de pagamento.</li>
              <li>Após a finalização, recebe uma confirmação por e-mail.</li>
              <li>As encomendas dependem exclusivamente da validação do pagamento.</li>
              <li>Em caso de falta de stock, o reembolso será processado em até 20 dias úteis.</li>
            </ul>

            <h3 className="font-bold text-neutral-800">
              Preços e Pagamento
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Preços expressos em AKZ (Kwanza) com todos os impostos incluídos.</li>
              <li>Aceitamos transferência bancária, depósito ou pagamento via Multicaixa / Express.</li>
              <li>A reserva do produto só é garantida após a confirmação bancária do pagamento.</li>
            </ul>

            <h3 className="font-bold text-neutral-800">Entrega</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Prazo médio de até 3 dias úteis para Luanda.</li>
              <li>A entrega será feita no endereço exato indicado no formulário de checkout.</li>
              <li>Atrasos superiores a 20 dias úteis conferem ao cliente o direito de cancelamento e reembolso integral.</li>
            </ul>

            <h3 className="font-bold text-neutral-800">
              Garantia e Devoluções
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Garantia aplicada conforme a legislação angolana e os termos do fabricante.</li>
              <li>Prazo de devolução de até 7 dias após o recebimento (Direito de Arrependimento).</li>
              <li>O produto deve estar rigorosamente sem uso e na embalagem original lacrada.</li>
              <li>
                <span className="text-red-600 font-medium">Exceções:</span> produtos de higiene pessoal, softwares com selo rompido e itens personalizados.
              </li>
            </ul>

            <h3 className="font-bold text-neutral-800">
              Direitos e Obrigações
            </h3>
            <p>
              O cliente compromete-se a fornecer dados verdadeiros. A <span className="font-semibold">Hossidev Store</span> reserva-se o direito de cancelar encomendas por inconsistência de dados, falta de pagamento ou rutura de stock.
            </p>

            <h3 className="font-bold text-neutral-800">Jurisdição</h3>
            <p>
              Estes termos são regidos pelas leis da República de Angola. Qualquer litígio será resolvido no Foro da Comarca de Luanda.
            </p>

            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200 mt-8">
              <h2 className="text-lg font-bold text-blue-900 mb-4">Contato</h2>
              <div className="space-y-2 text-neutral-600">
                <p><strong>Email:</strong> info@hossidev.com</p>
                <p><strong>WhatsApp:</strong> (+244) 972 614 886</p>
                <p><strong>Telefone:</strong> (+244) 921 909 103</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Botão WhatsApp fixo */}
      <WhatsAppButton phone="244972614886" size={64} />
    </>
  );
}