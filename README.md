# ✨ Aura News - AI-Powered News Portal

Um portal de notícias moderno com autenticação de usuários, personalização de preferências, gerenciamento de favoritos e integração com NewsAPI.org em tempo real.

## 📊 Visão Geral

**Aura News** é uma aplicação full-stack que oferece:
- 🔐 Autenticação segura com bcrypt
- 📰 Feed de notícias em tempo real via NewsAPI
- ⭐ Sistema de favoritos personalizado
- ⚙️ Gerenciamento de preferências de categorias
- 🎨 Interface moderna com glassmorphism e design system premium

---

## 🏗️ Estrutura do Projeto

```
TIC - Python/
├── beckend/                 # Backend Flask
│   ├── main.py             # Servidor principal
│   ├── auth.py             # Autenticação
│   ├── news_api.py         # Integração com NewsAPI
│   ├── favorites.py        # Gerenciamento de favoritos
│   └── preferences.py      # Preferências do usuário
├── frontend/               # Frontend (HTML/CSS/JS)
│   ├── index.html          # Página principal
│   ├── login.html          # Login
│   ├── register.html       # Registro
│   ├── favorites.html      # Favoritos
│   ├── app.js              # Lógica JavaScript
│   └── style.css           # Estilos customizados
├── database/               # Banco de Dados
│   ├── schema.sql          # Schema do banco
│   └── db.sqlite           # Arquivo do banco (criado automaticamente)
└── utils/                  # Utilitários
    ├── ai.py               # Funções de sumarização
    └── helpers.py          # Funcoes auxiliares
```

---

## 🚀 Como Executar

### Pré-requisitos
- Python 3.8+
- pip (gerenciador de pacotes)

### Instalação rápida

1. **Instale as dependências:**
   ```bash
   pip install flask bcrypt requests
   ```

2. **Navegue para o backend:**
   ```bash
   cd beckend
   ```

3. **Inicie o servidor Flask:**
   ```bash
   python main.py
   ```

4. **Em outro terminal, sirva o frontend:**
   ```bash
   cd frontend
   python -m http.server 8000
   ```

5. **Acesse no navegador:**
   ```
   http://localhost:8000/index.html
   ```

---

## 📚 Endpoints da API

### Autenticação

**POST** `/register`
- Body: `{ "name": "string", "email": "string", "password": "string" }`
- Response: `{ "message": "User created successfully" }`

**POST** `/login`
- Body: `{ "email": "string", "password": "string" }`
- Response: `{ "message": "Login successful", "user_id": 1 }`

### Notícias

**GET** `/news?category=technology`
- Parâmetros: `category` (technology, business, health, science, entertainment, sport)
- Response: Array de artigos com `title`, `description`, `url`, `image`

### Favoritos

**POST** `/favorites`
- Body: `{ "user_id": 1, "title": "string", "url": "string", "image": "string" }`
- Response: `{ "message": "Added to favorites" }`

**GET** `/favorites/<user_id>`
- Response: Array de favoritos do usuário

**DELETE** `/favorites/<id>`
- Response: `{ "message": "Removed from favorites" }`

### Preferências

**POST** `/preferences`
- Body: `{ "user_id": 1, "categories": ["technology", "business"] }`
- Response: `{ "message": "Preferences saved successfully" }`

**GET** `/preferences/<user_id>`
- Response: Array de categorias preferenciais

---

## 🎨 Design System

### Cores
- **Primária (Cyan):** #00dbe7, #e1fdff
- **Secundária (Purple):** #7000ff, #d1bcff
- **Superfície:** #101415 (dark navy)
- **Texto:** #e0e3e5

### Tipografia
- **Headlines:** Space Grotesk (700, 600, 500)
- **Body:** Inter (400, 500, 600)

### Componentes
- Glassmorphism com backdrop-filter blur
- Cards com efeito hover elevado
- Botões com gradiente cyan-to-purple
- Loading shimmer animation
- Toast notifications (success/error)

---

## 💾 Banco de Dados

### Tabelas

**users**
```sql
- id INTEGER PRIMARY KEY
- name TEXT
- email TEXT UNIQUE
- password BLOB (bcrypt hash)
- created_at TIMESTAMP
```

**favorites**
```sql
- id INTEGER PRIMARY KEY
- user_id INTEGER (FK → users)
- title TEXT
- description TEXT
- url TEXT
- image TEXT
- created_at TIMESTAMP
```

**preferences**
```sql
- id INTEGER PRIMARY KEY
- user_id INTEGER (FK → users)
- category TEXT
- UNIQUE (user_id, category)
```

---

## 🔑 Funcionalidades Principais

### 1. Autenticação
- Registro com validação de email
- Login com hash bcrypt
- Armazenamento de user_id em localStorage

### 2. Feed de Notícias
- 6 categorias selecionáveis
- Busca em tempo real via NewsAPI
- Cards responsivos com imagens
- Links para leitura completa

### 3. Gerenciamento de Favoritos
- Adicionar notícias a favoritos
- Visualizar lista de favoritos
- Remover favoritos individuais
- Persistência no banco de dados

### 4. Preferências
- Seleção de categorias preferidas
- Carregamento automático ao login
- Sincronização com servidor

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Framework:** Flask
- **Autenticação:** bcrypt
- **Database:** SQLite3
- **API Client:** requests
- **CORS:** Manual fallback headers

### Frontend
- **HTML5** com semântica
- **Tailwind CSS** para styling
- **JavaScript Vanilla** para lógica
- **LocalStorage** para sessão

### Externo
- **NewsAPI.org** para notícias em tempo real

---

## ⚙️ Configuração Avançada

### Mudar porta do servidor
No `beckend/main.py`, linha final:
```python
app.run(debug=True, host="0.0.0.0", port=3000)
```

### Mudar URL da API no frontend
No `frontend/app.js`:
```javascript
const API_BASE = "http://seu-dominio:5000";
```

### Usar banco em produção
Substitua SQLite por PostgreSQL:
```python
import psycopg2
# Adaptar código para usar psycopg2
```

---

## 🐛 Troubleshooting

### "ModuleNotFoundError: No module named 'flask'"
```bash
pip install flask bcrypt requests
```

### "Database file not found"
- Verifique se rodou `main.py` uma vez
- Verifique permissões de pasta

### "CORS error no browser"
- Certifique-se que backend está rodando
- Verifique URL da API em `app.js`

### "NewsAPI não retorna artigos"
- Verifique conexão com internet
- Verifique se API_KEY é válida
- Consulte newsapi.org/docs

---

## 📝 Exemplo de Uso

1. **Acessar:** http://localhost:8000/index.html
2. **Registrar:** Clique em "Sign Up", preencha o formulário
3. **Login:** Use email e senha criados
4. **Explorar:** Clique em categorias para ver notícias
5. **Favoritar:** Clique em "⭐ Add to Favorites"
6. **Gerenciar:** Acesse "My Favorites" para gerenciar favoritos

---

## 📜 Licença

Projeto educacional para fins de estudo de Python e desenvolvimento web.

---

## 👤 Autor

Desenvolvido para o projeto TIC - Python

---

## 🔗 Links Úteis

- [NewsAPI Documentation](https://newsapi.org/docs)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [bcrypt Documentation](https://github.com/pyca/bcrypt)

---

**Última atualização:** 29 de Abril de 2026
**Versão:** 1.0.0
