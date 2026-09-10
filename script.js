/* ============================================================
   League of Wikis — script.js
   JavaScript puro (sem módulos ES, sem build) — funciona abrindo
   index.html diretamente com duplo clique, sem servidor.
   Consolida a lógica que, na versão React/Vite original, estava
   dividida em componentes (Header, ParallaxStripe, CardCarousel,
   ChampionCard, SkinCard, RarityBadge, HighlightsCarousel, Footer)
   e em src/data/*.js.
   ============================================================ */

(function () {
  'use strict';

  /* ---------------------------------------------------------
   * 1. DADOS
   *    Mesmo conteúdo de src/data/{highlights,champions,skins}.js
   *    na versão React — nada foi inventado ou alterado aqui.
   * --------------------------------------------------------- */

  function splashFull(id) {
    return 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/' + id + '_0.jpg';
  }
  function loadingFull(id) {
    return 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/' + id + '_0.jpg';
  }
  function wikiImg(file) {
    return 'https://wiki.leagueoflegends.com/en-us/images/' + file;
  }
  function ddragonSplash(champion, num) {
    return 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/' + champion + '_' + num + '.jpg';
  }

  var HIGHLIGHTS = [
    { id: 'Lux', name: 'Lux', title: 'a Dama da Luminosidade', description: 'Demaciana capaz de moldar a luz ao seu comando, cresceu escondendo seus poderes num reino que teme a magia.', image: splashFull('Lux') },
    { id: 'Xayah', name: 'Xayah', title: 'a Rebelde', description: 'Revolucionária vastaya que luta para salvar seu povo, combatendo com velocidade e lâminas de pena afiadas.', image: splashFull('Xayah') },
    { id: 'Katarina', name: 'Katarina', title: 'a Lâmina Sinistra', description: 'Assassina noxiana de elite, filha mais velha do General Du Couteau, letal com suas adagas girando pelo campo de batalha.', image: splashFull('Katarina') },
    { id: 'Akali', name: 'Akali', title: 'a Assassina Rebelde', description: 'Abandonou a Ordem Kinkou para lutar sozinha, defendendo Ionia com tudo o que aprendeu como Punho da Sombra.', image: splashFull('Akali') },
    { id: 'Soraka', name: 'Soraka', title: 'a Filha das Estrelas', description: 'Viajante celestial que abriu mão da imortalidade para proteger os mortais dos seus próprios instintos violentos.', image: splashFull('Soraka') },
    { id: 'Lulu', name: 'Lulu', title: 'a Feiticeira Feérica', description: 'Maga yordle que cria ilusões e criaturas fantásticas ao lado de sua fada companheira, Pix, moldando a realidade ao seu redor.', image: splashFull('Lulu') },
    { id: 'Hwei', name: 'Hwei', title: 'o Visionário', description: 'Pintor melancólico de Ionia que transforma visões e memórias em arte para confrontar criminosos e consolar vítimas.', image: splashFull('Hwei') },
    { id: 'Mel', name: 'Mel', title: 'o Reflexo da Alma', description: 'Herdeira presumida da Casa Medarda, uma aristocrata refinada e política habilidosa que sabe tudo sobre todos ao seu redor.', image: splashFull('Mel') },
    { id: 'Kayle', name: 'Kayle', title: 'a Justiceira', description: 'Nascida de um Aspecto de Targon, lutou ao lado da irmã gêmea Morgana como protetora de Demacia com asas de chama divina.', image: splashFull('Kayle') },
    { id: 'Jhin', name: 'Jhin', title: 'o Virtuose', description: 'Criminoso meticuloso que trata o assassinato como arte, usando sua arma como pincel em performances mortais e teatrais.', image: splashFull('Jhin') }
  ];

  var CHAMPIONS = [
    { id: 'Ahri', name: 'Ahri', image: loadingFull('Ahri') },
    { id: 'Yasuo', name: 'Yasuo', image: loadingFull('Yasuo') },
    { id: 'Zed', name: 'Zed', image: loadingFull('Zed') },
    { id: 'Vi', name: 'Vi', image: loadingFull('Vi') },
    { id: 'Jinx', name: 'Jinx', image: loadingFull('Jinx') },
    { id: 'Ezreal', name: 'Ezreal', image: loadingFull('Ezreal') },
    { id: 'Thresh', name: 'Thresh', image: loadingFull('Thresh') },
    { id: 'Leona', name: 'Leona', image: loadingFull('Leona') },
    { id: 'Darius', name: 'Darius', image: loadingFull('Darius') },
    { id: 'Garen', name: 'Garen', image: loadingFull('Garen') },
    { id: 'Ashe', name: 'Ashe', image: loadingFull('Ashe') },
    { id: 'Braum', name: 'Braum', image: loadingFull('Braum') },
    { id: 'Riven', name: 'Riven', image: loadingFull('Riven') },
    { id: 'Vayne', name: 'Vayne', image: loadingFull('Vayne') },
    { id: 'Malphite', name: 'Malphite', image: loadingFull('Malphite') },
    { id: 'Nami', name: 'Nami', image: loadingFull('Nami') },
    { id: 'Sejuani', name: 'Sejuani', image: loadingFull('Sejuani') },
    { id: 'Camille', name: 'Camille', image: loadingFull('Camille') },
    { id: 'Aphelios', name: 'Aphelios', image: loadingFull('Aphelios') },
    { id: 'XinZhao', name: 'Xin Zhao', image: loadingFull('XinZhao') }
  ];

  var RARITY = {
    COMUM: 'Comum',
    RARO: 'Raro',
    EPICO: 'Épico',
    LENDARIO: 'Lendário',
    MITICO: 'Mítico'
  };

  var SKINS = [
    { id: 'lux-elementalist', champion: 'Lux', name: 'Lux Elementalista', rarity: RARITY.MITICO, price: 3250, image: ddragonSplash('Lux', 7) },
    { id: 'ezreal-pulsefire', champion: 'Ezreal', name: 'Pulsefire Ezreal', rarity: RARITY.MITICO, price: 3250, image: ddragonSplash('Ezreal', 5) },
    { id: 'akali-starguardian', champion: 'Akali', name: 'Guardiã Estelar Akali', rarity: RARITY.LENDARIO, price: 1820, image: wikiImg('Akali_StarGuardianSkin.jpg') },
    { id: 'ashe-highnoon', champion: 'Ashe', name: 'High Noon Ashe', rarity: RARITY.EPICO, price: 1350, image: wikiImg('Ashe_HighNoonSkin.jpg') },
    { id: 'thresh-spiritblossom', champion: 'Thresh', name: 'Florescer Espiritual Thresh', rarity: RARITY.LENDARIO, price: 1820, image: wikiImg('Thresh_SpiritBlossomSkin.jpg') },
    { id: 'leona-highnoon', champion: 'Leona', name: 'High Noon Leona', rarity: RARITY.EPICO, price: 1350, image: wikiImg('Leona_HighNoonSkin.jpg') },
    { id: 'yasuo-project', champion: 'Yasuo', name: 'PROJETO: Yasuo', rarity: RARITY.EPICO, price: 1350, image: wikiImg('Yasuo_PROJECTSkin.jpg') },
    { id: 'zed-project', champion: 'Zed', name: 'PROJETO: Zed', rarity: RARITY.EPICO, price: 1350, image: wikiImg('Zed_PROJECTSkin.jpg') },
    { id: 'vi-project', champion: 'Vi', name: 'PROJETO: Vi', rarity: RARITY.EPICO, price: 1350, image: wikiImg('Vi_PROJECTSkin.jpg') },
    { id: 'katarina-highnoon', champion: 'Katarina', name: 'High Noon Katarina', rarity: RARITY.EPICO, price: 1350, image: ddragonSplash('Katarina', 37) },
    { id: 'jinx-firecracker', champion: 'Jinx', name: 'Firecracker Jinx', rarity: RARITY.EPICO, price: 1350, image: wikiImg('Jinx_FirecrackerSkin.jpg') },
    { id: 'ahri-kda', champion: 'Ahri', name: 'K/DA Ahri', rarity: RARITY.EPICO, price: 1350, image: wikiImg('Ahri_KDASkin.jpg') },
    { id: 'braum-eltigre', champion: 'Braum', name: 'El Tigre Braum', rarity: RARITY.EPICO, price: 1350, image: ddragonSplash('Braum', 2) },
    { id: 'camille-coven', champion: 'Camille', name: 'Coven Camille', rarity: RARITY.EPICO, price: 1350, image: ddragonSplash('Camille', 2) },
    { id: 'aphelios-nightbringer', champion: 'Aphelios', name: 'Nightbringer Aphelios', rarity: RARITY.EPICO, price: 1350, image: wikiImg('Aphelios_NightbringerSkin.jpg') },
    { id: 'jhin-bloodmoon', champion: 'Jhin', name: 'Blood Moon Jhin', rarity: RARITY.EPICO, price: 1350, image: wikiImg('Jhin_BloodMoonSkin.jpg') },
    { id: 'vayne-dragonslayer', champion: 'Vayne', name: 'Dragonslayer Vayne', rarity: RARITY.RARO, price: 975, image: wikiImg('Vayne_DragonslayerSkin.jpg') },
    { id: 'darius-woadking', champion: 'Darius', name: 'Woad King Darius', rarity: RARITY.RARO, price: 975, image: ddragonSplash('Darius', 3) },
    { id: 'sejuani-beasthunter', champion: 'Sejuani', name: 'Beast Hunter Sejuani', rarity: RARITY.COMUM, price: 750, image: wikiImg('Sejuani_BeastHunterSkin.jpg') },
    { id: 'garen-rugged', champion: 'Garen', name: 'Rugged Garen', rarity: RARITY.COMUM, price: 520, image: wikiImg('Garen_RuggedSkin.jpg') }
  ];

  var RARITY_CLASS = {};
  RARITY_CLASS[RARITY.COMUM] = 'rarity--comum';
  RARITY_CLASS[RARITY.RARO] = 'rarity--raro';
  RARITY_CLASS[RARITY.EPICO] = 'rarity--epico';
  RARITY_CLASS[RARITY.LENDARIO] = 'rarity--lendario';
  RARITY_CLASS[RARITY.MITICO] = 'rarity--mitico';

  /* ---------------------------------------------------------
   * 2. UTILITÁRIOS
   * --------------------------------------------------------- */

  function $(id) {
    return document.getElementById(id);
  }

  function el(tag, className) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  }

  // Rola suavemente até uma seção pelo id, compensando o header fixo.
  function scrollToSection(id) {
    var target = document.getElementById(id);
    if (!target) return;
    var headerHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
      10
    ) || 0;
    var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Anima (fade + leve deslocamento) um cabeçalho de seção quando ele
  // entra na viewport, equivalente ao hook useInView da versão React.
  function observeInView(node) {
    if (!node || typeof IntersectionObserver === 'undefined') {
      if (node) node.classList.add('is-visible');
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            node.classList.add('is-visible');
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
  }

  /* ---------------------------------------------------------
   * 3. HEADER — scroll shadow, menu mobile, avisos "Em breve",
   *    navegação e captura do campo de busca.
   * --------------------------------------------------------- */

  function initHeader() {
    var header = $('header');
    var mobileToggle = $('mobileToggle');
    var headerNav = $('headerNav');
    var iconMenu = mobileToggle.querySelector('.icon-menu');
    var iconX = mobileToggle.querySelector('.icon-x');
    var mobileOpen = false;
    var noticeTimeout = null;

    function onScroll() {
      if (window.scrollY > 12) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Nota: <svg> é um "elemento estrangeiro" (foreign element) — a
    // propriedade IDL `.hidden` só é garantida em HTMLElement, então em
    // SVGElement ela pode virar só uma propriedade JS solta, sem
    // refletir no atributo real. Por isso usamos setAttribute/
    // removeAttribute diretamente, em vez de `svg.hidden = valor`.
    function setSvgHidden(svg, isHidden) {
      if (isHidden) {
        svg.setAttribute('hidden', '');
      } else {
        svg.removeAttribute('hidden');
      }
    }

    function setMobileOpen(open) {
      mobileOpen = open;
      headerNav.classList.toggle('header__nav--open', mobileOpen);
      mobileToggle.setAttribute('aria-expanded', String(mobileOpen));
      mobileToggle.setAttribute('aria-label', mobileOpen ? 'Fechar menu' : 'Abrir menu');
      setSvgHidden(iconMenu, mobileOpen);
      setSvgHidden(iconX, !mobileOpen);
    }

    mobileToggle.addEventListener('click', function () {
      setMobileOpen(!mobileOpen);
    });

    function showNotice(noticeNode) {
      // Esconde qualquer outro aviso visível antes de mostrar este.
      document.querySelectorAll('.header__notice').forEach(function (n) {
        if (n !== noticeNode) n.hidden = true;
      });
      noticeNode.hidden = false;
      clearTimeout(noticeTimeout);
      noticeTimeout = setTimeout(function () {
        noticeNode.hidden = true;
      }, 2200);
    }

    // Marca/"Início" no topo do header também volta ao topo.
    $('brandLink').addEventListener('click', function (e) {
      e.preventDefault();
      scrollToTop();
    });

    // Itens do menu principal.
    document.querySelectorAll('.header__nav-link').forEach(function (btn) {
      var kind = btn.getAttribute('data-nav-kind');
      var notice = btn.querySelector('.header__notice');
      btn.addEventListener('click', function () {
        setMobileOpen(false);
        if (kind === 'top') {
          scrollToTop();
        } else if (kind === 'scroll') {
          scrollToSection(btn.getAttribute('data-nav-id'));
        } else {
          showNotice(notice);
        }
      });
    });

    // Ícone de Configurações e ícone de Perfil (avatar) no header.
    $('configBtn').addEventListener('click', function () {
      showNotice($('configNotice'));
    });
    $('perfilIconBtn').addEventListener('click', function () {
      showNotice($('perfilIconNotice'));
    });

    // Busca: só captura o texto digitado (dentro do escopo de
    // front-end do protótipo, sem filtragem real — RF06).
    $('searchForm').addEventListener('submit', function (e) {
      e.preventDefault();
      // A busca será conectada aos dados de campeões/skins em uma
      // próxima etapa fora do escopo deste protótipo.
    });

    // Links do rodapé são apenas ilustrativos (não navegam).
    document.querySelectorAll('[data-footer-link]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
      });
    });
  }

  /* ---------------------------------------------------------
   * 4. FAIXAS DE PARALLAX (Rellax)
   * --------------------------------------------------------- */

  function initParallax() {
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || typeof Rellax === 'undefined') return;

    document.querySelectorAll('.parallax-stripe__track').forEach(function (track) {
      var speed = parseFloat(track.getAttribute('data-rellax-speed')) || -2;
      // eslint-disable-next-line no-new
      new Rellax(track, { speed: speed, center: false, round: true });
    });
  }

  /* ---------------------------------------------------------
   * 5. CARROSSEL DE DESTAQUES (circular, com autoplay)
   * --------------------------------------------------------- */

  function initHighlights() {
    var AUTOPLAY_MS = 5500;
    var section = document.getElementById('destaques');
    var track = $('highlightsTrack');
    var dotsWrap = $('highlightsDots');
    var total = HIGHLIGHTS.length;
    var index = 0;
    var paused = false;
    var timer = null;

    observeInView($('highlightsHeader'));

    // Monta os <li> dos slides e os indicadores (dots) uma única vez;
    // a cada troca de slide só as classes/estilos são atualizados.
    var slideNodes = HIGHLIGHTS.map(function (champ) {
      var li = el('li', 'highlights__slide');
      li.setAttribute('aria-hidden', 'true');

      var img = document.createElement('img');
      img.src = champ.image;
      img.loading = 'lazy';
      img.alt = '';
      img.addEventListener('error', function () {
        img.style.display = 'none';
      });
      li.appendChild(img);

      var caption = el('div', 'highlights__caption');
      var h3 = document.createElement('h3');
      h3.textContent = champ.name + ' ';
      var span = document.createElement('span');
      span.textContent = champ.title;
      h3.appendChild(span);
      var p = document.createElement('p');
      p.textContent = champ.description;
      caption.appendChild(h3);
      caption.appendChild(p);
      caption.style.display = 'none';
      li.appendChild(caption);

      track.appendChild(li);
      return { li: li, img: img, caption: caption, champ: champ };
    });

    var dotNodes = HIGHLIGHTS.map(function (champ, i) {
      var dot = el('button', 'highlights__dot');
      dot.type = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Ir para ' + champ.name);
      dot.addEventListener('click', function () {
        goTo(i);
      });
      dotsWrap.appendChild(dot);
      return dot;
    });

    function relativePosition(i) {
      var diff = i - index;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;
      return diff;
    }

    function render() {
      slideNodes.forEach(function (node, i) {
        var pos = relativePosition(i);
        var isActive = pos === 0;
        var visible = Math.abs(pos) <= 2;
        var scale = 1 - Math.min(0.28, Math.abs(pos) * 0.14);

        node.li.style.setProperty('--pos', pos);
        node.li.style.setProperty('--scale', scale);
        node.li.style.opacity = visible ? String(1 - Math.abs(pos) * 0.35) : '0';
        node.li.style.pointerEvents = isActive ? 'auto' : 'none';
        node.li.style.zIndex = String(10 - Math.abs(pos));
        node.li.classList.toggle('is-active', isActive);
        node.li.setAttribute('aria-hidden', String(!isActive));

        node.img.loading = isActive ? 'eager' : 'lazy';
        node.img.alt = isActive ? node.champ.name + ', ' + node.champ.title : '';
        node.caption.style.display = isActive ? '' : 'none';
      });

      dotNodes.forEach(function (dot, i) {
        var isActive = i === index;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-selected', String(isActive));
      });
    }

    function goTo(i) {
      index = ((i % total) + total) % total;
      render();
    }
    function next() {
      goTo(index + 1);
    }
    function prev() {
      goTo(index - 1);
    }

    function startAutoplay() {
      clearInterval(timer);
      if (paused) return;
      timer = setInterval(next, AUTOPLAY_MS);
    }

    section.addEventListener('mouseenter', function () { paused = true; startAutoplay(); });
    section.addEventListener('mouseleave', function () { paused = false; startAutoplay(); });
    section.addEventListener('focusin', function () { paused = true; startAutoplay(); });
    section.addEventListener('focusout', function () { paused = false; startAutoplay(); });

    section.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      }
    });

    $('highlightsPrev').addEventListener('click', prev);
    $('highlightsNext').addEventListener('click', next);

    render();
    startAutoplay();
  }

  /* ---------------------------------------------------------
   * 6. CARROSSEL GENÉRICO (Campeões / Skins)
   *    Rolagem horizontal nativa com scroll-snap + setas + teclado.
   * --------------------------------------------------------- */

  function initCardCarousel(opts) {
    // opts: { headerId, trackId, prevId, nextId, title, items, renderItem }
    var header = $(opts.headerId);
    var track = $(opts.trackId);
    var prevBtn = $(opts.prevId);
    var nextBtn = $(opts.nextId);

    observeInView(header);

    opts.items.forEach(function (item) {
      track.appendChild(opts.renderItem(item));
    });

    function updateEdges() {
      prevBtn.disabled = track.scrollLeft <= 8;
      nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
    }

    function scrollByPage(dir) {
      track.scrollBy({ left: dir * track.clientWidth * 0.85, behavior: 'smooth' });
    }

    track.addEventListener('scroll', updateEdges, { passive: true });
    window.addEventListener('resize', updateEdges);

    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollByPage(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollByPage(-1);
      }
    });

    prevBtn.addEventListener('click', function () { scrollByPage(-1); });
    nextBtn.addEventListener('click', function () { scrollByPage(1); });

    updateEdges();
  }

  function renderChampionCard(champ) {
    var li = el('li', 'champion-card');
    var frame = el('div', 'champion-card__frame');

    var img = document.createElement('img');
    img.src = champ.image;
    img.alt = champ.name;
    img.loading = 'lazy';
    img.addEventListener('error', function () {
      frame.innerHTML = '';
      var fallback = el('div', 'champion-card__fallback');
      fallback.setAttribute('aria-hidden', 'true');
      fallback.textContent = champ.name.slice(0, 2).toUpperCase();
      frame.appendChild(fallback);
    });
    frame.appendChild(img);

    var name = el('span', 'champion-card__name');
    name.textContent = champ.name;

    li.appendChild(frame);
    li.appendChild(name);
    return li;
  }

  function renderSkinCard(skin) {
    var li = el('li', 'skin-card');
    var frame = el('div', 'skin-card__frame');

    function addFallback() {
      frame.innerHTML = '';
      var fallback = el('div', 'skin-card__fallback');
      fallback.setAttribute('aria-hidden', 'true');
      var span = document.createElement('span');
      span.textContent = skin.champion;
      fallback.appendChild(span);
      frame.appendChild(fallback);
      frame.appendChild(rarityWrap);
    }

    var rarityWrap = el('div', 'skin-card__rarity');
    var badge = el('span', 'rarity-badge ' + (RARITY_CLASS[skin.rarity] || ''));
    badge.textContent = skin.rarity;
    rarityWrap.appendChild(badge);

    if (skin.image) {
      var img = document.createElement('img');
      img.src = skin.image;
      img.alt = skin.name + ' (' + skin.champion + ')';
      img.loading = 'lazy';
      img.addEventListener('error', addFallback);
      frame.appendChild(img);
      frame.appendChild(rarityWrap);
    } else {
      addFallback();
    }

    var info = el('div', 'skin-card__info');
    var champEl = el('p', 'skin-card__champion');
    champEl.textContent = skin.champion;
    var nameEl = el('h3', 'skin-card__name');
    nameEl.textContent = skin.name;
    var priceEl = el('p', 'skin-card__price');
    var diamond = document.createElement('span');
    diamond.setAttribute('aria-hidden', 'true');
    diamond.textContent = '◈';
    priceEl.appendChild(diamond);
    priceEl.appendChild(document.createTextNode(' ' + skin.price.toLocaleString('pt-BR') + ' RP'));

    info.appendChild(champEl);
    info.appendChild(nameEl);
    info.appendChild(priceEl);

    li.appendChild(frame);
    li.appendChild(info);
    return li;
  }

  /* ---------------------------------------------------------
   * 7. RODAPÉ — ano do copyright dinâmico
   * --------------------------------------------------------- */

  function initFooter() {
    $('footerYear').textContent = String(new Date().getFullYear());
  }

  /* ---------------------------------------------------------
   * 8. INICIALIZAÇÃO
   * --------------------------------------------------------- */

  document.addEventListener('DOMContentLoaded', function () {
    initHeader();
    initParallax();
    initHighlights();

    initCardCarousel({
      headerId: 'championsHeader',
      trackId: 'championsTrack',
      prevId: 'championsPrev',
      nextId: 'championsNext',
      title: 'Campeões',
      items: CHAMPIONS,
      renderItem: renderChampionCard
    });

    initCardCarousel({
      headerId: 'skinsHeader',
      trackId: 'skinsTrack',
      prevId: 'skinsPrev',
      nextId: 'skinsNext',
      title: 'Skins',
      items: SKINS,
      renderItem: renderSkinCard
    });

    initFooter();
  });
})();
