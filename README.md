# League of Wikis — Protótipo

Protótipo funcional de página única inspirado visualmente em League of
Legends, com foco em campeões, skins, runas e habilidades.

**Este é um projeto fictício e não oficial.** Não possui vínculo com a
Riot Games. League of Legends e seus elementos são propriedades de seus
respectivos detentores. Veja o disclaimer completo no rodapé do site.

---

## Como abrir

**Dê um duplo clique em `index.html`.** Não precisa instalar nada, não
precisa de servidor, não precisa de internet para o site abrir (as
imagens de campeões/skins, essas sim, vêm de CDNs públicas e precisam de
internet para carregar — se não carregarem, o card mostra um fallback
estilizado em vez de quebrar).

## Objetivo

Demonstrar, num protótipo front-end sem backend, uma experiência de
navegação premium no estilo "hub de jogo" — header fixo, carrossel de
destaques, vitrines de campeões e skins, parallax lateral e footer
institucional — usando a identidade visual Hextech (paleta, tipografia
e linguagem visual de League of Legends) como referência.

## Tecnologias utilizadas

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura (`index.html`) |
| CSS3 (custom properties, `clamp()`, `aspect-ratio`) | Estilização (`estilo.css`), sem framework de CSS |
| JavaScript puro (sem módulos, sem build) | Comportamento e dados (`script.js`) |
| [Rellax 1.12.1](https://dixonandmoe.com/rellax/) | Efeito parallax das faixas laterais — vendorizada em `vendor/rellax.min.js` |

Sem backend, autenticação real ou banco de dados — todo o conteúdo vem
dos arrays de dados no topo de `script.js`.

## Estrutura do projeto

```
index.html              # estrutura da página
estilo.css               # todo o CSS (paleta, layout, componentes, responsividade)
script.js                 # dados (campeões/skins/destaques) + comportamento
vendor/
  rellax.min.js            # biblioteca Rellax 1.12.1 (MIT), local
  rellax.LICENSE.txt
assets/
  favicon.svg               # ícone do site
DOCUMENTACAO.md
REQUISITOS.md
INSUMOS.md
PROMPTS.md
versao-react-anterior/     # código-fonte React/Vite anterior, só como referência
```

### Header

Navegação fixa (Início, Campeões, Skins, Runas, Habilidades, Perfil),
busca, engrenagem e avatar. Menu colapsa em hambúrguer abaixo de 900px.
Itens sem função real (Runas, Habilidades, Perfil, Configurações)
mostram um aviso "Em breve no protótipo" ao serem clicados.

### Faixas de parallax

Faixas decorativas nas bordas laterais com o texto "LEAGUE OF WIKIS" em
movimento contínuo via Rellax (`new Rellax(elemento, { speed })`, em
`initParallax()` dentro de `script.js`). Somem abaixo de 1100px e quando
o sistema tem `prefers-reduced-motion` ativado.

### Carrosséis

- **Destaques**: 10 campeões fixos, circular, com autoplay a cada 5,5s
  (pausa ao passar o mouse ou focar via teclado), navegação manual por
  setas/indicadores e pelas setas do teclado.
- **Campeões / Skins**: rolagem horizontal nativa com `scroll-snap`,
  setas de navegação (ocultas em telas ≤640px, priorizando o gesto de
  arrastar) e navegação por teclado.

Ambos os carrosséis de cards (Campeões e Skins) reaproveitam a mesma
função genérica `initCardCarousel()` em `script.js`, em vez de duplicar
a lógica.

### Cards com fallback de imagem

`ChampionCard` e `SkinCard` (agora funções `renderChampionCard()` /
`renderSkinCard()`) têm um listener de `error` na `<img>` que substitui
a imagem quebrada por um card estilizado com o nome do campeão/skin —
sem quebrar o layout.

## Identidade visual

Paleta Hextech definida em `:root` no topo de `estilo.css`:

| Cor | Hex | Uso |
|---|---|---|
| Azul profundo | `#091428` | Fundo base |
| Azul-esverdeado escuro | `#0A323C` | Painéis, cards |
| Ciano Hextech | `#0AC8B9` | Interação, hover, foco |
| Ouro Hextech | `#C8AA6E` | Bordas, texto de destaque |
| Ouro pálido / pergaminho | `#F0E6D2` | Texto principal |
| Azul mágico | `#005A82` | Sombras, gradiente do footer |

**Tipografia**: as fontes oficiais da Riot (*Beaufort for LOL* e
*Spiegel*) não são de uso livre, então o protótipo usa fontes do
Google Fonts com o mesmo caráter visual — **Cinzel/Marcellus** para
títulos e **Spectral** para corpo de texto, carregadas via `<link>` no
`<head>` de `index.html` (com fallback `serif` caso não haja internet).

## Fontes de dados (evitando informação inventada)

- **Campeões e destaques**: nomes, títulos e splash arts vêm da CDN
  pública oficial da Riot ([Data Dragon](https://developer.riotgames.com/docs/lol),
  patch 16.17.1). As descrições curtas dos destaques são uma paráfrase
  escrita para o protótipo, não uma cópia do texto oficial.
- **Skins**: nome, campeão, raridade e preço em RP foram pesquisados
  individualmente (Data Dragon, League of Legends Wiki e fontes
  especializadas) — ver comentário no array `SKINS` em `script.js` para
  o detalhamento de quais imagens têm URL exatamente confirmada e quais
  seguem o padrão de nomenclatura verificado do wiki oficial.

## Limitações do protótipo

- Sem backend: busca, "Runas", "Habilidades" e "Perfil" têm apenas
  comportamento visual (mensagem "Em breve no protótipo").
- Links do footer não navegam (têm `preventDefault`), como definido no
  briefing.
- 13 das 20 imagens de skin usam uma URL construída a partir de um
  padrão de nomenclatura verificado em mais de 10 exemplos reais, não
  uma URL individualmente conferida uma a uma — cada `<img>` tem
  fallback automático caso o nome fuja do padrão.
- Sem testes automatizados empacotados no projeto (fora do escopo do
  briefing) — os testes foram feitos durante o desenvolvimento (ver
  `PROMPTS.md`), não fazem parte da entrega.

## Como expandir

- **Trocar campeões/destaques**: edite os arrays `CHAMPIONS` ou
  `HIGHLIGHTS` no topo de `script.js`. Cada entrada precisa de um `id`
  que corresponda ao nome do campeão no Data Dragon (para a imagem
  funcionar).
- **Trocar skins**: edite o array `SKINS`. Preencha `image` com uma URL
  de splash art real quando tiver uma; deixe `null` para usar o
  fallback estilizado.
- **Trocar preços/raridades**: são só campos de dado (`price`,
  `rarity`) em cada item de `SKINS` — a raridade deve ser um dos
  valores do objeto `RARITY`.
- **Textos e paleta**: cores e fontes ficam centralizadas em `:root`
  no topo de `estilo.css`; basta trocar os valores das variáveis CSS
  para re-temar o site inteiro.
