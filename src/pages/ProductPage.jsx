import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProdutoById } from '../api/produtos'
import ProductDetail from '../components/ProductDetail'

// Página de detalhes de um produto específico
// O ID do produto vem pelo parâmetro da URL (/produto/:id)
export default function ProductPage() {
  // Extrai o ID da URL usando o hook useParams
  const { id } = useParams()

  // Estado do produto carregado da API
  const [produto, setProduto] = useState(null)

  // Estado de loading durante a busca
  const [loading, setLoading] = useState(true)

  // Estado de erro caso o produto não seja encontrado
  const [error, setError] = useState(null)

  // Busca o produto pelo ID quando o componente é montado ou o ID muda
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

  // Exibe skeleton loading enquanto carrega
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

  // Exibe mensagem de erro se o produto não existir
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

  // Renderiza o componente de detalhe com os dados do produto
  return <ProductDetail produto={produto} />
}