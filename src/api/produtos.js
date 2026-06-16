// Importa o axios para fazer requisições HTTP
import axios from 'axios'

// Cria uma instância do axios com a URL base do MockAPI
// Todos os endpoints usarão essa URL como prefixo
const api = axios.create({
  baseURL: 'https://6a30eb32a7f8866418d6ad2b.mockapi.io/api/v1',
})

// Busca todos os produtos da API
export const getProdutos = () => api.get('/produtos')

// Busca um produto específico pelo ID
export const getProdutoById = (id) => api.get(`/produtos/${id}`)

// Cria um novo produto enviando os dados via POST
export const createProduto = (data) => api.post('/produtos', data)

// Atualiza um produto existente pelo ID via PUT
export const updateProduto = (id, data) => api.put(`/produtos/${id}`, data)

// Remove um produto pelo ID
export const deleteProduto = (id) => api.delete(`/produtos/${id}`)