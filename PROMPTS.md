# PROMPTS.md — League of Wikis

Registro real do processo de desenvolvimento, para cumprir a exigência de
rastreabilidade da Aula 02. Os trechos abaixo são resumos fiéis do que
realmente aconteceu na conversa, não uma reconstrução idealizada.

## 1. Pedido / requisito inicial

O projeto começou com um prompt longo e detalhado (fornecido pelo
usuário) definindo o "League of Wikis": um protótipo de página única
inspirado em League of Legends, com header, carrossel de destaques (10
campeões fixos), vitrine de 20 campeões, vitrine de ~20 skins, footer,
parallax lateral com Rellax e uma identidade visual Hextech com paleta de
cores específica. Esse prompt exigia desenvolvimento por etapas, com
aprovação explícita a cada etapa, e proibia inventar dados factuais
(nomes, preços, raridades, lore).

## 2. Pesquisa / insumos

O usuário enviou um arquivo `Referencias_site.zip` com 5 imagens de
referência (header, carrossel de destaque, carrossel de campeões/skins,
footer, guia de identidade visual e faixa de parallax). Essas imagens
foram analisadas visualmente e, mais tarde nesta etapa de finalização,
identificadas como referências reais da Netflix e do Discord (ver
`INSUMOS.md`). Durante o desenvolvimento das skins, foram feitas
pesquisas na web (Data Dragon, League of Legends Wiki) para confirmar
nomes, raridades e preços reais em vez de inventar.

## 3. Pedido de plano (sem código)

Seguindo a regra do prompt original, a primeira resposta foi só uma
proposta de arquitetura de pastas (`components`, `sections`, `data`,
`styles`, `utils`) e decisões a aprovar (JavaScript vs TypeScript, fontes
livres vs oficiais, fonte das imagens), sem escrever nenhuma linha de
código — só depois da aprovação do usuário é que o código começou.

## 4. Desenvolvimento em etapas (versão React/Vite original)

O projeto React/Vite foi construído em 8 etapas aprovadas uma a uma:
Etapa 1 (estrutura + Header), Etapa 2 (carrossel de Destaques), Etapa 3
(carrossel de Campeões), Etapa 4 (carrossel de Skins — com correção
posterior de dados e imagens pedida pelo usuário), Etapa 5 (Footer),
Etapa 6 (Parallax com Rellax + animações de entrada), Etapa 7
(responsividade/acessibilidade) e Etapa 8 (revisão final e empacotamento
em `LEAGUE-OF-WIKIS-PROTOTYPE.zip`).

## 5. Inclusão da biblioteca de efeito

A biblioteca **Rellax 1.12.1** foi adicionada na Etapa 6 (da versão
React), instanciada via `new Rellax(elemento, { speed })` em cada uma das
duas faixas laterais, com velocidades diferentes (-2 e -3) para reforçar
a sensação de profundidade. Confirmado como uso real da biblioteca, não
apenas decorativo/documentado — e esse mesmo padrão de uso foi preservado
na reescrita estática (ver item 10 abaixo).

## 6. Correções feitas (versão React/Vite original)

- **Sintoma**: "não está aparecendo nada no site" — o usuário reportou
  tela em branco ao rodar localmente. **Ação**: preparei um teste com
  navegador headless (Playwright) para reproduzir o erro; o usuário
  corrigiu por conta própria antes que o teste terminasse.
- **Sintoma**: "não está aparecendo todas as imagens das skins" + pedido
  para traduzir os nomes para português do Brasil. **Ação**: pesquisei
  URLs de splash art adicionais (7 confirmadas por código numérico
  exato, 13 por padrão de nomenclatura do wiki oficial validado em mais
  de 10 exemplos), corrigi um erro de dado descoberto durante a pesquisa
  (High Noon Ashe/Leona são Épico/1350 RP, não Lendário/1820 RP), e
  apliquei nomes em PT-BR só onde a Riot realmente traduz oficialmente.
- **Sintoma** (achado em auditoria, não reportado pelo usuário): o menu
  esquerdo do header não tinha "Perfil" no desktop. **Ação**: adicionei
  "Perfil" a `NAV_ITEMS`, com o mesmo comportamento "Em breve no
  protótipo" de Runas/Habilidades.
