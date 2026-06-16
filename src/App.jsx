// Importa o roteador e os componentes de rota do React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Importa os componentes de layout e páginas
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import NewProduct from './pages/NewProduct'

// Componente principal que define as rotas da aplicação
export default function App() {
  return (
    // BrowserRouter habilita a navegação por URL no app
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950">
        {/* Barra de navegação exibida em todas as páginas */}
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            {/* Rota principal: lista de produtos */}
            <Route path="/" element={<Home />} />

            {/* Rota de detalhe: exibe um produto pelo ID */}
            <Route path="/produto/:id" element={<ProductPage />} />

            {/* Rota de criação: formulário para novo produto */}
            <Route path="/novo" element={<NewProduct />} />

            {/* Rota de edição: reutiliza o mesmo formulário */}
            <Route path="/editar/:id" element={<NewProduct />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}