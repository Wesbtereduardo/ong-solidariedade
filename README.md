# Entrega III – Interatividade e Funcionalidades

## Objetivo
Transformar a interface da Entrega II em uma aplicação dinâmica com JavaScript, adicionando interatividade, melhoria de navegação e usabilidade, mantendo acessibilidade e responsividade.

## Visão Geral
Projeto estático de ONG fictícia (“Esperança Solidária”) com três páginas:
- `index.html` — Início, seções de apresentação, impacto e contato.
- `projetos.html` — Lista de projetos, voluntariado e doações.
- `cadastro.html` — Formulário de cadastro de voluntário.

Interatividade planejada:
- Alternância de tema (claro/escuro) via botão `button.theme-toggle`.
- Suporte a SPA básico (melhoria de navegação) via `js/spa.js`.
- Comportamentos de formulário no `cadastro.html` via `js/cadastro.js` (máscaras/feedback/armazenamento).

Observação: A pasta `js/` está presente, porém sem arquivos no momento. Os HTMLs já referenciam:
- `js/spa.js`
- `js/cadastro.js` (apenas em `cadastro.html`)

## Como Executar
- Pré-requisitos: navegador moderno.
- Execute abrindo `index.html` no navegador.
- Opcional: usar um servidor local (ex.: Live Server no VS Code) para rotas relativas mais consistentes.

## Estrutura de Pastas
- `index.html` — Página inicial e botão de alternância de tema.
- `projetos.html` — Cards, CTA e doações; inclui script de SPA.
- `cadastro.html` — Formulário com validações HTML5; inclui `js/cadastro.js` e `js/spa.js`.
- `css/`
  - `style.css` — Estilos globais e componentes.
  - `cadastro.css` — Estilos específicos do formulário.
- `js/`
  - `spa.js` — Script previsto para navegação/SPA e alternância de tema.
  - `cadastro.js` — Script previsto para lógicas do formulário.
- `assets/`
  - `imagens/` — Imagens utilizadas nas páginas.

## Funcionalidades Esperadas (JS)
- Tema Claro/Escuro:
  - Botão `.theme-toggle` alterna o tema.
  - Persistência da escolha do usuário (sugestão: `localStorage`).
  - Atualização de `aria-pressed` e texto/ícone do botão.
- Navegação/SPA básica:
  - Evitar recarregamentos completos quando possível (ex.: interceptar cliques e atualizar conteúdo/estado).
  - Manter acessibilidade e foco ao trocar de “rota”.
- Formulário de Cadastro:
  - Validações já existem via HTML5 (email, CPF, telefone, datas, UF, etc.).
  - JS pode: aplicar máscara, exibir mensagens de erro amigáveis, validar “pelo menos uma área”, salvar rascunho no `localStorage`, limpar estado ao enviar/resetar.

## Acessibilidade
- Uso de `aria-label` na navegação e `aria-pressed` no botão de tema.
- Elementos semânticos (`header`, `main`, `section`, `article`, `footer`).
- Textos alternativos em imagens.
- Formulário com `label`, `required`, `pattern`, `title`, `autocomplete`.

## Responsividade
- `meta viewport` configurado.
- Layout fluido e menu colapsável (checkbox/hambúrguer).
- Cartões e grids adaptáveis.

## Padrões sugeridos para os scripts
- `js/spa.js`:
  - Detectar tema salvo (ex.: `localStorage.theme`) e aplicar classe no `documentElement`.
  - Alternar tema no clique do `.theme-toggle`, atualizar rótulo/ícone e `aria-pressed`, persistir preferência.
  - Opcional: interceptar navegação interna para SPA simples, atualizar foco e título.
- `js/cadastro.js`:
  - Máscaras leves (CPF/telefone) sem dependências ou com validação adicional.
  - Feedback de erros no blur e no submit.
  - Salvar rascunho (nome, email, telefone, endereço) e restaurar ao carregar a página.
  - Limpar rascunho no reset/submit bem-sucedido.

## Critérios de Avaliação (sugeridos)
- Interatividade funcional (tema, navegação melhorada, formulário).
- Boas práticas de acessibilidade e UX (foco, aria, feedback).
- Código JS organizado, sem dependências desnecessárias.
- Responsividade preservada.
- Sem erros no console.

## Como Personalizar
- Temas e paleta em `css/style.css`.
- Campos adicionais no formulário em `cadastro.html` (+ ajustes em `cadastro.css`).
- Imagens em `assets/imagens/`.

## Roadmap (opcional)
- Implementar `js/spa.js` (tema + navegação básica).
- Implementar `js/cadastro.js` (máscaras, feedback, rascunho).
- Testes de acessibilidade e navegabilidade no teclado.
- Medir CLS/LCP em dispositivos móveis.

## Autor e Licença
- Autor: [preencher]
- Licença: Uso educacional.
