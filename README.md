# ONG Solidariedade — Aula front-end-web

Site estático de uma ONG com foco em acessibilidade (WCAG 2.1 AA), desenvolvido em HTML, CSS e JavaScript. Inclui páginas de apresentação, projetos e um formulário de cadastro, com navegação e componentes preparados para teclado e leitores de tela.

- Repositório: https://github.com/Wesbtereduardo/ong-solidariedade
- Demonstração (GitHub Pages): https://wesbtereduardo.github.io/ong-solidariedade/

## Sumário

- [Visão Geral](#visão-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Acessibilidade (WCAG 21 AA)](#acessibilidade-wcag-21-aa)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Deploy (GitHub Pages)](#deploy-github-pages)
- [Padrões de Versionamento](#padrões-de-versionamento)
- [Issues, Milestones e Pull Requests](#issues-milestones-e-pull-requests)
- [Roadmap](#roadmap)
- [Versão](#Versão)
- [Licença](#licença)

## Visão Geral

Este projeto consolida:
- Controle de versão com Git/GitHub, GitFlow simplificado e Commits Semânticos.
- Acessibilidade em conformidade com WCAG 2.1 AA (teclado, ARIA, contraste).
- Documentação técnica com instruções de uso e deploy via GitHub Pages.

## Estrutura do Projeto

```
.
├── index.html
├── projetos.html
├── cadastro.html
├── css/
│   ├── style.css
│   └── cadastro.css
├── js/
│   ├── spa.js
│   ├── projects.js
│   └── cadastro.js
└── assets/
    └── imagens/   (imagens utilizadas no site)
```

- `index.html`: página inicial e navegação.
- `projetos.html`: listagem/descrição de projetos.
- `cadastro.html`: formulário de cadastro.
- `css/style.css`: estilos gerais e temas.
- `css/cadastro.css`: estilos do formulário.
- `js/spa.js`: navegação/comportamentos e acessibilidade do menu.
- `js/projects.js`: lógica de projetos (listagem/dados).
- `js/cadastro.js`: validações/feedback do formulário.

## Funcionalidades

- Navegação com submenu acessível via teclado (Tab/Shift+Tab/Setas/Esc).
- Temas com foco em contraste (claro/escuro/alto contraste).
- Formulário de cadastro com validação e mensagens ao usuário.

## Acessibilidade (WCAG 2.1 AA)

- Teclado:
  - Foco visível com `:focus` e `:focus-visible`.
  - Submenus navegáveis por setas; `Esc` fecha e retorna foco ao botão.
- ARIA:
  - Uso de `aria-label`, `aria-expanded`, `aria-pressed`, `aria-live` quando aplicável.
- Contraste:
  - Paletas de cor visando contraste ≥ 4.5:1.
- Testes sugeridos:
  - Teclado (Tab/Shift+Tab/Enter/Esc/Setas).

## Como Rodar Localmente

- Abrir `index.html` diretamente no navegador, ou
- Usar um servidor local (recomendado, ex.: extensão “Live Server” no VS Code).

Passos (Live Server):
1. Abrir a pasta do projeto no VS Code.
2. Instalar a extensão “Live Server”.
3. Clicar em “Go Live” e acessar o endereço indicado (ex.: http://127.0.0.1:5500).

## Deploy (GitHub Pages)

Já publicado (link no topo). Para configurar/ajustar:
1. GitHub Repo → Settings → Pages.
2. Build and deployment → Source: “Deploy from a branch”.
3. Branch: `main` (root).
4. Salvar e aguardar a publicação.
5. URL: `https://<usuario>.github.io/ong-solidariedade/`.

## Padrões de Versionamento

- GitFlow (simplificado):
  - `main`: produção.
  - `develop`: integração.
  - `feature/*`: novas funcionalidades.
  - `fix/*`: correções.
  - `hotfix/*`: correções urgentes a partir de `main`.

- Commits Semânticos:
- link:https://github.com/Wesbtereduardo/ong-solidariedade/commits/main/


## Issues, Milestones e Pull Requests

- Issues:https://github.com/Wesbtereduardo/ong-solidariedade/issues
- Milestones:https://github.com/Wesbtereduardo/ong-solidariedade/milestones
- Pull Requests:https://github.com/Wesbtereduardo/ong-solidariedade/pulls?q=is%3Apr+is%3Aclosed
 
## Releases
link:https://github.com/Wesbtereduardo/ong-solidariedade/releases

## Roadmap

- Acessibilidade: revisão contínua com ferramentas automáticas.
- Documentação: ampliar exemplos e capturas de tela.
- Otimização (futuro): minificação de HTML/CSS/JS e compressão de imagens.

## Licença
📜 Licença Educacional para Estudantes LICENÇA EDUCACIONAL ABERTA Desenvolvido com para fins de aprendizado

## Forma de Entrega (Checklist)

- Repositório público no GitHub com código fonte versionado.
- Histórico de commits organizado com Conventional Commits.
- Pull Requests documentados e revisados.
- Issues e milestones utilizados (ex.: “Entrega IV”).
- README profissional completo na raiz.
- Link público:
  - Repositório: https://github.com/Wesbtereduardo/ong-solidariedade
  - GitHub Pages: https://wesbtereduardo.github.io/ong-solidariedade/
  ## Versão
  # 🎉 v1.0.0 - Lançamento Inicial

Primeira versão estável da Plataforma ONG Solidariedade.

## 🚀 Destaques
- ✨ Sistema de navegação SPA
- 📝 Formulário completo com validação
- ♿ Acessibilidade WCAG 2.1 Nível AA
- 🌙 Modo escuro e alto contraste
- 📱 Design responsivo mobile-first
- ⚡ Performance otimizada

## ✨ Funcionalidades
- Página inicial institucional
- Catálogo de projetos sociais
- Formulário de cadastro de voluntários
- Sistema SPA com templates dinâmicos
- Navegação por teclado completa
- Validação de formulários em tempo real

## 📚 Documentação
- README profissional
- Exemplos de commits/issues

## ✅ Conformidade
- W3C Validator: 100%
