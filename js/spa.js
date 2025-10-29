(function(){
  // Helpers available in both modes
  function currentPage(){
    // robust for file:// and http(s)
    const path = (location.pathname || '').split('/').pop() || 'index.html';
    return path;
  }

  function ensureCadastroStyles(){
    const form = document.getElementById('cadastroForm');
    if (!form) return;
    const href = 'css/cadastro.css';
    const exists = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .some(l => (l.getAttribute('href')||'').includes(href));
    if (!exists){
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href + '?ts=' + Date.now();
      document.head.appendChild(link);
    }
  }
  function setActiveNavByPathname(p){
    const links = document.querySelectorAll('nav a[href$=".html"]');
    links.forEach(a=>{
      const hrefFile = (a.getAttribute('href')||'').split('/').pop();
      a.classList.toggle('active', hrefFile === p);
    });
  }
  function routeFromFile(file){
    if (file.includes('projetos.html')) return '#/projetos';
    if (file.includes('cadastro.html')) return '#/cadastro';
    return '#/home';
  }
  function fileFromRoute(route){
    if ((route||'').startsWith('#/projetos')) return 'projetos.html';
    if ((route||'').startsWith('#/cadastro')) return 'cadastro.html';
    return 'index.html';
  }
  function setActiveByRoute(route){
    setActiveNavByPathname(fileFromRoute(route));
  }
  function bindMenu(){
    const nav = document.querySelector('nav[aria-label="Principal"]');
    const navToggle = document.getElementById('nav-toggle');
    const navBtn = document.querySelector('label.nav-btn');
    if (nav && navToggle){
      // Initialize state
      nav.classList.toggle('nav-open', !!navToggle.checked);
      if (navBtn){ navBtn.setAttribute('aria-expanded', String(!!navToggle.checked)); }
      // Rebind change
      navToggle.onchange = ()=>{
        const open = !!navToggle.checked;
        nav.classList.toggle('nav-open', open);
        if (navBtn){ navBtn.setAttribute('aria-expanded', String(open)); }
      };
      // Ensure label click toggles reliably
      if (navBtn){
        navBtn.onclick = (e)=>{
          e.preventDefault();
          navToggle.checked = !navToggle.checked;
          const open = !!navToggle.checked;
          nav.classList.toggle('nav-open', open);
          navBtn.setAttribute('aria-expanded', String(open));
        };
        // Keyboard activation (Enter/Space)
        navBtn.onkeydown = (e)=>{
          if (e.key === 'Enter' || e.key === ' '){
            e.preventDefault();
            navBtn.click();
          }
        };
      }
    }
    bindSubmenuKeyboard();
    bindThemeToggle();
    // Close menu on any internal link click
    document.querySelectorAll('nav a').forEach(a=>{
      a.addEventListener('click', ()=>{
        const navT = document.getElementById('nav-toggle');
        const n = document.querySelector('nav[aria-label="Principal"]');
        if (navT){ navT.checked = false; }
        if (n){ n.classList.remove('nav-open'); }
      });
    });
    // Set active link on initial load (both modes)
    setActiveNavByPathname(currentPage());
    // Bind skip link to focus main content
    const skip = document.querySelector('.skip-link');
    if (skip){
      skip.addEventListener('click', (e)=>{
        const main = document.getElementById('conteudo');
        // allow default scroll then focus
        setTimeout(()=>{ if (main) main.focus(); }, 0);
      });
    }
  }

  function bindSubmenuKeyboard(){
    const parent = document.querySelector('.has-submenu');
    if (!parent) return;
    const trigger = parent.querySelector('a');
    const submenu = parent.querySelector('.submenu');
    if (!trigger || !submenu) return;
    trigger.setAttribute('aria-haspopup','true');
    trigger.setAttribute('aria-expanded','false');
    const links = Array.from(submenu.querySelectorAll('a'));
    trigger.addEventListener('keydown', (e)=>{
      if (e.key === 'ArrowDown'){
        e.preventDefault();
        trigger.setAttribute('aria-expanded','true');
        links[0]?.focus();
      }
    });
    submenu.addEventListener('keydown', (e)=>{
      const i = links.indexOf(document.activeElement);
      if (e.key === 'ArrowDown'){
        e.preventDefault();
        links[(i+1) % links.length]?.focus();
      } else if (e.key === 'ArrowUp'){
        e.preventDefault();
        links[(i-1+links.length) % links.length]?.focus();
      } else if (e.key === 'Escape'){
        e.preventDefault();
        trigger.setAttribute('aria-expanded','false');
        trigger.focus();
      }
    });
  }

  function applyTheme(theme){
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const btn = document.querySelector('.theme-toggle');
    if (btn){
      btn.setAttribute('aria-pressed', theme !== 'light');
      btn.textContent = theme === 'dark' ? '🌙 Escuro' : (theme === 'contrast' ? '⬛ Alto Contraste' : '☀️ Claro');
    }
  }
  function bindThemeToggle(){
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    // initialize from storage once
    const stored = localStorage.getItem('theme') || 'light';
    applyTheme(stored);
    btn.onclick = ()=>{
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : (current === 'dark' ? 'contrast' : 'light');
      applyTheme(next);
    };
  }
  const SPA_ENABLED = location.protocol !== 'file:';
  // If opened directly from filesystem, don't intercept navigation (fetch won't work).
  if (!SPA_ENABLED){
    // Still close the mobile menu when clicking any nav link
    bindMenu();
    document.addEventListener('click', (e)=>{
      const a = e.target.closest('a');
      if (!a) return;
      if (a.getAttribute('href')){
        const navToggle = document.getElementById('nav-toggle');
        if (navToggle) navToggle.checked = false;
        // Update active on next tick (after navigation)
        setTimeout(()=> setActiveNavByPathname(currentPage()), 0);
      }
    });
    return;
  }
  const isInternalLink = (a) => a && a.href && a.origin === location.origin;
  const getPath = (url) => new URL(url, location.origin).pathname.replace(/^\//,'');

  async function fetchPage(path){
    const baseDir = location.pathname.replace(/[^/]*$/, ''); // e.g., '/projeto-git/'
    const parts = location.pathname.split('/').filter(Boolean);
    const repoRoot = parts.length ? `/${parts[0]}/` : '/';
    const candidates = [
      path,
      baseDir + path,
      repoRoot + path
    ];
    for (const url of candidates){
      try{
        const res = await fetch(url, { cache: 'no-store' });
        if (res.ok){
          const html = await res.text();
          return new DOMParser().parseFromString(html, 'text/html');
        }
      }catch(_){}
    }
    throw new Error(`Failed to load ${path}`);
  }

  function swapContent(doc){
    // Swap hero/banner image placed between header and main
    const curHero = document.querySelector('header + img');
    const newHero = doc.querySelector('header + img');
    if (curHero && newHero){
      curHero.replaceWith(newHero);
    }

    const newMain = doc.querySelector('main');
    const curMain = document.querySelector('main');
    if (newMain && curMain){
      curMain.innerHTML = newMain.innerHTML;
    }
    // Update title
    if (doc.title) document.title = doc.title;

    // Close mobile menu if open
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) navToggle.checked = false;

    // Rebind hamburger behavior after content swap
    bindMenu();

    // If cadastro form is present, ensure page-specific CSS and (re)bind its scripts
    ensureCadastroStyles();
    ensureCadastroBindings();

    // Do not use location.hash here because hash may be a route like '#/projetos'
    // Scrolling to anchors is handled in navigateTo using the explicit 'hash' argument
  }

  function ensureCadastroBindings(){
    const form = document.getElementById('cadastroForm');
    if (!form) return;
    // If binder is available, just bind to current DOM
    if (typeof window.__bindCadastro === 'function'){
      window.__bindCadastro();
      return;
    }
    // Otherwise, load the script once, then bind
    const alreadyLoaded = Array.from(document.scripts).some(s=> (s.src||'').includes('js/cadastro.js'));
    if (!alreadyLoaded){
      const s = document.createElement('script');
      s.src = 'js/cadastro.js?ts=' + Date.now();
      s.defer = true;
      s.onload = ()=>{ if (typeof window.__bindCadastro === 'function') window.__bindCadastro(); };
      document.body.appendChild(s);
    } else {
      // If loaded but binder missing, attempt to load fresh
      const s = document.createElement('script');
      s.src = 'js/cadastro.js?ts=' + Date.now();
      s.defer = true;
      s.onload = ()=>{ if (typeof window.__bindCadastro === 'function') window.__bindCadastro(); };
      document.body.appendChild(s);
    }
  }

  function setActiveNav(path){
    // path is like 'projetos.html'
    setActiveNavByPathname(path);
  }

  async function navigateTo(path, push=true, hash=''){
    try{
      const doc = await fetchPage(path);
      swapContent(doc);
      // update active state
      // If we're using hash routing, mark active by route; otherwise by path
      if (location.hash && location.hash.startsWith('#/')){
        setActiveByRoute(location.hash);
      } else {
        setActiveNav(path);
      }
      // Do not change the pathname (avoid 404 on GitHub Pages). Hash controls history.
      if (hash && !hash.startsWith('#/')){
        const target = document.querySelector(hash);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    } catch(err){
      console.error(err);
    }
  }

  function onClick(e){
    const a = e.target.closest('a');
    if (!a) return;
    if (!isInternalLink(a)) return;
    const path = getPath(a.href);
    const hash = a.hash || '';
    // Allow hash-only navigation on same page
    if (a.hash && getPath(location.href) === path){
      // close mobile menu
      const navToggle = document.getElementById('nav-toggle');
      if (navToggle) navToggle.checked = false;
      return; // default behavior for same-page anchors
    }
    // Intercept .html internal links: switch to hash routing to avoid 404 on GitHub Pages
    if (path.endsWith('.html')){
      e.preventDefault();
      const file = path.split('/').pop();
      const route = routeFromFile(file);
      // Update hash (this triggers hashchange handler)
      const newHash = route + (hash || '');
      if (location.hash !== newHash) location.hash = newHash; else {
        // If already same hash, manually navigate to refresh content
        navigateTo(fileFromRoute(route), false, hash);
      }
      return;
    }
  }

  // Hash-based routing to avoid server 404s on GitHub Pages
  function handleHashRoute(){
    const full = location.hash || '#/home';
    // route is like '#/home', '#/projetos', '#/cadastro'
    const matchRoute = full.match(/^#\/[A-Za-z0-9_-]+/);
    const route = matchRoute ? matchRoute[0] : '#/home';
    // optional anchor after the route, e.g., '#/projetos#doar'
    let anchor = '';
    const idx = full.indexOf('#', 2); // next '#'
    if (idx !== -1){ anchor = full.slice(idx); }
    const file = fileFromRoute(route);
    setActiveByRoute(route);
    navigateTo(file, false, anchor);
  }
  window.addEventListener('hashchange', handleHashRoute);

  document.addEventListener('click', onClick);
  // Initial bind on first load
  bindMenu();
  // On first load, if there is a hash route, load it; else mark active based on current file
  if (location.hash && location.hash.startsWith('#/')){
    handleHashRoute();
  } else {
    setActiveNavByPathname(currentPage());
  }
})();

function ensureProjectsBindings(){}
