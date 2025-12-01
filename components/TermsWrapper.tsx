'use client';

import { useState, useEffect } from 'react';

export default function TermsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAgreed, setHasAgreed] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const agreed = localStorage.getItem('hoprStoreBazar.hasAgreed');
    if (agreed === 'true') {
      setHasAgreed(true);
    }
    setIsLoading(false);
  }, []);

  const handleAgree = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!isChecked) {
      setFormError('Você precisa marcar a caixa "Li e concordo com os termos".');
      return;
    }

    localStorage.setItem('hoprStoreBazar.hasAgreed', 'true');
    setHasAgreed(true);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        Carregando...
      </div>
    );
  }

  if (hasAgreed) {
    return <>{children}</>;
  }

  return (
    <main className="container mx-auto p-4 max-w-3xl py-12">

      <div className="mb-6 p-4 border-2 border-red-700 bg-red-100 text-red-800 rounded-lg">
        <h2 className="text-xl font-bold text-red-700 text-center">
          ⚠️ AVISO IMPORTANTE ⚠️
        </h2>
        <p className="text-center font-semibold mt-2">
          MÁQUINAS ADQUIRIDAS NO BAZAR NÃO PODERÃO SER REUTILIZADAS NO HOPR
        </p>
      </div>

      <div className="text-center mb-6">
        <div className="flex justify-center items-center gap-2">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
          <h1 className="text-3xl font-bold text-red-600">ATENÇÃO</h1>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Termos de Compra – Bazar de Equipamentos de Informática
        </h2>
      </div>

      <div className="space-y-4 text-gray-700">
        <section>
          <h3 className="font-bold text-lg">Elegibilidade para compra</h3>
          <p>
            A aquisição dos equipamentos é exclusiva para colaboradores do
            Hospital de Olhos do Paraná e membros do Corpo Clínico.
          </p>
        </section>
        <section>
          <h3 className="font-bold text-lg">Forma de pagamento</h3>
          <p>
            As vendas serão realizadas mediante pagamento à vista, via PIX, 
            débito ou cartão de crédito em até 3x, diretamente ao
            setor financeiro do Hospital.
          </p>
        </section>
        <section>
          <h3 className="font-bold text-lg">Condições dos equipamentos</h3>
          <p>
            Os computadores serão entregues ao comprador higienizados,
            formatados e com todos os seus componentes testados previamente
            pelo Departamento de Tecnologia da Informação (TI).
          </p>
        </section>
        <section>
          <h3 className="font-bold text-lg">Ausência de garantia</h3>
          <p>
            Os equipamentos são vendidos no estado em que se encontram, sem
            garantia de funcionamento futuro, assumindo o comprador total
            responsabilidade pela aquisição e eventuais reparos após a compra.
          </p>
        </section>
        <section>
          <h3 className="font-bold text-lg">Local de retirada</h3>
          <p>
            A retirada dos equipamentos deverá ser realizada na sala do setor de
            TI, localizada no 2º andar administrativo do prédio da Batel –
            Taunay (Antigo Centro Cirúrgico).
          </p>
        </section>
        <section>
          <h3 className="font-bold text-lg">Conferência do equipamento</h3>
          <p>
            No ato da retirada, o comprador deverá realizar os testes
            necessários e conferir o pleno funcionamento do equipamento junto ao
            setor de TI, não sendo aceitas reclamações posteriores.
          </p>
        </section>
      </div>

      <form
        onSubmit={handleAgree}
        className="mt-10 p-6 border rounded-lg bg-gray-50"
      >
        <h3 className="text-xl font-bold text-center mb-4">
          Confirmação de Leitura
        </h3>

        <div className="flex items-center mt-6">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label
            htmlFor="terms"
            className="ml-2 block text-sm text-gray-900"
          >
            Li e concordo com todos os termos de aquisição.
          </label>
        </div>

        {formError && (
          <p className="text-center font-medium text-red-600 mt-4">
            {formError}
          </p>
        )}

        <button
          type="submit"
          className="w-full text-center bg-green-700 text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-green-800 transition-colors"
        >
          Acessar Bazar
        </button>
      </form>
    </main>
  );
}
