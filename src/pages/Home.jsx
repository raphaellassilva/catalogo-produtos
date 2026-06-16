import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProdutos } from '../api/produtos'
import ProductList from '../components/ProductList'

// Categorias disponíveis para o filtro, incluindo "Todas"
const CATEGORIAS = [
  'Todas',
  'Smartphones',
  'Notebooks',
  'Periféricos',
  'TVs',
  'Áudio',
  'Games',
  'Outros',
]

// Página principal que lista todos os produtos com filtros
export default function Home() {
  // Estado da lista de produtos carregados da API
  const [produtos, setProdutos] = useState([])

  // Estado de loading durante a busca na API
  const [loading, setLoading] = useState(true)

  // Estado de erro caso a requisição falhe
  const [error, setError] = useState(null)

  // Categoria selecionada para filtrar os produtos
  const [categoria, setCategoria] = useState('Todas')

  // Lê o parâmetro de busca da URL (ex: /?busca=iphone)
  const [searchParams] = useSearchParams()
  const busca = searchParams.get('busca') || ''

  // Busca os produtos da API quando o componente é montado
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await getProdutos()
        setProdutos(res.data)
      } catch (err) {
        setError('Não foi possível carregar os produtos.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Filtra os produtos por categoria e pelo texto de busca
  const filtrados = produtos.filter((p) => {
    const matchCategoria = categoria === 'Todas' || p.categoria === categoria
    const matchBusca =
      !busca ||
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.descricao?.toLowerCase().includes(busca.toLowerCase())
    return matchCategoria && matchBusca
  })

  return (
    <div>
      {/* Cabeçalho da página com título e contagem de produtos */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100">
          Catálogo de{' '}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Eletrônicos
          </span>
        </h1>
        <p className="text-gray-500 mt-1">
          {loading ? '...' : `${filtrados.length} produto(s) encontrado(s)`}
        </p>
      </div>

      {/* Botões de filtro por categoria */}
      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              categoria === cat
                ? 'bg-violet-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Indicador do termo sendo buscado */}
      {busca && (
        <p className="text-gray-500 text-sm mb-4">
          Buscando por:{' '}
          <span className="text-violet-400 font-medium">"{busca}"</span>
        </p>
      )}

      {/* Lista de produtos filtrados */}
      <ProductList produtos={filtrados} loading={loading} error={error} />
    </div>
  )
}