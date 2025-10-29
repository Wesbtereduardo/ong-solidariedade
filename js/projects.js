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
      const res = await fetch('data/projects.json', { cache: 'no-store' });
      if(!res.ok) throw new Error('Falha ao carregar projetos');
      const items = await res.json();
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
        grid.appendChild(card);
      });
    }catch(err){
      console.error(err);
    }
  }
  document.addEventListener('DOMContentLoaded', loadProjects);
  window.__ensureProjects = loadProjects; // allow SPA to call
})();
