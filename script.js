<script>
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

  // 🎞️ Animación de entrada para los vídeos
  const iframes = document.querySelectorAll('.atalIframe');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  iframes.forEach(iframe => {
    observer.observe(iframe);
  });

  // 🖱️ Efecto centrado al hacer hover en los iframes
  document.querySelectorAll('.atalIframe').forEach(iframe => {
    let originalParent = null;

    iframe.addEventListener('mouseenter', () => {
      if (iframe.classList.contains('centrado')) return;
      originalParent = iframe.parentElement;
      originalParent.classList.add('desactivado');

      const eduki = document.querySelector('.edukiKontainer');
      eduki.appendChild(iframe);
      iframe.classList.add('centrado');
    });

    iframe.addEventListener('mouseleave', () => {
      if (originalParent) {
        originalParent.appendChild(iframe);
        iframe.classList.remove('centrado');
        originalParent.classList.remove('desactivado');
      }
    });
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
</script>
