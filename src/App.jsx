import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import NewProduct from './pages/NewProduct'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produto/:id" element={<ProductPage />} />
            <Route path="/novo" element={<NewProduct />} />
            <Route path="/editar/:id" element={<NewProduct />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
