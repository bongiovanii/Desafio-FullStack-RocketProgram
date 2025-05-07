# Desafio Fullstack RocketProgram

## Objetivo

Este projeto consiste em uma aplicação fullstack de e-commerce simplificada, focada na funcionalidade de carrinho de compras e autenticação de usuários. Os usuários podem se registrar, fazer login, visualizar produtos e gerenciar seu carrinho de compras (adicionar, visualizar, atualizar e remover itens).

## Tecnologias Utilizadas

**Frontend:**

* AngularJS, HTML5, CSS3, JavaScript, Bootstrap 5

**Backend:**

* Node.js
* Express.js
* Prisma (ORM para o banco de dados)
* SQLite (Banco de dados utilizado)
* jsonwebtoken (Para geração de tokens JWT)
* bcrypt (para criptografia de senhas e dados sensíveis)

## Configuração e Execução Local

Siga estas etapas para configurar e rodar o projeto localmente:

**Backend:**

1.  **Clone o repositório:**
    ```bash
    git clone SEU_REPOSITORIO_AQUI
    cd desafio-fullstack-rocketprogram/backend
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Execute as migrations do Prisma para criar o banco de dados:**
    ```bash
    npx prisma migrate dev
    ```
    ## Configuração do Ambiente

    Para que o backend funcione corretamente, é necessário criar um arquivo `.env` na raiz do projeto backend com as seguintes variáveis de ambiente:

    DATABASE_URL="file:./dev.db"
    ACCESS_KEY="minhaSuperChave123"
    
    * **`DATABASE_URL`**: Define a URL de conexão com o banco de dados SQLite. No exemplo, o banco de dados `dev.db` será criado na raiz do projeto backend. Você pode ajustar este valor se estiver usando um banco de dados diferente ou uma localização diferente.
    * **`ACCESS_KEY`**: É a chave secreta utilizada para assinar e verificar os tokens JWT. **É extremamente importante manter esta chave segura e não a compartilhar publicamente.** O valor `"minhaSuperChave123!@#"` é apenas um exemplo; você deve usar uma chave mais complexa e segura na sua aplicação real.

    **Observação:** Certifique-se de que o arquivo `.env` esteja incluído no seu `.gitignore` para evitar que informações sensíveis sejam versionadas no seu repositório Git.
4.  **Inicie o servidor backend:**
    ```bash
    npm run dev
    ```
    O servidor backend estará rodando em `http://localhost:3000`.
    caso queira trocar a porta que o servidor irá rodar, troque o valor da variável PORT no arquivo server.js
    **Observação** Todas as requisições do Postman estão na porta 3000 logo você terá que altera-lás para a nova porta
    que você definiu

**Frontend:**

1.  **Navegue até a pasta do frontend (public):**
    ```bash
    cd ../public
    ```
2.  Abra o arquivo index.html ou se o servidor node já estiver rodando, no seu navegador digite o seguinte link:
http://localhost:3000/index.html

3. Caso tenha alterado a porta no arquivo server.js passe ela apos o localhost

## Endpoints da API

Aqui estão os principais endpoints da API backend:

**Autenticação (`/auth`)**

* `POST /auth/register`: Registra um novo usuário. Espera um corpo JSON com `username` e `password`.
* `POST /auth/login`: Autentica um usuário existente. Espera um corpo JSON com `username` e `password` e retorna um token JWT em caso de sucesso.

**Produtos (`/products`)**

* `GET /products/`: Lista todos os produtos
* `GET /products/:id`: Retorna um produto específico pelo ID
* `POST /products/`: Adiciona um novo produto (requer autenticação - a implementação de roles não foi detalhada aqui). Espera um corpo JSON com `name`, `price` e `description`.
* `PUT /products/:id`: Atualiza um produto existente pelo ID (requer autenticação). Espera um corpo JSON com os campos a serem atualizados.
* `DELETE /products/:id`: Deleta um produto existente pelo ID (requer autenticação).

**Carrinho (`/cart`)**

* `GET /cart/`: Retorna os itens no carrinho do usuário autenticado (requer autenticação).
* `POST /cart/`: Adiciona um novo item ao carrinho do usuário autenticado (requer autenticação). Espera um corpo JSON com `productId` e `quantity`.
* `PUT /cart/:itemId`: Atualiza a quantidade de um item específico no carrinho do usuário autenticado (requer autenticação). Espera um corpo JSON com `quantity`. O `:itemId` é o ID do item do carrinho (da tabela `CartItem`).
* `DELETE /cart/:itemId`: Remove um item específico do carrinho do usuário autenticado (requer autenticação). O `:itemId` é o ID do item do carrinho (da tabela `CartItem`).

## Autenticação

As rotas protegidas (listagem de produtos, gerenciamento do carrinho) requerem autenticação via token JWT.

**Fluxo de Autenticação:**

1.  O usuário envia suas credenciais (`username` e `password`) para o endpoint `/auth/login`.
2.  Se as credenciais forem válidas, o backend retorna um token JWT no corpo da resposta (na propriedade `token`).
3.  Para acessar as rotas protegidas, o cliente (geralmente o frontend) deve enviar esse token no header `Authorization` da requisição, utilizando o esquema **Bearer**. Exemplo:
    ```
    Authorization: Bearer SEU_TOKEN_JWT
    ```

## Testes com Postman

Uma collection do Postman com as requisições configuradas para este projeto está incluída (arquivo `Desafio Fullstack.postman_collection.json`). Para utilizar a autenticação automaticamente:

1.  **Importe a collection** para o Postman.
2.  **Crie um ambiente** no Postman (ex: "Local").
3.  **Selecione o ambiente** que você criou.
4.  **Execute a requisição `POST /auth/login`** com um usuário válido.
5.  A aba **"Scripts" -> "Post Response"** desta requisição está configurada para extrair o token JWT da resposta e salvá-lo em uma variável de ambiente chamada `jwt_token`.
6.  As outras requisições protegidas (nas pastas "Products" e "Cart") já estão configuradas para usar essa variável no header `Authorization` com a sintaxe `Bearer {{jwt_token}}`.

## Funcionalidades Destacadas

* **Autenticação de Usuários:** Registro e login de usuários com geração de token JWT para acesso seguro às funcionalidades.
* **Gestão de Carrinho:** Os usuários podem adicionar, visualizar e remover itens do seu carrinho de compras.
* **Listagem de Produtos:** Os usuários autenticados podem visualizar a lista de produtos disponíveis.

## Próximos Passos (Opcional)

* Implementação de um sistema de roles para diferenciar usuários comuns de administradores.
* Adição de mais funcionalidades ao carrinho (finalização da compra, etc...).
* Implementação de testes unitários e de integração.
* Melhorias na interface do usuário.

## Autores

João Paulo dos Santos Moscardi
Gustavo Santos Bongiovani de Oliveira

---

