# ⚡ TechStore — Catálogo de Eletrônicos

Aplicativo web de catálogo de produtos feito com React + TailwindCSS + MockAPI.

## 🚀 Como rodar

```bash
npm install
npm run dev
```

## ⚙️ Configurar o MockAPI

1. Acesse [mockapi.io](https://mockapi.io) e crie uma conta gratuita
2. Crie um novo projeto
3. Crie um recurso chamado `produtos` com os campos:
   - `nome` (string)
   - `preco` (number)
   - `descricao` (string)
   - `imagem` (string)
   - `categoria` (string)
4. Copie a URL base do seu projeto (ex: `https://abc123.mockapi.io/api/v1`)
5. Cole em `src/api/produtos.js` na variável `baseURL`

## 📁 Estrutura do projeto

```
src/
├── api/
│   └── produtos.js       # Funções de acesso à API (axios)
├── components/
│   ├── Navbar.jsx        # Barra de navegação com busca
│   ├── ProductCard.jsx   # Card individual de produto
│   ├── ProductList.jsx   # Grid de produtos com loading/erro
│   ├── ProductDetail.jsx # Detalhes do produto + editar/excluir
│   └── ProductForm.jsx   # Formulário de criação/edição
├── pages/
│   ├── Home.jsx          # Lista + filtro por categoria
│   ├── ProductPage.jsx   # Página de detalhe (/produto/:id)
│   └── NewProduct.jsx    # Criar ou editar (/novo, /editar/:id)
├── App.jsx               # Rotas
└── main.jsx              # Entry point
```

## ✅ Funcionalidades

- Listagem de produtos em grid responsivo
- Filtro por categoria
- Barra de busca por nome/descrição
- Ver detalhes de um produto
- Criar novo produto (com validação)
- Editar produto existente
- Excluir produto
- Skeleton loading enquanto carrega
- Feedback de erros

## 🛠 Tecnologias

- React 18
- React Router v6
- TailwindCSS 3
- Axios
- MockAPI.io
