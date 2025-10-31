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
- Conventional Commits: html , html-css , html-css-js 

## Acessibilidade (WCAG 2.1 AA)
- Navegação por teclado e gerenciamento de foco em submenu.
- `aria-*` adequado, `aria-live` para mensagens e `aria-pressed` no botão de tema.
- Temas: claro, escuro e alto contraste; contraste ≥ 4.5:1.
- Estados de foco visíveis com `:focus`/`:focus-visible`.

## Otimização para Produção
- Minificação de HTML/CSS/JS.
- Compressão de imagens em `assets/imagens/`.

## Deploy
1s
Current runner version: '2.328.0'
Runner Image Provisioner
Operating System
Runner Image
GITHUB_TOKEN Permissions
Secret source: Actions
Prepare workflow directory
Prepare all required actions
Getting action download info
Download action repository 'actions/deploy-pages@v4' (SHA:d6db90164ac5ed86f2b6aed7e0febac5b3c0c03e)
Complete job name: deploy
7s
Run actions/deploy-pages@v4
Fetching artifact metadata for "github-pages" in this workflow run
Found 1 artifact(s)
Creating Pages deployment with payload:
{
	"artifact_id": 4411811403,
	"pages_build_version": "77aea569e8c0be98cd8adb79b833823c75d6ab8c",
	"oidc_token": "***"
}
Created deployment for 77aea569e8c0be98cd8adb79b833823c75d6ab8c, ID: 77aea569e8c0be98cd8adb79b833823c75d6ab8c
Getting Pages deployment status...
Reported success!
0s
Evaluate and set environment url
Evaluated environment url: https://wesbtereduardo.github.io/ong-solidariedade/
Cleaning up orphan proces

### GitHub Pages
https://wesbtereduardo.github.io/ong-solidariedade/

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
