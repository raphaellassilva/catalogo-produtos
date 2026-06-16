import ProductCard from './ProductCard'

export default function ProductList({ produtos, loading, error }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden animate-pulse"
          >
            <div className="bg-gray-800 h-48" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-800 rounded w-3/4" />
              <div className="h-3 bg-gray-800 rounded w-full" />
              <div className="h-3 bg-gray-800 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-4">⚠️</p>
        <p className="text-red-400 font-medium">{error}</p>
        <p className="text-gray-500 text-sm mt-2">
          Verifique se a URL do MockAPI está configurada corretamente em{' '}
          <code className="text-violet-400">src/api/produtos.js</code>
        </p>
      </div>
    )
  }

  if (produtos.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-5xl mb-4">📦</p>
        <p className="text-gray-400 font-medium">Nenhum produto encontrado</p>
        <p className="text-gray-600 text-sm mt-1">
          Adicione produtos clicando em "+ Novo Produto"
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {produtos.map((produto) => (
        <ProductCard key={produto.id} produto={produto} />
      ))}
    </div>
  )
}
