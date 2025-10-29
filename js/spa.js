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
  function bindMenu(){
    const nav = document.querySelector('nav[aria-label="Principal"]');
    const navToggle = document.getElementById('nav-toggle');
    const navBtn = document.querySelector('label.nav-btn');
    if (nav && navToggle){
      // Initialize state
      nav.classList.toggle('nav-open', !!navToggle.checked);
      // Rebind change
      navToggle.onchange = ()=>{
        nav.classList.toggle('nav-open', !!navToggle.checked);
      };
      // Ensure label click toggles reliably
      if (navBtn){
        navBtn.onclick = (e)=>{
          e.preventDefault();
          navToggle.checked = !navToggle.checked;
          nav.classList.toggle('nav-open', !!navToggle.checked);
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
    const res = await fetch(path, { cache: 'no-store' });
    if(!res.ok) throw new Error(`Failed to load ${path}`);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc;
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
    ensureProjectsBindings();

    // Handle in-page anchors after swap (if any hash present)
    if (location.hash){
      const target = document.querySelector(location.hash);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function ensureCadastroBindings(){
    const form = document.getElementById('cadastroForm');
    if (!form) return;
    // Dynamically reload cadastro.js to bind listeners to fresh DOM
    const existing = Array.from(document.scripts).find(s=>s.src.includes('js/cadastro.js'));
    if (existing){
      const clone = document.createElement('script');
      clone.src = 'js/cadastro.js?ts=' + Date.now();
      clone.defer = true;
      document.body.appendChild(clone);
    } else {
      const s = document.createElement('script');
      s.src = 'js/cadastro.js?ts=' + Date.now();
      s.defer = true;
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
      setActiveNav(path);
      // update URL and then scroll to hash if provided
      const newUrl = '/' + path + (hash || '');
      if (push) history.pushState({ path, hash }, '', newUrl);
      if (hash){
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
    // Intercept .html internal links
    if (path.endsWith('.html')){
      e.preventDefault();
      navigateTo(path, true, hash);
    }
  }

  window.addEventListener('popstate', (e)=>{
    const path = (e.state && e.state.path) || getPath(location.href);
    const hash = (e.state && e.state.hash) || location.hash || '';
    if (path.endsWith('.html')) navigateTo(path, false, hash);
  });

  document.addEventListener('click', onClick);
  // Initial bind on first load
  bindMenu();
  ensureProjectsBindings();
})();

function ensureProjectsBindings(){
  try{
    if (typeof window.__ensureProjects === 'function'){
      window.__ensureProjects();
      return;
    }
    const alreadyLoaded = Array.from(document.scripts).some(s=> (s.src||'').includes('js/projects.js'));
    if (!alreadyLoaded){
      const s = document.createElement('script');
      s.src = 'js/projects.js?ts=' + Date.now();
      s.defer = true;
      s.onload = function(){
        if (typeof window.__ensureProjects === 'function'){
          window.__ensureProjects();
        }
      };
      document.body.appendChild(s);
    }
  }catch(e){
    console.error(e);
  }
}
