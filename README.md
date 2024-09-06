# EpicPlay

## Descrição do Projeto

**EpicPlay** é uma plataforma de e-commerce para a compra e gerenciamento de jogos digitais, desenvolvida como parte do curso de Tecnólogo em Análise de Sistemas do Claretiano Centro Universitário de Rio Claro. O projeto visa criar uma plataforma acessível e intuitiva que oferece uma experiência de compra agradável e eficiente.

### Objetivos do Negócio
- *Missão:* Oferecer uma plataforma acessível e intuitiva para a compra e gerenciamento de jogos digitais.
- *Visão:* Ser reconhecido como a principal alternativa à Steam no mercado de jogos digitais.
- *Objetivos:* Criar um sistema funcional com catálogo de jogos, pesquisa, carrinho de compras, processo de checkout simulado e área de administração para CRUD de jogos.

### Funcionalidades Principais
- *Catálogo de Jogos:* Visualize e pesquise jogos disponíveis na plataforma.
- *Carrinho de Compras:* Adicione jogos ao carrinho e simule a compra.
- *Processo de Checkout:* Gere um código de ativação fictício ao finalizar a compra.
- *Administração:* Área para cadastrar, editar e excluir jogos.

### Tecnologias Utilizadas
- *Frontend:* React.js para construção da interface de usuário.
- *Backend:* Node.js com Express para gerenciar a lógica de negócios e APIs.
- *Banco de Dados:* MySQL para armazenar informações de jogos e usuários.

### Estrutura do Projeto
O projeto é dividido em duas partes principais:
1. *Frontend:* Interface do usuário construída com React.js.
2. *Backend:* API e lógica de negócios gerenciadas com Node.js e Express, interagindo com um banco de dados MySQL.

### Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/epicplay1.3.git
   cd epicplay
   ```

2. **Instale as dependências do Backend:**
   ```bash
   cd backend
   npm install
   ```

3. **Configure o banco de dados MySQL:**
   - Crie um banco de dados com as credenciais necessárias no arquivo `.env`.

4. **Inicie o servidor Backend:**
   ```bash
   npm start
   ```

5. **Instale as dependências do Frontend (se aplicável) e inicie a aplicação:**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

### Contribuidores
- *Letícia Lunardi:* Líder do projeto
- *Jonathans Bortoluzzo:* Analista de mercado
- *Vinícius Moraes:* Analista de requisitos
- *Thiago Tomazella e Pablo R. Gonçalves:* Professores

### Licença

Este projeto é licenciado sob a [Licença MIT](LICENSE).