- **Sintoma** (idem): o footer tinha "Central de ajuda" em vez do termo
  literal "Suporte" pedido no prompt original. **Ação**: renomeado.
- **Sintoma** (idem, calculando a largura real do header em ~360px): a
  soma de marca + ícones passava da viewport de 360px. **Ação**: media
  query em 400px reduzindo gap e tamanho da marca.

## 7. Finalização para a Aula 02 — primeira rodada (versão React mantida)

Nesta conversa, o usuário forneceu o material da Aula 02 (PDF) e um
prompt-mestre de finalização, pedindo auditoria e adequação do projeto
já existente aos requisitos acadêmicos. Uma Etapa 0 de auditoria foi
feita (matriz de conformidade, identificação do problema de arquitetura
React/Vite vs. exigência de abrir com dois cliques) e aprovada pelo
usuário. Os documentos obrigatórios (`REQUISITOS.md`, `INSUMOS.md`,
`DOCUMENTACAO.md`, `PROMPTS.md`) foram criados, com decisões sobre as
referências (Netflix + Discord) e sobre o ambiente/IA usados (Windows,
Opera GX, VS Code, Claude Sonnet 5) confirmadas diretamente pelo usuário.

Uma primeira tentativa de migração para HTML/CSS/JS estático puro
chegou a ser implementada por completo nesta rodada — dados, CSS e
comportamento inteiros convertidos, testados com uma simulação
automatizada de carregamento de página. **Naquele momento, o usuário não
gostou do resultado e pediu para manter a versão React/Vite original**,
o que foi feito, registrado com a divergência de RNF01 assumida e
documentada (não escondida).

## 8. Auditoria técnica independente (segunda rodada)

Numa nova conversa, o usuário pediu uma auditoria técnica completa e
independente do projeto entregue (`LEAGUE-OF-WIKIS-PROTOTYPE.zip`, ainda
na versão React/Vite). A auditoria incluiu leitura de todo o código-fonte,
execução real (`npm install`, `npm run build`, `npm run lint`,
`npm run preview`) e teste funcional num navegador real (Chromium via
Playwright) em três larguras de tela. Resultado: **aprovado com
ressalvas** — praticamente todos os requisitos comprovados por teste
real, com dois problemas apontados: (1) RNF01 não cumprido (arquitetura
React/Vite não abre sem servidor) e (2) revisão externa ainda pendente.
O usuário confirmou que só o item RNF01 deveria ser corrigido nesta
etapa.

## 9. Migração definitiva para HTML/CSS/JS puro (esta versão)

Diferente da tentativa da Etapa 7 (item 7 acima, revertida na época), o
usuário pediu explicitamente, nesta rodada, para reescrever o projeto
inteiro em HTML/CSS/JS puro e ajustar toda a documentação — desta vez
como decisão definitiva, não uma opção a avaliar. Foi feito o seguinte:

- **`index.html`**: toda a estrutura estática (header, faixas de
  parallax, seções, footer) reescrita a partir do JSX original, com
  `id`s e `data-*` attributes para o JavaScript se conectar. Os ícones
  (antes do pacote `react-icons`) foram reescritos como SVG inline.
- **`estilo.css`**: consolidação de todos os arquivos `.css` da versão
  React (variables, global, Header, ParallaxStripe, HighlightsCarousel,
  CardCarousel, ChampionCard, SkinCard, RarityBadge, Footer, App) em um
  único arquivo, preservando regra por regra — nenhum valor visual foi
  alterado.
- **`script.js`**: toda a lógica dos componentes React (estado do menu
  mobile, avisos "Em breve", scroll suave, carrossel de Destaques com
  autoplay/pausa/navegação, carrossel genérico de Campeões/Skins com
  scroll nativo + teclado, fallback de imagem, instância do Rellax,
  ano do copyright) reescrita em JavaScript puro (sem módulos ES, para
  não esbarrar em restrição de CORS ao abrir via `file://`), incluindo
  os três arrays de dados (`HIGHLIGHTS`, `CHAMPIONS`, `SKINS`) — mesmos
  dados da versão React, sem nenhuma alteração de conteúdo.
