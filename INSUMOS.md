# INSUMOS.md — League of Wikis

Registro dos insumos e referências usados no projeto, de onde vieram e sob
qual licença/observação, conforme exigido pela Aula 02.

## 1. Sites de referência (2 obrigatórios, com print)

### Netflix — netflix.com

- **Print**: `hub superior.png` e `carrosel de skins e campeões.png`
  (arquivo `Referencias_site.zip` fornecido no material do projeto).
- **Origem do print**: fornecido pelo usuário como referência visual do
  projeto — não foi um print capturado por navegação nesta conversa.
- **Motivo da escolha**: o header (Início/Séries/Filmes/Bombando/Navegar
  por idiomas + busca/avatar) e as fileiras horizontais de cards
  ("Novidades na Netflix", "Minha lista") são a interface real da Netflix.
- **O que foi usado como inspiração**: a estrutura de header fixo com
  navegação à esquerda e ícones à direita; o padrão de carrossel
  horizontal de cards para as seções de Campeões e Skins.
- **O que NÃO foi copiado**: texto, cores, logotipo, conteúdo (títulos de
  filmes/séries) — a paleta usada é a Hextech própria do projeto, e todo
  o conteúdo é sobre League of Legends.
- **Licença/observação**: uso como referência visual/estrutural para fins
  educacionais, sem reprodução de marca, conteúdo ou identidade visual da
  Netflix no produto final.

### Discord — discord.com

- **Print**: `hub final.png` e `linha das bordas.png` (mesmo
  `Referencias_site.zip`).
- **Origem do print**: fornecido pelo usuário como referência visual do
  projeto.
- **Motivo da escolha**: o rodapé (logo, "Idioma", "Social" com ícones de
  redes sociais, grupos de links institucionais) e a faixa animada
  "JOGUE · BATA UM PAPO · CURTA · CONVIDE" são do site real do Discord.
  O Discord também é citado como referência no próprio material da
  Aula 02 (seção 4b).
- **O que foi usado como inspiração**: a organização do footer em colunas
  de links + bloco de idioma/redes sociais; a ideia de uma faixa lateral
  com texto em movimento contínuo (adaptada para o Parallax do projeto).
- **O que NÃO foi copiado**: texto, links reais, cores, logotipo — o
  footer final usa a paleta Hextech e os grupos de link do próprio
  "League of Wikis".
- **Licença/observação**: mesma observação da Netflix — referência
  visual/estrutural, sem reprodução de marca ou conteúdo.

### Terceira imagem (não usada como referência obrigatória)

Uma imagem adicional (`carrosel destaque.jpg`, um carrossel estilo
"STORYLINE SLIDER") também fazia parte do material original. O usuário
confirmou que essa imagem veio de uma **pesquisa no Google Imagens**, não
de um site específico que se possa citar como referência — por isso ela
não é registrada como uma das "referências de sites" exigidas pela
Aula 02. As duas referências acima (Netflix e Discord) cobrem a exigência
de "2 ou 3 sites", por decisão do usuário.

## 2. Paleta de cores

- **Origem**: `identidade visual.jpg` (arquivo `Referencias_site.zip`
  fornecido pelo usuário) — um guia de identidade visual próprio do
  projeto, não um site real.
- Azul profundo `#091428` · Azul-esverdeado escuro `#0A323C` · Ciano
  Hextech `#0AC8B9` · Ouro Hextech `#C8AA6E` · Ouro pálido/pergaminho
  `#F0E6D2` · Azul mágico `#005A82`.
- **Licença**: não aplicável (paleta definida pelo próprio usuário para o
  projeto, inspirada visualmente na estética "Hextech" de League of
  Legends, sem reprodução de arquivos oficiais da Riot Games).

## 3. Fontes de dados dos campeões, destaques e skins

- **Data Dragon** (`ddragon.leagueoflegends.com`) — CDN pública oficial
  da Riot Games, usada para nomes, títulos oficiais e splash arts dos
  campeões e destaques (patch 16.17.1 no momento da consulta).
  Licença de uso: CDN pública de acesso livre, disponibilizada pela Riot
  Games para desenvolvedores.
- **League of Legends Wiki** (`wiki.leagueoflegends.com`) — usada para
  confirmar nome, campeão, raridade e preço (RP) de cada skin, e para
  algumas URLs de splash art de skins.
- Nenhum nome, preço ou raridade de skin foi inventado: cada um foi
  pesquisado individualmente durante o desenvolvimento (ver os
  comentários no topo do array `SKINS` em `script.js` para o
  detalhamento de quais imagens têm URL exatamente confirmada e quais
  seguem um padrão de nomenclatura verificado em múltiplos exemplos
  reais).

## 4. Bibliotecas e fontes de terceiros

- **Rellax 1.12.1** (`dixonandmoe.com/rellax/`) — biblioteca de efeito
  parallax usada nas faixas laterais. Licença MIT (permite uso,
  modificação e redistribuição, inclusive comercial, mantendo o aviso de
  copyright). Citada como opção no próprio material da Aula 02 (seção 3).
  Nesta versão estática do projeto, o arquivo `rellax.min.js` está
  **vendorizado localmente** em `vendor/rellax.min.js` (copiado do
  pacote oficial `npm rellax@1.12.1`, mesma licença MIT preservada em
  `vendor/rellax.LICENSE.txt`) — carregado via `<script src="...">`
  local, em vez de um CDN externo, para que o efeito funcione mesmo sem
  internet.
- **Google Fonts — Cinzel, Marcellus, Spectral** — usadas como
  alternativa livre às fontes oficiais da Riot (Beaufort for LOL /
  Spiegel), que não são de uso livre. Fontes do Google Fonts são, em
  regra, distribuídas sob a licença SIL Open Font License (OFL), que
  permite uso e redistribuição, inclusive comercial. Carregadas via
  `<link>` no `<head>` de `index.html`; se o site for aberto sem
  internet, o texto cai no fallback `serif` definido em `estilo.css` —
  o layout não quebra.
- ~~react-icons 5.7.0~~ — usado na versão React/Vite anterior do
  projeto. Na versão estática atual, todos os ícones (lupa, engrenagem,
  avatar, menu/fechar, setas de carrossel) foram reescritos como SVG
  inline direto no `index.html`, sem depender de nenhum pacote de
  ícones — por isso essa biblioteca não é mais uma dependência do
  projeto.

## 5. Restrições definidas para a IA (o que ela não pode fazer)

- Não adicionar backend, autenticação real, banco de dados ou API.
- Não inventar nomes, preços, raridades, lore, URLs, licenças ou
  resultados de teste.
- Não trocar a identidade visual (paleta Hextech) sem autorização.
- Não remover a biblioteca Rellax sem justificar.
- Não afirmar que "League of Wikis" pertence à Riot Games.
- Não declarar uma revisão externa como feita sem que tenha realmente
  ocorrido.
