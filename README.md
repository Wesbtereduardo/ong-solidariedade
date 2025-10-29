# Entrega IV – Versionamento, Acessibilidade e Deploy

## Objetivos
Consolidar o projeto com práticas profissionais:
- Controle de versão (Git/GitHub) com estratégia GitFlow e commits semânticos.
- Acessibilidade em conformidade com WCAG 2.1 Nível AA (teclado, leitores de tela, contraste, alto contraste e modo escuro).
- Otimização para produção (minificação de HTML/CSS/JS e compressão de imagens).
- Documentação técnica e deploy em produção.

## Estrutura (resumo)
- `index.html`, `projetos.html`, `cadastro.html`
- `css/style.css`, `css/cadastro.css`
- `js/spa.js`, `js/cadastro.js`
- `assets/imagens/`

## GitFlow e Commits
- Branches: `main` (produção), `develop` (integração), 
- Conventional Commits: 

## Acessibilidade (WCAG 2.1 AA)
- Navegação por teclado e gerenciamento de foco em submenu.
- `aria-*` adequado, `aria-live` para mensagens e `aria-pressed` no botão de tema.
- Temas: claro, escuro e alto contraste; contraste ≥ 4.5:1.
- Estados de foco visíveis com `:focus`/`:focus-visible`.

## Otimização para Produção
- Minificação de HTML/CSS/JS.
- Compressão de imagens em `assets/imagens/`.

## Deploy


### GitHub Pages


## Testes de Acessibilidade (WCAG 2.1 AA)
- Teclado:
  - Tab no início deve focar o link "Pular para o conteúdo" e levar ao `main`.
  - Submenu "Projetos": setas para navegar, Esc para voltar o foco.
- Leitores de tela: verificar `aria-label`, `aria-expanded`, `aria-pressed`, `aria-live`.
- Contraste: checar temas Claro/Escuro/Alto Contraste com mínimo 4.5:1.

## Como rodar localmente
- Abrir `index.html` no navegador (ou usar um servidor local, ex.: Live Server).

## Documentação
- Este README descreve objetivos, fluxos de trabalho e critérios da Entrega IV.