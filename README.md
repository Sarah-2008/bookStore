# 📘 Documentação Técnica

Este documento descreve conceitos fundamentais utilizados no desenvolvimento do projeto, incluindo middleware no Express, escolha de banco de dados, segurança com hashing e uso de variáveis de ambiente.

---

## 🚀 1. Middleware no Express e processamento de JSON

No Express, **middleware** é uma função que intercepta e processa requisições HTTP antes que elas cheguem à rota final.

Essas funções têm acesso a:

* `req` (requisição)
* `res` (resposta)
* `next` (função para passar o controle)

### 📱 Importância para aplicações mobile

Aplicativos mobile geralmente enviam dados no formato **JSON** no corpo da requisição. O Node.js, por padrão, não interpreta automaticamente esse formato.

Por isso, utilizamos o middleware:

```js
app.use(express.json());
```

### 🔍 O que ele faz:

* Interpreta o JSON enviado no corpo da requisição
* Converte em objeto JavaScript
* Disponibiliza os dados em `req.body`

### ❗ Sem esse middleware:

* `req.body` será `undefined`
* Não será possível acessar dados enviados pelo cliente

---

## 🗄️ 2. NoSQL vs SQL para catálogo de livros

### 📄 Banco NoSQL (orientado a documentos)

* Estrutura flexível (schema dinâmico)
* Dados armazenados em formato semelhante a JSON
* Permite documentos com diferentes estruturas

**Exemplo:**

```json
{ "titulo": "Livro A", "autor": "Autor X" }
{ "titulo": "Livro B", "autor": "Autor Y", "editora": "ABC" }
```

### ✔ Vantagens:

* Flexibilidade para mudanças frequentes
* Menor necessidade de migração de estrutura
* Ideal para prototipação e evolução rápida

---

### 🧱 Banco SQL (relacional)

* Estrutura rígida com tabelas e colunas definidas
* Necessita de schema fixo

**Exemplo:**

```sql
id | titulo | autor | editora
```

### ✔ Vantagens:

* Maior integridade e consistência dos dados
* Suporte robusto a relacionamentos
* Melhor para consultas complexas

---

### ⚖️ Comparação no cenário do projeto

Para um **catálogo de livros com estrutura variável**:

| Critério           | NoSQL    | SQL             |
| ------------------ | -------- | --------------- |
| Flexibilidade      | Alta     | Baixa           |
| Estrutura          | Dinâmica | Fixa            |
| Evolução do schema | Simples  | Requer migração |
| Consistência       | Menor    | Maior           |

---

## 🔐 3. Hashing com bcryptjs

O hashing é uma técnica de segurança usada para proteger senhas armazenadas no banco de dados.

### 🔑 Como funciona:

* A senha original é transformada em um hash (código irreversível)
* Exemplo:

```
Senha: 123456
Hash: $2a$10$EixZaYVK1fsbw1ZfbX3OXe...
```

### 🔒 Características importantes:

* **Irreversível**: não é possível obter a senha original
* **Salt automático**: cada hash é único
* **Processamento lento**: dificulta ataques de força bruta

### 🛡️ Proteção em caso de vazamento:

Se o banco de dados for comprometido:

* Senhas não são expostas diretamente
* Atacantes precisarão tentar quebrar cada hash individualmente
* O custo computacional torna ataques muito mais difíceis

---

## 🌱 4. Uso de .env e dotenv

O arquivo `.env` é utilizado para armazenar variáveis sensíveis e configurações do sistema.

O pacote `dotenv` permite carregar essas variáveis no ambiente da aplicação.

### 📄 Exemplo de `.env`:

```
DB_PASSWORD=senha_super_secreta
JWT_SECRET=chave_ultra_secreta
API_KEY=abc123
```

---

### 🔐 Importância de segurança

Evita expor informações sensíveis diretamente no código:

❌ Errado:

```js
const password = "123456";
```

✔ Correto:

```js
const password = process.env.DB_PASSWORD;
```

---

### 📦 Boas práticas com GitHub

* Adicionar `.env` no `.gitignore`
* Nunca versionar credenciais
* Compartilhar apenas um `.env.example`

---

### 🚀 Uso em diferentes ambientes

Permite configurações distintas para cada ambiente:

**Desenvolvimento:**

```
DB_PASSWORD=123
```

**Produção:**

```
DB_PASSWORD=senha_forte_real
```

---
