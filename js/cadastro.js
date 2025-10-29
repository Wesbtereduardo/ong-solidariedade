// ===== MÁSCARAS DE INPUT =====

// Máscara para CPF
document.getElementById('cpf').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    }
    e.target.setAttribute('aria-invalid', e.target.checkValidity() ? 'false' : 'true');
});

// Máscara para Telefone
document.getElementById('telefone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    }
    e.target.setAttribute('aria-invalid', e.target.checkValidity() ? 'false' : 'true');
});

// Máscara para CEP
document.getElementById('cep').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 8) {
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    }
    e.target.setAttribute('aria-invalid', e.target.checkValidity() ? 'false' : 'true');
});

// ===== VALIDAÇÃO PERSONALIZADA DE CHECKBOXES =====
const checkboxes = document.querySelectorAll('input[name="areas"]');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const checkedCount = document.querySelectorAll('input[name="areas"]:checked').length;
        
        checkboxes.forEach(cb => {
            if (checkedCount > 0) {
                cb.setCustomValidity('');
            } else {
                cb.setCustomValidity('Selecione pelo menos uma área de interesse');
            }
        });
    });
});

// ===== VALIDAÇÃO E ENVIO DO FORMULÁRIO =====
const form = document.getElementById('cadastroForm');
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

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let hasError = false;
    // Campos a validar
    const fields = ['nome','email','cpf','telefone','dataNascimento','cep','cidade','estado','endereco'];
    fields.forEach(id => {
      const el = document.getElementById(id);
      if (el){
        const valid = el.checkValidity();
        el.setAttribute('aria-invalid', valid ? 'false' : 'true');
        if (!valid) hasError = true;
      }
    });

    // Pelo menos uma área
    const checkedAreas = document.querySelectorAll('input[name="areas"]:checked');
    if (checkedAreas.length === 0) {
      hasError = true;
    }

    if (hasError){
      showToast('Verifique os campos destacados.', 'error');
      // foco no primeiro inválido
      const firstInvalid = fields.map(id=>document.getElementById(id)).find(el=>el && !el.checkValidity());
      if (firstInvalid) firstInvalid.focus();
      return false;
    }

    // Salvar no localStorage
    try{
      const data = {
        nome: document.getElementById('nome').value.trim(),
        email: document.getElementById('email').value.trim(),
        cpf: document.getElementById('cpf').value.trim(),
        telefone: document.getElementById('telefone').value.trim(),
        dataNascimento: document.getElementById('dataNascimento').value,
        cep: document.getElementById('cep').value.trim(),
        cidade: document.getElementById('cidade').value.trim(),
        estado: document.getElementById('estado').value,
        endereco: document.getElementById('endereco').value.trim(),
        disponibilidade: document.getElementById('disponibilidade').value,
        areas: Array.from(document.querySelectorAll('input[name="areas"]:checked')).map(cb=>cb.value),
        habilidades: document.getElementById('habilidades').value.trim(),
        motivacao: document.getElementById('motivacao').value.trim(),
        contato: document.getElementById('contato').checked,
        termos: document.getElementById('termos').checked,
        criadoEm: new Date().toISOString()
      };
      const key = 'voluntarios';
      const prev = JSON.parse(localStorage.getItem(key) || '[]');
      prev.push(data);
      localStorage.setItem(key, JSON.stringify(prev));
    }catch(err){ console.error(err); }

    showToast('Cadastro enviado com sucesso!', 'success');
    form.reset();
});

// Limpar estado inválido ao digitar/alterar
document.querySelectorAll('#cadastroForm input, #cadastroForm select, #cadastroForm textarea').forEach(el=>{
  el.addEventListener('input', ()=>{
    el.setAttribute('aria-invalid', el.checkValidity() ? 'false' : 'true');
  });
  el.addEventListener('change', ()=>{
    el.setAttribute('aria-invalid', el.checkValidity() ? 'false' : 'true');
  });
});

// ===== EVENTO PARA BOTÃO RESET =====
document.querySelector('.reset-btn').addEventListener('click', function() {
    // Reseta as validações customizadas dos checkboxes
    checkboxes.forEach(cb => {
        cb.setCustomValidity('Selecione pelo menos uma área de interesse');
    });
    // Limpa aria-invalid
    document.querySelectorAll('#cadastroForm input, #cadastroForm select, #cadastroForm textarea').forEach(el=>{
      el.setAttribute('aria-invalid','false');
    });
});