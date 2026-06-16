// Importa Link para navegação sem recarregar a página
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

// Componente de barra de navegação com busca e link para novo produto
export default function Navbar() {
  // Estado para armazenar o texto digitado na busca
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  // Ao submeter a busca, redireciona para a home com o parâmetro de busca na URL
  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/?busca=${search}`)
  }

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo com link para a página inicial */}
        <Link
          to="/"
          className="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent shrink-0"
        >
          ⚡ TechStore
        </Link>

        {/* Campo de busca por nome ou descrição */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar produtos..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </form>

        {/* Botão para acessar o formulário de novo produto */}
        <Link
          to="/novo"
          className="shrink-0 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + Novo Produto
        </Link>
      </div>
    </nav>
  )
}