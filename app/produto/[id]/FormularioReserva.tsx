'use client';

import { useState, useEffect } from 'react'; 
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

interface FormularioProps {
  produtoId: number;
}

export default function FormularioReserva({ produtoId }: FormularioProps) {
  const [nome, setNome] = useState('');
  const [setor, setSetor] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const [showTerms, setShowTerms] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);


  const [countdown, setCountdown] = useState(5);
  const router = useRouter();


  useEffect(() => {
 
    if (mensagem) {
   
      if (countdown === 0) {
        router.push('/'); 
        return;
      }


      const timer = setTimeout(() => {
        setCountdown(countdown - 1); 
      }, 1000);

  
      return () => clearTimeout(timer);
    }
  }, [mensagem, countdown, router]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');
    setErro('');

    if (!termsAgreed || !nome || !setor) {
      setErro(
        'Por favor, preencha todos os campos e aceite os termos de aquisição.'
      );
      setLoading(false);
      return;
    }

    const { error } = await supabase.from('pedidos').insert([
      {
        nome_solicitante: nome,
        setor_solicitante: setor,
        id_produto: produtoId,
        termo_aceite: true,
      },
    ]);

    if (error) {
      console.error('Erro ao criar pedido:', error);
      setErro('Falha ao registrar o pedido. Tente novamente.');
    } else {
      setMensagem(
        'Reserva solicitada com sucesso! O setor de TI entrará em contato.'
      );
    }

    setLoading(false);
  };

  const handleAgreeToTerms = () => {
    setTermsAgreed(true);
    setShowTerms(false);
  };


  if (mensagem) {
    return (
      <div className="text-center p-6 rounded-lg bg-green-100 border border-green-300">
        <p className="font-bold text-green-800 text-lg">{mensagem}</p>
        <p className="text-gray-600 mt-2">
          Redirecionando para a tela inicial em {countdown} segundos...
        </p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-gray-700"
          >
            Seu Nome Completo
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label
            htmlFor="setor"
            className="block text-sm font-medium text-gray-700"
          >
            Seu Setor / Matrícula
          </label>
          <input
            type="text"
            id="setor"
            value={setor}
            onChange={(e) => setSetor(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div className="mt-6">
          {!termsAgreed ? (
            <button
              type="button"
              onClick={() => setShowTerms(true)}
              className="w-full text-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ler e Aceitar os Termos de Aquisição
            </button>
          ) : (
            <div className="flex items-center justify-center gap-2 p-3 bg-green-100 border border-green-300 rounded-md">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span className="font-semibold text-green-700">
                Termos de aquisição aceitos.
              </span>
            </div>
          )}
        </div>

        {erro && (
          <p className="text-center font-medium text-red-600">{erro}</p>
        )}

        <button
          type="submit"
          disabled={loading || !termsAgreed || !nome || !setor}
          className="w-full text-center bg-green-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Enviando...' : 'Solicitar Reserva'}
        </button>
      </form>

      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Termos de Compra – Bazar de Equipamentos
              </h2>
            </div>
            <div className="space-y-3 text-gray-700 text-sm">
              <section>
                <h3 className="font-bold">Elegibilidade para compra</h3>
                <p>
                  A aquisição dos equipamentos é exclusiva para colaboradores
                  do Hospital de Olhos do Paraná e membros do Corpo Clínico.
                </p>
              </section>
              <section>
                <h3 className="font-bold">Forma de pagamento</h3>
                <p>
                  As vendas serão realizadas mediante pagamento à vista,
                  via PIX, débito ou cartão de crédito em até 3x,
                  diretamente ao setor financeiro do Hospital.
                </p>
              </section>
              <section>
                <h3 className="font-bold">Condições dos equipamentos</h3>
                <p>
                  Os computadores serão entregues ao comprador higienizados,
                  formatados e com todos os seus componentes testados
                  previamente pelo Departamento de Tecnologia da Informação (TI).
                </p>
              </section>
              <section>
                <h3 className="font-bold">Ausência de garantia</h3>
                <p>
                  Os equipamentos são vendidos no estado em que se encontram,
                  sem garantia de funcionamento futuro, assumindo o comprador
                  total responsabilidade pela aquisição e eventuais reparos
                  após a compra.
                </p>
              </section>
              <section>
                <h3 className="font-bold">Local de retirada</h3>
                <p>
                  A retirada dos equipamentos deverá ser realizada na sala do
                  setor de TI, localizada no 2º andar administrativo do prédio
                  da Batel – Taunay (Antigo Centro Cirúrgico).
                </p>
              </section>
              <section>
                <h3 className="font-bold">Conferência do equipamento</h3>
                <p>
                  No ato da retirada, o comprador deverá realizar os testes
                  necessários e conferir o pleno funcionamento do equipamento
                  junto ao setor de TI, não sendo aceitas reclamações
                  posteriores.
                </p>
              </section>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowTerms(false)}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={handleAgreeToTerms}
                className="px-4 py-2 rounded-md bg-green-700 text-white font-bold hover:bg-green-800"
              >
                Li e Concordo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}