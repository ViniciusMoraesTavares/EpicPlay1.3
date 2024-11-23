# EpicPlay

## Descrição do Projeto

EpicPlay é uma plataforma de e-commerce para a compra e gerenciamento de jogos digitais, desenvolvida como parte do curso de Tecnólogo em Análise de Sistemas do Claretiano Centro Universitário de Rio Claro. O projeto visa criar uma plataforma acessível e intuitiva que oferece uma experiência de compra agradável e eficiente.

## Objetivos do Negócio

- **Missão**: Oferecer uma plataforma acessível e intuitiva para a compra e gerenciamento de jogos digitais.
- **Visão**: Ser reconhecido como a principal alternativa à Steam no mercado de jogos digitais.
- **Objetivos**: Criar um sistema funcional com catálogo de jogos, pesquisa, carrinho de compras, processo de checkout simulado e área de administração para CRUD de jogos.

## Funcionalidades Principais

- **Catálogo de Jogos**: Visualize e pesquise jogos disponíveis na plataforma.
- **Simulação de Compras**: Escolha os jogos e simule a compra.
- **Processo de Checkout**: Gere um código de ativação fictício ao finalizar a compra.
- **Administração**: Área para cadastrar, editar e excluir jogos.

## Tecnologias Utilizadas

- **Frontend**: React.js para construção da interface de usuário.
- **Backend**: Node.js com Express para gerenciar a lógica de negócios e APIs.
- **Banco de Dados**: MySQL para armazenar informações de jogos e usuários.

## Estrutura do Projeto

O projeto é dividido em duas partes principais:

- **Frontend**: Interface do usuário construída com React.js.
- **Backend**: API e lógica de negócios gerenciadas com Node.js e Express, interagindo com um banco de dados MySQL.

## Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter os seguintes programas instalados na sua máquina:

- **Node.js** (versão LTS recomendada)
- **MySQL** (com usuário e senha configurados)
- **NPM** ou **Yarn**

### Configuração do Banco de Dados

1. Crie um banco de dados MySQL com o nome `epicplay`.
2. Configure as variáveis de ambiente no arquivo `.env` do backend, seguindo o exemplo abaixo:

   ```env
   PORT=3001
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=epicplay
   JWT_SECRET=seuSegredoJWT
   ```

3. Rode as migrações ou scripts para criar as tabelas necessárias.

### Executando o Backend

1. Acesse a pasta do backend:

   ```bash
   cd backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor:

   ```bash
   npm start
   ```

   O backend estará disponível em `http://localhost:3001`.

### Executando o Frontend

1. Acesse a pasta do frontend:

   ```bash
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie a aplicação:

   ```bash
   npm start
   ```

   O frontend estará acessível em `http://localhost:3000`.

## Como Acessar

- **Backend**: A API estará disponível em `http://localhost:3001`.
- **Frontend**: A interface do usuário estará disponível em `http://localhost:3000`.

## Contribuidores

- **Letícia Lunardi**: Líder do projeto
- **Jonathan Bortoluzzo**: Analista de mercado
- **Vinícius Moraes**: Analista de requisitos
- **Thiago Tomazella e Pablo R. Gonçalves**: Professores

## Licença

Este projeto é licenciado sob a [Licença MIT](LICENSE).
