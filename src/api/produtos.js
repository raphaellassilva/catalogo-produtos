import axios from 'axios'

const api = axios.create({
  baseURL: 'https://6a30eb32a7f8866418d6ad2b.mockapi.io/api/v1',
})

export const getProdutos = () => api.get('/produtos')
export const getProdutoById = (id) => api.get(`/produtos/${id}`)
export const createProduto = (data) => api.post('/produtos', data)
export const updateProduto = (id, data) => api.put(`/produtos/${id}`, data)
export const deleteProduto = (id) => api.delete(`/produtos/${id}`)