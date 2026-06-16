import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProduto, updateProduto } from '../api/produtos'

const CATEGORIAS = [
  'Smartphones',
  'Notebooks',
  'Periféricos',
  'TVs',
  'Áudio',
  'Games',
  'Outros',
]

const INITIAL_STATE = {
  nome: '',
  preco: '',
  descricao: '',
  imagem: '',
  categoria: '',
}

export default function ProductForm({ produtoInicial }) {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_STATE)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (produtoInicial) setForm(produtoInicial)
  }, [produtoInicial])

  const validate = () => {
    const errs = {}
    if (!form.nome.trim()) errs.nome = 'Nome é obrigatório'
    if (!form.preco || isNaN(form.preco) || Number(form.preco) <= 0)
      errs.preco = 'Preço deve ser um número positivo'
    if (!form.descricao.trim()) errs.descricao = 'Descrição é obrigatória'
    if (!form.categoria) errs.categoria = 'Selecione uma categoria'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setLoading(true)
    try {
      if (produtoInicial?.id) {
        await updateProduto(produtoInicial.id, form)
      } else {
        await createProduto(form)
      }
      navigate('/')
    } catch {
      alert('Erro ao salvar produto. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

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
      {errors[name] && (
        <p className="text-red-400 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field
        label="Nome do produto"
        name="nome"
        placeholder="Ex: iPhone 15 Pro Max"
      />

      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Preço (R$)"
          name="preco"
          type="number"
          placeholder="0.00"
        />
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
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.categoria && (
            <p className="text-red-400 text-xs mt-1">{errors.categoria}</p>
          )}
        </div>
      </div>

      <Field
        label="Descrição"
        name="descricao"
        as="textarea"
        placeholder="Descreva o produto..."
      />

      <Field
        label="URL da imagem (opcional)"
        name="imagem"
        placeholder="https://..."
      />

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
          {loading
            ? 'Salvando...'
            : produtoInicial?.id
              ? 'Salvar alterações'
              : 'Adicionar produto'}
        </button>
      </div>
    </form>
  )
}
