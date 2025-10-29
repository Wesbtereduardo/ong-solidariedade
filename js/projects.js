(function(){
  async function loadProjects(){
    try{
      const section = document.querySelector('#projetos');
      if(!section) return;
      let grid = section.querySelector('#projects-grid');
      if(!grid){
        grid = document.createElement('div');
        grid.id = 'projects-grid';
        grid.className = 'projects-grid';
        section.appendChild(grid);
      } else {
        grid.innerHTML = '';
      }
      const path = 'data/projects.json';
      const baseDir = location.pathname.replace(/[^/]*$/, '');
      const parts = location.pathname.split('/').filter(Boolean);
      const repoRoot = parts.length ? `/${parts[0]}/` : '/';
      const candidates = [ path, baseDir + path, repoRoot + path ];
      let items = [];
      for (const url of candidates){
        try{
          const res = await fetch(url, { cache: 'no-store' });
          if (res.ok){
            items = await res.json();
            break;
          }
        }catch(_){ }
      }
      if (!items || !Array.isArray(items) || items.length === 0){
        // No data available: keep section without dynamic cards
        return;
      }
      items.forEach(p=>{
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
          <img src="${p.imagem}" alt="Imagem do projeto ${p.titulo}">
          <div class="project-content">
            <h3>${p.titulo}</h3>
            <p>${p.descricao}</p>
            <div class="project-meta">
              <span class="badge">${p.categoria}</span>
              <span class="tag">${p.impacto}</span>
            </div>
            <div class="tags">${(p.tags||[]).map(t=>`<span class="tag">${t}</span>`).join(' ')}</div>
          </div>`;
        // Fallback para imagens ausentes no GitHub Pages
        const img = card.querySelector('img');
        if (img){
          img.addEventListener('error', ()=>{
            const svg = encodeURIComponent(
              `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'>`+
              `<rect width='100%' height='100%' fill='#e5e7eb'/>`+
              `<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#374151' font-size='20'>Imagem não encontrada</text>`+
              `</svg>`
            );
            img.src = `data:image/svg+xml;charset=utf-8,${svg}`;
          }, { once: true });
        }
        grid.appendChild(card);
      });
    }catch(err){ /* ignore to avoid noisy console on missing data */ }
  }
  document.addEventListener('DOMContentLoaded', loadProjects);
  window.__ensureProjects = loadProjects; // allow SPA to call
})();
