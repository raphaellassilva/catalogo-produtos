import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProdutoById } from '../api/produtos'
import ProductForm from '../components/ProductForm'

// Página para criar ou editar um produto
// Reutiliza o mesmo componente ProductForm para ambos os casos
export default function NewProduct() {
  // Verifica se há um ID na URL para determinar o modo (criar ou editar)
  const { id } = useParams()
  const isEditing = Boolean(id)

  // Estado do produto carregado (apenas no modo edição)
  const [produto, setProduto] = useState(null)

  // Inicia loading apenas se estiver editando (precisa buscar dados)
  const [loading, setLoading] = useState(isEditing)

  // Se estiver editando, busca os dados do produto pelo ID
  useEffect(() => {
    if (!isEditing) return
    const fetchData = async () => {
      try {
        const res = await getProdutoById(id)
        setProduto(res.data)
      } catch {
        alert('Erro ao carregar produto.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id, isEditing])

  return (
    <div className="max-w-xl mx-auto">
      {/* Título muda conforme o modo */}
      <h1 className="text-2xl font-bold text-gray-100 mb-6">
        {isEditing ? '✏️ Editar produto' : '➕ Novo produto'}
      </h1>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        {loading ? (
          // Skeleton loading enquanto busca os dados para edição
          <div className="space-y-4 animate-pulse">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-800 rounded-xl" />
            ))}
          </div>
        ) : (
          // Renderiza o formulário passando os dados do produto (null se for criação)
          <ProductForm produtoInicial={produto} />
        )}
      </div>
    </div>
  )
}