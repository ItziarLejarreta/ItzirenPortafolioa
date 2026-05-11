document.addEventListener('DOMContentLoaded', () => {
  // ✍️ Máquina de escribir
  const spans = document.querySelectorAll('.idazMakina span');
  let delay = 0;

  spans.forEach((span, index) => {
    const text = span.textContent;
    span.textContent = '';

    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        span.textContent += text[i];
        if (i === text.length - 1 && index < spans.length - 1) {
          span.style.borderRight = '0.5vw solid transparent';
        }
      }, delay);
      delay += 50;
    }

    setTimeout(() => {
      span.style.borderRight = '0.5vw solid #5FBFBF';
      span.style.animation = 'blink-caret 0.75s step-end infinite';
    }, delay);
  });



  // 🌐 Idioma activo y transición
  const currentLang = window.location.href.includes('index-es.html') ? 'es' : 'eu';
  localStorage.setItem('idiomaElegido', currentLang);

  document.querySelectorAll('.hizkuntzaBotoia').forEach(button => {
    const lang = button.textContent.trim().toLowerCase();

    if (lang === currentLang) {
      button.classList.add('activeLang');
      button.disabled = true;
    }

    button.addEventListener('click', (e) => {
      e.preventDefault();
      const target = button.getAttribute('onclick').split("'")[1];
      document.body.classList.add('fade-out');

      setTimeout(() => {
        window.location.href = target;
      }, 500);
    });
  });

  // 🌟 Animación de entrada
  document.body.classList.add('fade-in');
});