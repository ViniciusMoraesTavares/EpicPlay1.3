# EpicPlay

## Descrição do Projeto

EpicPlay é uma plataforma de e-commerce para a compra e gerenciamento de jogos digitais, desenvolvida como parte do curso de Tecnólogo em Análise de Sistemas do Claretiano Centro Universitário de Rio Claro. O projeto visa criar uma plataforma acessível e intuitiva que oferece uma experiência de compra agradável e eficiente.

## Objetivos do Negócio

- **Missão**: Oferecer uma plataforma acessível e intuitiva para a compra e gerenciamento de jogos digitais.
- **Visão**: Ser reconhecido como a principal alternativa à Steam no mercado de jogos digitais.
- **Objetivos**: Criar um sistema funcional com catálogo de jogos, pesquisa, carrinho de compras, processo de checkout simulado e área de administração para CRUD de jogos.

## Funcionalidades Principais

- **Catálogo de Jogos**: Visualize e pesquise jogos disponíveis na plataforma.
- **Carrinho de Compras**: Adicione jogos ao carrinho e simule a compra.
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

1. **Docker**: Certifique-se de ter o Docker instalado na sua máquina.

### Executando com Docker

Este projeto pode ser executado facilmente utilizando Docker, sem a necessidade de instalação manual de dependências e configuração do ambiente.

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/epicplay1.3.git
   cd epicplay
   ```

2. **Suba os contêineres com Docker Compose**:

   Dentro da pasta do projeto, você pode usar o Docker Compose para iniciar tanto o backend quanto o banco de dados:

   ```bash
   docker-compose up -d
   ```

   Isso irá criar e iniciar os seguintes contêineres:

   - **backend**: O servidor Node.js que gerencia a lógica de negócios e APIs.
   - **mysql**: O banco de dados MySQL com o nome `epicplay`.

   O **backend** estará acessível na porta `3001`, e o banco de dados MySQL estará rodando na porta `3306`.

3. **Configuração do Banco de Dados**:

   Se for a primeira vez que está executando, o banco de dados será inicializado automaticamente com as tabelas e dados necessários. Caso contrário, certifique-se de que o banco de dados está corretamente configurado no Docker e no arquivo `.env` do backend.

4. **Verificar Logs**:

   Você pode verificar os logs do backend para garantir que tudo está funcionando corretamente com o seguinte comando:

   ```bash
   docker logs -f epicplay_backend
   ```

5. **Frontend**: Se você também deseja rodar o frontend localmente, siga estas etapas:

   - Acesse a pasta do frontend:

     ```bash
     cd frontend
     ```

   - Instale as dependências do frontend:

     ```bash
     npm install
     ```

   - Inicie a aplicação:

     ```bash
     npm start
     ```

   O frontend estará acessível na porta `3000` do seu navegador.

### Como Acessar

- **Backend**: A API estará disponível em `http://localhost:3001`.
- **Frontend**: A interface do usuário estará disponível em `http://localhost:3000`.

## Contribuidores

- **Letícia Lunardi**: Líder do projeto
- **Jonathans Bortoluzzo**: Analista de mercado
- **Vinícius Moraes**: Analista de requisitos
- **Thiago Tomazella e Pablo R. Gonçalves**: Professores

## Licença

Este projeto é licenciado sob a [Licença MIT](LICENSE).