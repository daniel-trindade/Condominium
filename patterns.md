# Análise de Padrões de Projeto no Projeto Condominium

Este documento detalha a implementação de cinco Padrões de Projeto (Design Patterns) identificados nas arquiteturas de Front-End (React/Vite) e Back-End (NestJS/Prisma) do projeto.

---

## Singleton (Padrão Criacional)

O padrão Singleton garante que uma classe tenha no máximo uma instância, fornecendo um ponto de acesso global a ela.

No Back-End, o *framework* NestJS implementa este padrão por padrão para gerenciar seus *Providers* (Serviços). Quando o `AppModule` registra o `AppService`, o NestJS cria uma instância única dele. O `AppController` então recebe acesso a este Singleton através da Injeção de Dependência em seu construtor, garantindo que toda a aplicação compartilhe a mesma instância do serviço.

---

## Observer (Padrão Comportamental)

O padrão Observer implementa uma relação onde um "Sujeito" (Subject) notifica automaticamente seus "Observadores" (Observers) sobre mudanças de estado.

No Front-End, a API de Contexto do React é uma implementação direta disso. O `AuthContext.jsx` define o `<AuthProvider>` como o Sujeito que armazena o estado do usuário. Os componentes filhos que consomem este contexto atuam como Observadores. Quando a função `login()` altera o estado, o `AuthProvider` notifica todos os Observadores, que se atualizam automaticamente para refletir o novo estado de autenticação.

---

## Facade (Padrão Estrutural)

O padrão Facade (Fachada) fornece uma interface simplificada para um subsistema complexo, escondendo a complexidade do cliente.

No Back-End, o `AppController` atua como uma Fachada. O Front-End (o Cliente) não precisa conhecer a lógica de negócio interna do `AppService` ou a camada de dados do `Prisma`. Ele apenas interage com a interface simples das Rotas HTTP (`@Get()`) definidas no Controlador. O `AppController` então orquestra o subsistema complexo, simplificando a interação.

---

## Factory (Padrão Criacional)

O padrão Factory (Fábrica) é usado para centralizar a criação de objetos, desacoplando o cliente das classes concretas. Este padrão é visto na inicialização de ambas as partes da aplicação.

* No Back-End, o arquivo `main.ts` usa a `NestFactory` para criar a instância da aplicação (`NestFactory.create(AppModule)`). O seu código não sabe como o aplicativo NestJS é construído; ele apenas pede à Fábrica para criá-lo.
* No Front-End, o `main.jsx` usa a função `createRoot` como uma Fábrica. Em vez de instanciar a raiz do React manualmente, você chama esta função, que cuida da complexidade de vincular o React ao DOM.

---

## Decorator (Padrão Estrutural)

O padrão Decorator permite adicionar funcionalidades a um objeto dinamicamente, "embrulhando-o" com outras classes. No Front-End em React, esse padrão é implementado diretamente através da composição de componentes.

* Em `App.jsx`, o componente `<BrowserRouter>` age como um Decorador, "embrulhando" o `<AppLayout>` para adicionar a ele a funcionalidade de roteamento (a capacidade de ler a URL).
* Da mesma forma, em `Home.jsx` e `Condominos.jsx`, o componente `<Container>` "decora" o conteúdo principal da página, adicionando a ele a funcionalidade de layout e estilização centralizada.
