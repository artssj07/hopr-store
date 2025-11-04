import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import FormularioReserva from './FormularioReserva';

export const revalidate = 0;

interface ProdutoDetalhado {
  id: number;
  nome: string;
  descrição: string;
  preco: number;
  url_foto_principal: string;
  categoria: string;
  estoque: number;
}
async function getProdutoPorId(id: string): Promise<ProdutoDetalhado | null> {
  if (!id || id === 'undefined') {
    return null;
  }

  const { data, error } = await supabase
    .from('produtos')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Erro ao buscar produto:', error);
    return null;
  }

  return data as ProdutoDetalhado;
}

export default async function ProdutoDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const produto = await getProdutoPorId(id); // agora ela existe

  if (!produto) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          {produto.nome}
        </h1>
        <p className="text-center text-lg text-blue-600 font-semibold">
          {produto.categoria}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-96 w-full border rounded-lg overflow-hidden shadow-lg">
          <Image
            src={
              produto.url_foto_principal ||
              `https://via.placeholder.com/400x300.png?text=Sem+Foto`
            }
            alt={`Foto do ${produto.nome}`}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">Descrição</h2>
            <p className="text-gray-600 mt-2 mb-4">
              {produto.descrição || 'Nenhuma descrição fornecida.'}
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              R$ {produto.preco ? produto.preco.toFixed(2) : '0,00'}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Estoque disponível: {produto.estoque} unidade(s)
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border">
            <h3 className="text-xl font-bold text-center mb-4">
              Formulário de Reserva
            </h3>
            {produto.estoque > 0 ? (
              <FormularioReserva produtoId={produto.id} />
            ) : (
              <p className="text-center font-bold text-red-600 bg-red-100 p-4 rounded-md">
                Produto Esgotado
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
