import { Link, useNavigate } from 'react-router-dom'
import { deleteProduto } from '../api/produtos'
import { useState } from 'react'

export default function ProductDetail({ produto, onDelete }) {
  const navigate = useNavigate()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return
    setDeleting(true)
    try {
      await deleteProduto(produto.id)
      if (onDelete) onDelete()
      navigate('/')
    } catch {
      alert('Erro ao excluir produto.')
      setDeleting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-200 text-sm mb-6 transition-colors"
      >
        ← Voltar ao catálogo
      </Link>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
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

          <div className="p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-medium text-violet-400 uppercase tracking-widest">
                {produto.categoria}
              </span>
              <h1 className="text-2xl font-bold text-gray-100 mt-2">
                {produto.nome}
              </h1>
              <p className="text-gray-400 mt-4 leading-relaxed">
                {produto.descricao}
              </p>
              <div className="mt-6">
                <span className="text-3xl font-bold text-cyan-400">
                  R${' '}
                  {Number(produto.preco).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

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
