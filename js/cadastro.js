// Expor uma função de bind idempotente para o SPA
(function(){
  if (window.__bindCadastro) return;
  function showToast(msg, type = 'success'){
    let t = document.querySelector('.toast');
    if (!t){
      t = document.createElement('div');
      t.className = 'toast';
      t.setAttribute('role','status');
      t.setAttribute('aria-live','polite');
      t.setAttribute('aria-atomic','true');
      document.body.appendChild(t);
    }
    t.className = 'toast ' + (type === 'error' ? 'error' : 'success');
    t.textContent = msg;
    t.hidden = false;
    setTimeout(()=>{ if(t) t.hidden = true; }, 3000);
  }

  window.__bindCadastro = function(){
    const form = document.getElementById('cadastroForm');
    if (!form) return;
    if (form.dataset.bound === 'true') return; // evitar rebind
    form.dataset.bound = 'true';

    const byId = (id)=> document.getElementById(id);
    const addMask = (el, fn)=> el && el.addEventListener('input', (e)=>{
      const start = el.selectionStart || 0;
      let value = fn(el.value);
      el.value = value;
      try{ el.setSelectionRange(start, start); }catch(_){ }
      el.setAttribute('aria-invalid', el.checkValidity() ? 'false' : 'true');
    });

    const onlyDigits = (v)=> v.replace(/\D/g,'');
    // Máscaras
    addMask(byId('cpf'), (v)=>{
      let value = onlyDigits(v).slice(0,11);
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      return value;
    });
    addMask(byId('telefone'), (v)=>{
      let value = onlyDigits(v).slice(0,11);
      if (value.length <= 10){
        return value.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2');
      }
      return value.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
    });
    addMask(byId('cep'), (v)=>{
      let value = onlyDigits(v).slice(0,8);
      return value.replace(/(\d{5})(\d)/, '$1-$2');
    });

    // Checkboxes: pelo menos um
    const checkboxEls = Array.from(document.querySelectorAll('input[name="areas"]'));
    const updateCheckboxValidity = ()=>{
      const checkedCount = document.querySelectorAll('input[name="areas"]:checked').length;
      checkboxEls.forEach(cb=> cb.setCustomValidity(checkedCount > 0 ? '' : 'Selecione pelo menos uma área de interesse'));
    };
    checkboxEls.forEach(cb=> cb.addEventListener('change', updateCheckboxValidity));
    updateCheckboxValidity();

    // Submit
    form.addEventListener('submit', function(e){
      e.preventDefault();
      let hasError = false;
      const fields = ['nome','email','cpf','telefone','dataNascimento','cep','cidade','estado','endereco'];
      fields.forEach(id => {
        const el = byId(id);
        if (el){
          const valid = el.checkValidity();
          el.setAttribute('aria-invalid', valid ? 'false' : 'true');
          if (!valid) hasError = true;
        }
      });
      if (document.querySelectorAll('input[name="areas"]:checked').length === 0){ hasError = true; }
      if (hasError){
        showToast('Verifique os campos destacados.', 'error');
        const firstInvalid = fields.map(id=>byId(id)).find(el=>el && !el.checkValidity());
        if (firstInvalid) firstInvalid.focus();
        return false;
      }
      try{
        const data = {
          nome: byId('nome').value.trim(),
          email: byId('email').value.trim(),
          cpf: byId('cpf').value.trim(),
          telefone: byId('telefone').value.trim(),
          dataNascimento: byId('dataNascimento').value,
          cep: byId('cep').value.trim(),
          cidade: byId('cidade').value.trim(),
          estado: byId('estado').value,
          endereco: byId('endereco').value.trim(),
          disponibilidade: byId('disponibilidade').value,
          areas: Array.from(document.querySelectorAll('input[name="areas"]:checked')).map(cb=>cb.value),
          habilidades: byId('habilidades').value.trim(),
          motivacao: byId('motivacao').value.trim(),
          contato: byId('contato').checked,
          termos: byId('termos').checked,
          criadoEm: new Date().toISOString()
        };
        const key = 'voluntarios';
        const prev = JSON.parse(localStorage.getItem(key) || '[]');
        prev.push(data);
        localStorage.setItem(key, JSON.stringify(prev));
      }catch(err){ console.error(err); }
      showToast('Cadastro enviado com sucesso!', 'success');
      form.reset();
      // Reset validity
      document.querySelectorAll('#cadastroForm input, #cadastroForm select, #cadastroForm textarea').forEach(el=>{
        el.setAttribute('aria-invalid','false');
      });
      updateCheckboxValidity();
    });

    // Real-time validity
    document.querySelectorAll('#cadastroForm input, #cadastroForm select, #cadastroForm textarea').forEach(el=>{
      el.addEventListener('input', ()=> el.setAttribute('aria-invalid', el.checkValidity() ? 'false' : 'true'));
      el.addEventListener('change', ()=> el.setAttribute('aria-invalid', el.checkValidity() ? 'false' : 'true'));
    });

    // Reset button
    const resetBtn = document.querySelector('.reset-btn');
    if (resetBtn){
      resetBtn.addEventListener('click', function(){
        updateCheckboxValidity();
        document.querySelectorAll('#cadastroForm input, #cadastroForm select, #cadastroForm textarea').forEach(el=>{
          el.setAttribute('aria-invalid','false');
        });
      });
    }
  };
})();