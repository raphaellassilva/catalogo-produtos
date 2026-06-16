import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProdutoById } from '../api/produtos'
import ProductForm from '../components/ProductForm'

export default function NewProduct() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const [produto, setProduto] = useState(null)
  const [loading, setLoading] = useState(isEditing)

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
      <h1 className="text-2xl font-bold text-gray-100 mb-6">
        {isEditing ? '✏️ Editar produto' : '➕ Novo produto'}
      </h1>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        {loading ? (
          <div className="space-y-4 animate-pulse">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-800 rounded-xl" />
            ))}
          </div>
        ) : (
          <ProductForm produtoInicial={produto} />
        )}
      </div>
    </div>
  )
}
