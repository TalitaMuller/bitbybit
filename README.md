# BitByBit 🤖✨

## 📖 Sobre o Projeto

O **BitByBit** é uma plataforma Web criada como Projeto Integrador para o curso Técnico em Desenvolvimento de Sistemas. A aplicação busca resolver um problema comum para entusiastas de tecnologia: a dificuldade de encontrar os melhores preços e informações confiáveis ao montar ou atualizar um computador.

Nossa solução centraliza os preços das principais lojas de e-commerce do Brasil e oferece ferramentas interativas, como um montador de PC e um comparador de produtos. O grande diferencial é o **Byb**, nosso assistente de IA (potencializado pelo Google Gemini), treinado para ser um especialista em hardware e dar recomendações personalizadas aos usuários.

## ✨ Funcionalidades Principais

- **🔍 Buscador Inteligente:** Pesquise produtos e filtre os resultados por loja, faixa de preço e mais.
- **🛠️ Montador de PC Interativo:** Crie uma build de computador completa, peça por peça, e veja o custo total em tempo real.
- **⚖️ Comparador Lado a Lado:** Selecione múltiplos produtos e compare suas especificações em uma tabela clara e objetiva.
- **🤖 Assistente IA (Byb):** Converse com nosso chatbot especialista para tirar dúvidas, pedir recomendações e obter ajuda personalizada.
- **🖥️ Multiplataforma:** Acessível via web, com versões para desktop (Electron) e mobile.


## 🚀 Tecnologias Utilizadas

O projeto é um monorepo dividido em duas partes principais:

| Frontend | Backend |
| :--- | :--- |
| [**React**](https://react.dev/) com [**TypeScript**](https://www.typescriptlang.org/) | [**Node.js**](https://nodejs.org/) com [**Express.js**](https://expressjs.com/) |
| [**Vite**](https://vitejs.dev/) (Ferramenta de Build) | [**MySQL**](https://www.mysql.com/) (Banco de Dados Relacional) |
| [**Tailwind CSS**](https://tailwindcss.com/) (Estilização) | [**Google Gemini API**](https://ai.google.dev/) (Inteligência Artificial) |
| [**React Router**](https://reactrouter.com/) (Navegação SPA) | [**JWT**](https://jwt.io/) & [**Bcrypt**](https://www.npmjs.com/package/bcrypt) (Autenticação e Segurança) |


## ⚙️ Como Executar o Projeto

Siga os passos abaixo para rodar o projeto em seu ambiente local.

### Pré-requisitos
- [Node.js](https://nodejs.org/en) (versão 18 ou superior)
- Um gerenciador de pacotes como `npm` ou `yarn`

### Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/TalitaMuller/bitbybit
    cd bitbybit
    ```

2.  **Configure o Backend:**
    - Navegue até a pasta do backend:
        ```bash
        cd backend
        ```
    - Instale as dependências:
        ```bash
        npm install
        ```
    - Crie um arquivo `.env` na raiz da pasta `backend` e adicione sua chave da API do Gemini:
        ```
        GEMINI_API_KEY="SUA_CHAVE_DE_API_AQUI"
        ```

3.  **Configure o Frontend:**
    - Em um **novo terminal**, navegue até a pasta do frontend:
        ```bash
        cd frontend
        ```
    - Instale as dependências:
        ```bash
        npm install
        ```

4.  **Rode a Aplicação:**
    - **No terminal do backend**, inicie o servidor:
        ```bash
        node server.js
        ```
        *O servidor estará rodando em `http://localhost:3001`.*
    - **No terminal do frontend**, inicie a aplicação React:
        ```bash
        npm run dev
        ```
        *A aplicação estará acessível em `http://localhost:5173` (ou outra porta indicada).*


## 👥 Equipe

| Nome    | Função                               | GitHub                                     |
| ------- | ------------------------------------ | ------------------------------------------ |
| Kauê    | Designer                             | (https://github.com/KaueGarciaNunes)       |
| Otávio  | Desenvolvedor Front-end              | (https://github.com/OtavioPeglow)          |
| Talita  | Desenvolvedora Back-end              | (https://github.com/TalitaMuller)          |


