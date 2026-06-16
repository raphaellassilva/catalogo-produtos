import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProdutoById } from '../api/produtos'
import ProductDetail from '../components/ProductDetail'

export default function ProductPage() {
  const { id } = useParams()
  const [produto, setProduto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProdutoById(id)
        setProduto(res.data)
      } catch {
        setError('Produto não encontrado.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden animate-pulse">
          <div className="grid md:grid-cols-2">
            <div className="bg-gray-800 h-72" />
            <div className="p-8 space-y-4">
              <div className="h-3 bg-gray-800 rounded w-1/4" />
              <div className="h-6 bg-gray-800 rounded w-3/4" />
              <div className="h-4 bg-gray-800 rounded w-full" />
              <div className="h-4 bg-gray-800 rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-5xl mb-4">😔</p>
        <p className="text-red-400 font-medium">{error}</p>
        <Link to="/" className="text-violet-400 text-sm mt-2 inline-block hover:underline">
          Voltar ao catálogo
        </Link>
      </div>
    )
  }

  return <ProductDetail produto={produto} />
}
