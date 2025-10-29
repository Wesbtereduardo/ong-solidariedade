# Entrega II – Estilização e Leiautes

## Objetivo
Aplicar CSS3 para transformar a estrutura HTML da Entrega I em uma interface visual profissional, responsiva e acessível. A entrega demonstra uso de leiautes modernos, sistema de navegação com submenu, tipografia, cores, espaçamentos e boas práticas de acessibilidade.

## Visão Geral do Projeto
Site estático de uma ONG fictícia (“Esperança Solidária”) com três páginas:
- Página inicial com hero, seções “Sobre”, “Impacto” e “Contato”.
- Página de Projetos com cards, CTA de voluntariado e seção de doações.
- Página de Cadastro de Voluntário com formulário validado via HTML5.

## Como Executar
- Pré-requisitos: nenhum (somente um navegador moderno).
- Execução:
  - Abra o arquivo `index.html` diretamente no navegador.
  - Alternativamente, use uma extensão de servidor local (ex.: Live Server no VS Code) para melhor experiência com caminhos relativos.

## Estrutura de Pastas
- `index.html` — Página inicial.
- `projetos.html` — Lista de projetos, como doar e CTA de voluntariado.
- `cadastro.html` — Formulário de cadastro de voluntário.
- `css/`
  - `style.css` — Estilos globais, navegação, leiaute e componentes.
  - `cadastro.css` — Estilos específicos do formulário de cadastro.
- `assets/`
  - `imagens/` — Imagens usadas nas páginas (ex.: `index.png`, `projeto.png`, `cadastro.png`)

## Navegação
- Menu principal com submenu em “Projetos”.
- Versão mobile com botão hambúrguer controlado por `input[type=checkbox]`.

## Acessibilidade
- `lang="pt-BR"` no `html`.
- `aria-label` e semântica em `nav`, `main`, `section`, `article`, `footer`.
- Textos alternativos em imagens.
- Campos de formulário com `label`, `required`, `pattern`, `title`, `autocomplete` e mensagens de ajuda.

## Responsividade
- `meta viewport` configurado.
- Grid/cards adaptáveis.
- Menu colapsável em telas menores.

## Formulário (cadastro.html)
- Validações nativas HTML5:
  - `email`, `cpf` (formato `000.000.000-00`), `telefone` (formato `(00) 00000-0000`).
  - Data de nascimento com faixa etária (min/max).
  - Seleção de estado (UFs).
  - Campos obrigatórios indicados e mensagens de ajuda.
- Botões: enviar e limpar.

## Páginas
- `index.html`:
  - Hero com CTA “Seja um Voluntário”.
  - Seções “Sobre Nós”, “Nosso Impacto” (indicadores) e “Contato”.
- `projetos.html`:
  - Cards de projetos com tags e impactos.
  - Seção “Como Ser Voluntário” com passos.
  - Seção “Como Doar” com métodos de doação.
- `cadastro.html`:
  - Formulário completo com fieldsets: Dados Pessoais, Endereço, Voluntariado e Termos.

## Como Personalizar
- Cores, tipografia e espaçamentos: ajuste em `css/style.css`.
- Campos do formulário: edite `cadastro.html` e, se necessário, `css/cadastro.css`.
- Imagens: substitua arquivos em `assets/imagens/` mantendo os nomes ou atualize os `src`.

## Critérios de Avaliação (sugeridos)
- Organização e clareza do CSS.
- Layout responsivo e consistente.
- Acessibilidade básica (labels, alt, semântica).
- Validações HTML5 corretas.
- Navegação funcional, inclusive no mobile.