- **Rellax vendorizado**: em vez de um CDN, o arquivo `rellax.min.js`
  1.12.1 foi copiado para `vendor/`, para o efeito de parallax funcionar
  mesmo sem internet.
- **Testes reais via `file://`**: abri `index.html` de verdade (não um
  servidor) num navegador Chromium automatizado e testei: renderização
  dos 10 destaques / 20 campeões / 20 skins; clique nos itens do menu
  (scroll até Campeões e até Skins, aviso "Em breve" em Runas); captura
  de texto no campo de busca; autoplay real do carrossel de Destaques
  (aguardando o tempo real do intervalo, não simulado); navegação manual
  e por teclado; abertura/fechamento do menu mobile em 360px; ausência
  de overflow horizontal; e o parallax realmente mudando o `transform`
  ao rolar a página. **Zero erros de JavaScript** em todos os testes.
- **Bug real encontrado e corrigido durante esse teste**: os ícones de
  menu (☰) e fechar (✕) do botão mobile ficaram os dois visíveis ao
  mesmo tempo. Causa raiz: a propriedade `.hidden` em JavaScript não
  reflete de forma confiável no atributo real para elementos `<svg>`
  (diferente de elementos HTML comuns), então `svg.hidden = true` não
  escondia o ícone. Corrigido usando `setAttribute('hidden', '')` /
  `removeAttribute('hidden')` diretamente, e reforçado com uma regra CSS
  `[hidden] { display: none !important; }`. Reproduzido e confirmado
  corrigido com teste automatizado antes de finalizar.
- **`versao-react-anterior/`**: o código-fonte React/Vite anterior foi
  preservado nessa pasta, só como referência — não é parte da entrega
  exigida pela Aula 02 e não precisa ser aberto.

Os quatro documentos obrigatórios (`DOCUMENTACAO.md`, `REQUISITOS.md`,
`INSUMOS.md`, este `PROMPTS.md`) foram atualizados para refletir a nova
arquitetura: instruções de instalação trocadas por "duplo clique em
`index.html`", RNF01 marcado como atendido, biblioteca `react-icons`
removida da lista de dependências (substituída por SVG inline), e Rellax
documentada como vendorizada localmente.

## 10. Revisão

**Ainda pendente de revisão externa** (outra IA/ferramenta ou pessoa) —
isso não mudou nesta rodada, só o item RNF01 foi tratado. Até o momento
deste registro, o projeto foi revisado pela mesma conversa que o
desenvolveu/auditou, o que a Aula 02 desaconselha como única forma de
revisão. Recomenda-se buscar essa revisão externa antes da entrega final.

## 11. Testes

Testes automatizados de build e lint foram rodados a cada etapa da
versão React (`npm run build`, `npm run lint`), sempre com resultado
limpo. Na auditoria da versão React (item 8 acima), uma bateria real via
navegador headless confirmou renderização e interação corretas, com zero
erros de JavaScript.

Na reescrita para HTML/CSS/JS puro (item 9), o mesmo tipo de bateria foi
repetida — desta vez abrindo o arquivo **de verdade via `file://`**, o
cenário exato de "abrir com duplo clique" exigido por RNF01, não uma
simulação por servidor local. Um bug real (ícones do menu mobile) foi
encontrado e corrigido durante esse processo, conforme relatado no
item 9.

**O que ainda não foi feito**: teste manual num navegador real (Opera
GX, Windows), abrindo o arquivo de verdade fora do ambiente do Claude.
Isso é responsabilidade do usuário e está registrado como pendente,
conforme a regra de não inventar resultado de teste — a bateria
automatizada acima aumenta bastante a confiança, mas não substitui abrir
o arquivo de verdade no computador do usuário.

---

**Revisão:** pendente de revisão externa em outra conversa/ferramenta +
validação manual do usuário (abrir o `index.html` de verdade com duplo
clique, checar o console, testar em tela estreita). Nenhuma revisão
externa foi realizada até o momento deste registro.
