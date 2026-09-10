# DOCUMENTACAO.md — League of Wikis

## 1. O que é o site

**League of Wikis** é um protótipo fictício de página única (single
scroll) inspirado visualmente no universo de League of Legends, com foco
em campeões, skins, runas e habilidades. Ele não é um produto oficial e
não possui vínculo com a Riot Games. O site simula um "hub" de jogo com
header de navegação, um carrossel de campeões em destaque, uma vitrine de
20 campeões, uma vitrine de 20 skins (com raridade e valor) e um rodapé
institucional, tudo com a identidade visual "Hextech" do jogo.

## 2. Como instalar e rodar, com as bibliotecas necessárias

**Não precisa instalar nada.** Basta dar duplo clique em `index.html` (ou
abrir esse arquivo pelo navegador) — o site abre direto, sem servidor,
sem `npm install` e sem build.

```
LEAGUE-OF-WIKIS-PROTOTYPE/
├─ index.html      ← abrir este arquivo
├─ estilo.css
├─ script.js
├─ vendor/
│  └─ rellax.min.js   (biblioteca Rellax 1.12.1, vendorizada localmente)
└─ assets/
   └─ favicon.svg
```

A única biblioteca externa do projeto (**Rellax 1.12.1**, para o efeito
de parallax) já vem dentro da pasta `vendor/`, carregada por
`<script src="vendor/rellax.min.js">` — funciona mesmo sem internet. As
imagens de campeões/skins continuam vindo de CDNs públicas da Riot
(`ddragon.leagueoflegends.com` e `wiki.leagueoflegends.com`), então essas
precisam de internet para carregar — mas isso não impede o site de abrir
nem de funcionar (ver item 4, "Fallback de imagem").

**Nota sobre a versão anterior**: este projeto já existiu em uma versão
React + Vite (que exigia `npm install` + `npm run dev`/`build` para
rodar). Essa versão foi **reescrita para HTML/CSS/JavaScript puro**
especificamente para atender ao critério da Aula 02 de abrir com duplo
clique, sem servidor. O código-fonte React/Vite anterior foi preservado,
por referência, na pasta `versao-react-anterior/` — ela **não faz parte
da entrega exigida** e não precisa ser aberta nem executada.

## 3. Tecnologias, com versões e o que cada uma faz

| Tecnologia | Versão | O que faz |
|---|---|---|
| HTML5 | — | Estrutura da página (`index.html`) |
| CSS3 (custom properties, `clamp()`, `aspect-ratio`) | — | Aparência (`estilo.css`) — paleta Hextech, tipografia, responsividade |
| JavaScript (ES5/ES2015, sem módulos, sem build) | — | Comportamento (`script.js`) — dados, carrosséis, menu, avisos |
| **Rellax** | **1.12.1** | Biblioteca de efeito parallax — move as faixas laterais com o texto "LEAGUE OF WIKIS" numa velocidade diferente da rolagem da página; vendorizada em `vendor/rellax.min.js` |

Sem backend, autenticação real ou banco de dados — todo o conteúdo vem
de arrays de dados dentro do próprio `script.js`.

**Sobre os ícones**: a versão React usava o pacote `react-icons`. Na
versão estática, os ícones (lupa, engrenagem, avatar, menu/fechar,
setas) foram reescritos como SVG inline, direto no `index.html` — sem
depender de nenhum pacote de ícones.

## 4. Revisão dos elementos que compõem o site

- **HTML** (`index.html`): estrutura semântica da página — header, faixas
  de parallax, `main` com as três seções (Destaques, Campeões, Skins) e
  footer. Os cards de campeão/skin e os slides de destaque são inseridos
  dinamicamente pelo `script.js` (a partir dos dados), não estão escritos
  à mão no HTML.
- **CSS** (`estilo.css`, arquivo único): aparência — paleta Hextech,
  tipografia, espaçamento, animações de hover/entrada, responsividade por
  media query. Organizado em seções comentadas (variáveis, reset,
  header, parallax, destaques, carrossel genérico, cards, footer).
- **JavaScript** (`script.js`, arquivo único, sem módulos ES — por isso
  funciona abrindo o arquivo direto, sem CORS): contém os dados
  (campeões, skins, destaques) e o comportamento — abre/fecha o menu
  mobile, controla os carrosséis (autoplay, pausa, navegação manual e
  por teclado), mostra o aviso de "Em breve no protótipo" nos itens sem
  função real, instancia o Rellax nas faixas laterais, atualiza o ano do
  copyright no footer.
- **Dados**: no topo de `script.js`, em três listas (`HIGHLIGHTS`,
  `CHAMPIONS`, `SKINS`) — trocar um campeão, preço ou raridade é editar
  só essas listas, sem mexer no HTML/CSS.
- **Biblioteca de efeito (Rellax 1.12.1)**: instanciada via
  `new Rellax(elemento, { speed })` para cada faixa lateral, dentro de
  `initParallax()` em `script.js`.
- **Carrosséis**: o de Destaques (`initHighlights()`) é circular com
  autoplay; os de Campeões e Skins reaproveitam uma única função
  genérica (`initCardCarousel()`) com rolagem horizontal nativa.
- **Footer**: nome do site, grupos de links institucionais, redes
  sociais, seletor de idioma (protótipo) e disclaimer de copyright — a
  parte estrutural está fixa no HTML (é conteúdo institucional, não
  dado variável); só o ano do copyright é preenchido por JavaScript.
- **Fallback de imagem**: listener de `error` no `<img>` de cada card
  substitui a imagem quebrada por um card estilizado com o nome do
  campeão/skin, exatamente como na versão React.

## 5. Ambiente de desenvolvimento

- **Desenvolvimento do código**: conduzido inteiramente dentro do Claude
  (ambiente de execução de código do chat), que escreveu e testou o
  projeto a cada etapa — incluindo, nesta reescrita para HTML/CSS/JS
  puro, abrir o `index.html` de verdade via `file://` num navegador
  automatizado (Chromium/Playwright) para confirmar que funciona sem
  servidor.
- **Editor de texto usado pelo usuário**: Visual Studio Code (VS Code).
- **Sistema operacional**: Windows.
- **Navegador usado para testar**: Opera GX.

## 6. Qual IA foi usada, com a versão

- **Ferramenta**: Claude (claude.ai), interface de chat da Anthropic.
- **Modelo**: Claude Sonnet 5.
