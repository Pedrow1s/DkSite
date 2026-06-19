document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Campos do Formulário
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Validação básica
      if (!name || !email || !subject || !message) {
        showFeedback('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showFeedback('Por favor, insira um e-mail válido.', 'error');
        return;
      }

      // Simular envio de e-mail (como não há backend)
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Enviando... <span style="display:inline-block; animation: spin 1s linear infinite;">↻</span>';

      // Estilo temporário para a animação do botão
      if (!document.getElementById('spin-style')) {
        const style = document.createElement('style');
        style.id = 'spin-style';
        style.innerHTML = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
        document.head.appendChild(style);
      }

      setTimeout(() => {
        showFeedback(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve!`, 'success');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }, 1500);
    });
  }

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  function showFeedback(message, type) {
    formFeedback.textContent = message;
    formFeedback.className = 'form-feedback'; // reset
    formFeedback.classList.add(type);
    
    // Rolar até o feedback
    formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Desaparecer mensagem de erro após 5 segundos se não for sucesso
    if (type === 'error') {
      setTimeout(() => {
        formFeedback.style.display = 'none';
      }, 5000);
    }
  }
});
