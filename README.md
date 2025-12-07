# Eng-de-Software-UFRN
## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias e Arquitetura](#tecnologias-e-arquitetura)
- [Como clonar ou baixar](#como-clonar-ou-baixar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Documentação Técnica](#documentação-técnica)
- [Licença](#licença)

## Sobre o Projeto

### Título
Condominium

### Descrição
Software para gerenciamento de condomínios desenvolvido na disciplina de Engenharia de Software da UFRN. O sistema visa facilitar a comunicação entre portaria, administração e moradores, focando em controle de acesso, correspondências e reservas.

Este projeto está sendo desenvolvido utilizando conceitos de **Metodologias Ágeis**, **Arquitetura MVCS** e **Princípios SOLID**, com foco em entregas iterativas.

### Componentes da Equipe
- [Celine Helena Abrantes de Andrade](https://github.com/celinehelena)
- [Daniel Bruno Trindade da Silva](https://github.com/daniel-trindade)
- [Felipe Rocha Silva](https://github.com/felipe0x)

## Tecnologias e Arquitetura

O projeto está dividido em duas partes principais (Backend e Frontend), desenvolvidas de forma desacoplada, utilizando uma arquitetura MVCS.

### Backend
- **Framework:** NestJS (Node.js)
- **Banco de Dados:** MySQL (via Prisma ORM)
- **Testes:** Jest

### Frontend
- **Framework:** React + Vite
- **Estilização:** CSS / CSS Modules
- **Gerenciamento de Estado:** React Context API

## Como clonar ou baixar

Você pode obter este repositório de três formas. Para rodar o projeto completo, lembre-se que precisará tanto do Backend quanto do Frontend.

### Clonar via HTTPS

```bash
git clone https://github.com/daniel-trindade/Condominium.git
````

### Clonar via SSH

Se você já configurou sua chave SSH no GitHub, pode clonar usando:

```bash
git clone git@github.com:daniel-trindade/Condominium.git
```

### Baixar como ZIP

1.  Acesse a página do repositório no GitHub: [https://github.com/daniel-trindade/Condominium](https://github.com/daniel-trindade/Condominium)
2.  Clique no botão **Code** (verde).
3.  Selecione **Download ZIP**.
4.  Extraia o arquivo ZIP para o local desejado em seu computador.

## Estrutura do Projeto

A organização do código reflete a separação de responsabilidades (Backend API vs Frontend Client).

### 1. Backend (Branch `dev`)

O código da API está centralizado na pasta `backend/`. A arquitetura modular do NestJS organiza cada regra de negócio em seu próprio diretório contendo Controller, Service e DTOs.

```bash
backend/
├── prisma/                 # Schema do banco (Prisma) e Migrations
├── src/
│   ├── acesso/             # Módulo de Controle de Acesso (Visitantes/Entregadores)
│   ├── app.* # Controller principal (Health check)
│   ├── auth/               # Autenticação (JWT Strategy, Login)
│   ├── common/             # Utilitários globais (Prisma Service)
│   ├── condominos/         # CRUD de Condôminos
│   ├── correspondencia/    # Gestão de entrada/saída de encomendas
│   ├── porteiros/          # Gestão de funcionários
│   ├── reservas/           # Lógica de reserva de áreas comuns
│   ├── usuarios/           # Gestão de usuários do sistema
│   ├── veiculos/           # Cadastro de veículos
│   └── main.ts             # Ponto de entrada da aplicação
├── test/                   # Testes de integração (e2e)
├── package.json            # Dependências do Backend
└── docs/                   # Documentação técnica
```

### 2. Frontend (Branch `frontend`)

A interface web foi construída com React e Vite, organizada por componentes visuais e páginas.

```bash
frontend/
├── public/                 # Arquivos estáticos
├── src/
│   ├── assets/             # Imagens e ícones do sistema
│   ├── components/         # Componentes reutilizáveis
│   │   ├── action_button/  # Exemplo de componente com estilo isolado
│   │   │   ├── ActionButton.jsx
│   │   │   └── ActionButton.module.css
│   │   ├── container/
│   │   ├── footer/
│   │   ├── login_navbar/
│   │   └── menuCard/
│   ├── contexts/           # Gerenciamento de estado (AuthContext)
│   ├── pages/              # Páginas da aplicação
│   │   ├── condominos/     # Tela de Condôminos
│   │   ├── home/           # Tela Inicial
│   │   ├── login/          # Tela de Login
│   │   └── veiculos/       # Tela de Veículos
│   ├── App.jsx             # Componente Raiz e Rotas
│   └── main.jsx            # Ponto de entrada do React
└── vite.config.js          # Configuração do Build
```

## Como Rodar o Projeto

Para executar o sistema completo, você precisará de dois terminais: um para o Backend e outro para o Frontend.

### Pré-requisitos

  * Node.js
  * NPM ou Yarn
  * Git

### 1. Executando o Backend (API)

```bash
# 1. Acesse a pasta e mude para a branch de desenvolvimento
cd Condominium
git checkout dev

# 2. Instale as dependências
npm install

# 3. Configure o banco de dados (Prisma)
npx prisma generate

# 4. Rode o servidor em modo de desenvolvimento
npm run start:dev
# O servidor iniciará em http://localhost:3000
```

### 2\. Executando o Frontend (Interface)

Em um **novo terminal**:

```bash
# 1. Mude para a branch do frontend
git checkout frontend

# 2. Instale as dependências
npm install

# 3. Rode o projeto
npm run dev
# O frontend estará acessível (geralmente em http://localhost:5173)
```

### 3\. Rodando os Testes

O backend possui cobertura de testes unitários. Para executar:

```bash
# Certifique-se de estar na branch 'dev'
npm test
# Para ver a cobertura:
npm run test:cov
```

## Resumo da Implementação

Uma breve explicação sobre a implementação  a no código.

### No Backend (NestJS)
O fluxo de dados foi desenhado seguindo o padrão **Controller -> Service -> Repository**:
1.  **Módulos:** O sistema é dividido em módulos isolados (ex: `acesso`, `condominos`) em `src/`, facilitando a manutenção.
2.  **Segurança (Auth):** A estrutura de autenticação inclui o `AuthModule` e o `jwt-auth.guard.ts`, implementados com o objetivo de validar tokens JWT e proteger rotas privadas.
3.  **Banco de Dados:** O `PrismaService` atua como camada de abstração de dados, centralizando a comunicação com o banco através do Prisma Client.

### No Frontend (React)
A interface segue o modelo de componentização e estados globais:
1.  **Estilização:** Adotamos **CSS Modules** para garantir o escopo local de estilos e evitar conflitos visuais.
2.  **Estado Global:** A estrutura do `contexts/AuthContext.jsx` foi criada para centralizar a lógica de sessão e autenticação do usuário na aplicação.
3.  **Roteamento:** O gerenciamento de navegação é feito no `App.jsx`, que orquestra a renderização das páginas contidas em `pages/`.

## Documentação Técnica

Para detalhes aprofundados sobre a modelagem e decisões de projeto, consulte os documentos na pasta `docs`:

  * [Histórias de Usuário](./docs/user-stories.md)
  * [Diagramas UML (Classes e Atividades)](./docs/diagrams.md)
  * [Padrões de Projeto (Design Patterns)](./docs/patterns.md)
  * [Princípios de Projeto (SOLID)](./docs/principles.md)
  * [Relatório de Testes Unitários](./docs/unit-test.md)

## Licença

Este projeto está licenciado sob a **Licença MIT**. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
