// Importa Link para navegação e useNavigate para redirecionar após ações
import { Link, useNavigate } from 'react-router-dom'
import { deleteProduto } from '../api/produtos'
import { useState } from 'react'

// Componente que exibe os detalhes completos de um produto
// Recebe o produto como prop e uma função opcional onDelete
export default function ProductDetail({ produto, onDelete }) {
  const navigate = useNavigate()

  // Estado para controlar o loading durante a exclusão
  const [deleting, setDeleting] = useState(false)

  // Função que confirma e executa a exclusão do produto
  const handleDelete = async () => {
    // Pede confirmação antes de deletar
    if (!confirm('Tem certeza que deseja excluir este produto?')) return

    setDeleting(true)
    try {
      // Chama a API para deletar o produto pelo ID
      await deleteProduto(produto.id)
      if (onDelete) onDelete()
      // Redireciona para a home após exclusão bem-sucedida
      navigate('/')
    } catch {
      alert('Erro ao excluir produto.')
      setDeleting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Link para voltar ao catálogo */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-200 text-sm mb-6 transition-colors"
      >
        ← Voltar ao catálogo
      </Link>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {/* Layout em duas colunas: imagem à esquerda, info à direita */}
        <div className="grid md:grid-cols-2 gap-0">

          {/* Área da imagem do produto */}
          <div className="bg-gray-800 h-72 md:h-auto flex items-center justify-center">
            {produto.imagem ? (
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-8xl">🖥️</span>
            )}
          </div>

          {/* Informações detalhadas e ações do produto */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              {/* Badge de categoria */}
              <span className="text-xs font-medium text-violet-400 uppercase tracking-widest">
                {produto.categoria}
              </span>

              {/* Nome do produto */}
              <h1 className="text-2xl font-bold text-gray-100 mt-2">
                {produto.nome}
              </h1>

              {/* Descrição completa */}
              <p className="text-gray-400 mt-4 leading-relaxed">
                {produto.descricao}
              </p>

              {/* Preço formatado em reais */}
              <div className="mt-6">
                <span className="text-3xl font-bold text-cyan-400">
                  R${' '}
                  {Number(produto.preco).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            {/* Botões de editar e excluir */}
            <div className="flex gap-3 mt-8">
              <Link
                to={`/editar/${produto.id}`}
                className="flex-1 text-center bg-violet-600 hover:bg-violet-500 text-white font-medium py-3 rounded-xl transition-colors"
              >
                ✏️ Editar
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-600/30 font-medium py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                {deleting ? 'Excluindo...' : '🗑️ Excluir'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}