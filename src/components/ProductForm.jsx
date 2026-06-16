import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProduto, updateProduto } from '../api/produtos'

// Lista de categorias disponíveis para seleção
const CATEGORIAS = [
  'Smartphones',
  'Notebooks',
  'Periféricos',
  'TVs',
  'Áudio',
  'Games',
  'Outros',
]

// Estado inicial vazio do formulário
const INITIAL_STATE = {
  nome: '',
  preco: '',
  descricao: '',
  imagem: '',
  categoria: '',
}

// Componente de formulário reutilizável para criar e editar produtos
// Recebe produtoInicial como prop quando está em modo de edição
export default function ProductForm({ produtoInicial }) {
  const navigate = useNavigate()

  // Estado do formulário com os valores dos campos
  const [form, setForm] = useState(INITIAL_STATE)

  // Estado de loading durante o envio do formulário
  const [loading, setLoading] = useState(false)

  // Estado para armazenar mensagens de erro de validação
  const [errors, setErrors] = useState({})

  // Preenche o formulário com os dados do produto ao editar
  useEffect(() => {
    if (produtoInicial) setForm(produtoInicial)
  }, [produtoInicial])

  // Função de validação dos campos obrigatórios
  const validate = () => {
    const errs = {}
    if (!form.nome.trim()) errs.nome = 'Nome é obrigatório'
    if (!form.preco || isNaN(form.preco) || Number(form.preco) <= 0)
      errs.preco = 'Preço deve ser um número positivo'
    if (!form.descricao.trim()) errs.descricao = 'Descrição é obrigatória'
    if (!form.categoria) errs.categoria = 'Selecione uma categoria'
    return errs
  }

  // Atualiza o estado do formulário e limpa o erro do campo alterado
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }))
  }

  // Submete o formulário: cria ou atualiza o produto conforme o modo
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Valida os campos antes de enviar
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setLoading(true)
    try {
      if (produtoInicial?.id) {
        // Modo edição: atualiza o produto existente
        await updateProduto(produtoInicial.id, form)
      } else {
        // Modo criação: envia novo produto para a API
        await createProduto(form)
      }
      // Redireciona para a home após salvar
      navigate('/')
    } catch {
      alert('Erro ao salvar produto. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  // Componente auxiliar interno para renderizar campos do formulário
  const Field = ({ label, name, type = 'text', placeholder, as }) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          rows={3}
          className={`w-full bg-gray-800 border rounded-xl px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors resize-none ${
            errors[name] ? 'border-red-500' : 'border-gray-700'
          }`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full bg-gray-800 border rounded-xl px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors ${
            errors[name] ? 'border-red-500' : 'border-gray-700'
          }`}
        />
      )}
      {/* Exibe mensagem de erro abaixo do campo inválido */}
      {errors[name] && (
        <p className="text-red-400 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Nome do produto" name="nome" placeholder="Ex: iPhone 15 Pro Max" />

      <div className="grid grid-cols-2 gap-4">
        <Field label="Preço (R$)" name="preco" type="number" placeholder="0.00" />

        {/* Select de categoria com opções predefinidas */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Categoria
          </label>
          <select
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            className={`w-full bg-gray-800 border rounded-xl px-4 py-3 text-gray-100 focus:outline-none focus:border-violet-500 transition-colors ${
              errors.categoria ? 'border-red-500' : 'border-gray-700'
            }`}
          >
            <option value="">Selecione...</option>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.categoria && (
            <p className="text-red-400 text-xs mt-1">{errors.categoria}</p>
          )}
        </div>
      </div>

      <Field label="Descrição" name="descricao" as="textarea" placeholder="Descreva o produto..." />
      <Field label="URL da imagem (opcional)" name="imagem" placeholder="https://..." />

      {/* Preview da imagem em tempo real */}
      {form.imagem && (
        <div className="rounded-xl overflow-hidden h-40 bg-gray-800">
          <img
            src={form.imagem}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={(e) => (e.target.style.display = 'none')}
          />
        </div>
      )}

      {/* Botões de cancelar e salvar */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex-1 border border-gray-700 text-gray-400 hover:text-gray-200 hover:border-gray-600 font-medium py-3 rounded-xl transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition-colors"
        >
          {loading ? 'Salvando...' : produtoInicial?.id ? 'Salvar alterações' : 'Adicionar produto'}
        </button>
      </div>
    </form>
  )
}