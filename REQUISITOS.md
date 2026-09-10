# REQUISITOS.md — League of Wikis

Requisitos levantados a partir do prompt original do projeto League of Wikis
e dos requisitos acadêmicos da Aula 02 (DEE 339). Nenhum requisito abaixo
foi inventado além do que já estava pedido nesses dois materiais.

## Requisitos funcionais (o que o site FAZ)

| # | Requisito |
|---|---|
| RF01 | O item "Início" do menu leva ao topo da página. |
| RF02 | O item "Campeões" do menu rola suavemente até a seção de campeões. |
| RF03 | O item "Skins" do menu rola suavemente até a seção de skins. |
| RF04 | Os itens "Runas" e "Habilidades" exibem um comportamento de protótipo (aviso "Em breve") ao serem clicados. |
| RF05 | O ícone de "Perfil" e o ícone de "Configurações" exibem um comportamento de protótipo ao serem clicados. |
| RF06 | Existe um campo de busca que captura o texto digitado, dentro do escopo de front-end do protótipo. |
| RF07 | O carrossel de Destaques exibe os 10 campeões fixos: Lux, Xayah, Katarina, Akali, Soraka, Lulu, Hwei, Mel, Kayle, Jhin. |
| RF08 | Cada slide de destaque exibe imagem, nome e uma descrição curta do campeão. |
| RF09 | O carrossel de Destaques avança automaticamente (autoplay). |
| RF10 | O autoplay do carrossel de Destaques pausa ao passar o mouse ou ao focar via teclado. |
| RF11 | O carrossel de Destaques permite navegação manual (botões anterior/próximo e indicadores). |
| RF12 | A seção Campeões exibe 20 campeões reais de League of Legends, cada um com imagem e nome. |
| RF13 | A seção Campeões permite navegação horizontal (botões anterior/próximo e arrastar/rolar). |
| RF14 | A seção Skins exibe 20 skins, cada uma com imagem, campeão, nome, raridade e valor em RP. |
| RF15 | A raridade de cada skin é exibida com tratamento visual distinto por nível (Comum, Raro, Épico, Lendário, Mítico). |
| RF16 | O rodapé exibe o nome "League of Wikis", grupos de links institucionais, redes sociais, seletor de idioma e disclaimer de copyright. |
| RF17 | As faixas laterais de parallax exibem o texto "LEAGUE OF WIKIS" repetido, em movimento contínuo via Rellax. |
| RF18 | Imagens de campeões e skins exibem um fallback visual caso a imagem original falhe ao carregar. |

## Requisitos não funcionais (COMO o site faz)

| # | Requisito | Status |
|---|---|---|
| RNF01 | O site funciona localmente, abrindo `index.html` diretamente no navegador, sem necessidade de servidor. | **Atendido.** O projeto foi reescrito em HTML/CSS/JS puro (sem build, sem módulos ES) especificamente para cumprir este item — ver `DOCUMENTACAO.md` item 2 e `PROMPTS.md` para o histórico da migração. |
| RNF02 | O site é composto por HTML, CSS e JavaScript, mais a biblioteca Rellax como efeito visual — sem backend, autenticação real ou banco de dados. | Atendido. |
| RNF03 | O site é exibido em uma única rolagem (scroll único), sem navegação para outros endereços. | Atendido. |
| RNF04 | O layout se adapta a telas de desktop, notebook, tablet e smartphone, com atenção especial a telas de ~360px de largura. | Atendido. |
| RNF05 | O site segue boas práticas básicas de acessibilidade: HTML semântico, texto alternativo em imagens, foco visível, navegação por teclado, `aria-label` onde necessário, contraste adequado. | Atendido. |
| RNF06 | O site não apresenta erros críticos no console do navegador. | Atendido nos testes automatizados (zero exceções JavaScript abrindo via `file://`); teste manual do usuário em navegador real ainda recomendado (ver `PROMPTS.md`, item 8). |
| RNF07 | As faixas de parallax respeitam a preferência do sistema por redução de movimento (`prefers-reduced-motion`). | Atendido. |
| RNF08 | O site mantém a paleta Hextech definida: Azul profundo `#091428`, Azul-esverdeado escuro `#0A323C`, Ciano Hextech `#0AC8B9`, Ouro Hextech `#C8AA6E`, Ouro pálido `#F0E6D2`, Azul mágico `#005A82`. | Atendido. |
| RNF09 | O código é organizado, separando estrutura (HTML), estilo (CSS) e comportamento (JavaScript), evitando duplicação e arquivos gigantescos. | Atendido — um arquivo por responsabilidade (`index.html` / `estilo.css` / `script.js`), cada um internamente dividido em seções comentadas. |
| RNF10 | O uso da biblioteca de efeito (Rellax) está documentado, incluindo a versão exata utilizada. | Atendido. |

**Todos os 10 requisitos não funcionais estão atendidos nesta versão.**
Isso é uma mudança em relação à versão React/Vite anterior do projeto,
que descumpria RNF01 (não abria sem servidor) — ver `PROMPTS.md` para o
histórico completo dessa decisão.
