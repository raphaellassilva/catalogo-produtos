import { Link } from 'react-router-dom'

const CATEGORY_COLORS = {
  Smartphones: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  Notebooks: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  Periféricos: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  TVs: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  Áudio: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  Games: 'bg-red-500/20 text-red-300 border-red-500/30',
}

export default function ProductCard({ produto }) {
  const categoryStyle =
    CATEGORY_COLORS[produto.categoria] ||
    'bg-gray-500/20 text-gray-300 border-gray-500/30'

  return (
    <Link to={`/produto/${produto.id}`} className="group block">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300">
        <div className="relative bg-gray-800 h-48 flex items-center justify-center overflow-hidden">
          {produto.imagem ? (
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <span className="text-6xl">🖥️</span>
          )}
          <span
            className={`absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded-full border ${categoryStyle}`}
          >
            {produto.categoria}
          </span>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-100 group-hover:text-violet-300 transition-colors line-clamp-1">
            {produto.nome}
          </h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
            {produto.descricao}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-bold text-cyan-400">
              R${' '}
              {Number(produto.preco).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
              })}
            </span>
            <span className="text-xs text-violet-400 group-hover:underline">
              Ver detalhes →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
