document.addEventListener('DOMContentLoaded', () => {
  // ✍️ Máquina de escribir
  function maquinaDeEscribir() {
    const spans = document.querySelectorAll('.idazMakina span');
    if (!spans.length) return;

    let totalDelay = 0;

    spans.forEach((span, index) => {
      const text = span.textContent;
      span.textContent = '';
      let charDelay = 0;

      for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
          span.textContent += text[i];
        }, totalDelay + charDelay);
        charDelay += 50;
      }

      setTimeout(() => {
        span.style.animation = 'blink-caret 0.75s step-end infinite';
        if (index === spans.length - 1) {
          span.style.borderRight = '0.5vw solid #5FBFBF';
          span.style.animationPlayState = 'running';
        }
      }, totalDelay + charDelay);

      totalDelay += charDelay;
    });
  }

  // 🌐 Gestión de idioma y transición
  function gestionIdioma() {
    const currentPath = window.location.pathname.includes('index-es.html') ? 'es' : 'eu';
    localStorage.setItem('idiomaElegido', currentPath);

    document.querySelectorAll('.hizkuntzaBotoia').forEach(button => {
      const lang = button.textContent.trim().toLowerCase();
      if (lang === currentPath) {
        button.classList.add('activeLang');
        button.disabled = true;
      }

      button.addEventListener('click', e => {
        e.preventDefault();
        const targetUrl = lang === 'es' ? 'index-es.html' : 'index.html';
        document.body.classList.add('fade-out');
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 500);
      });
    });
  }

  // 🎥 Reproducción automática del vídeo de fondo
  function controlVideoFondo() {
    const video = document.querySelector('.backgroundBideoa video');
    if (!video) return;

    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');
    video.setAttribute('playsinline', '');

    video.muted = true;
    video.play().catch(err => console.warn('Autoplay bloqueado en fondo:', err));
  }

  // 🎬 Reproducción controlada del vídeo principal
  function controlVideoPrincipal() {
    const video = document.getElementById('bideoNagusiaVideo');
    if (!video) return;

    video.pause();
    video.muted = true;

    video.closest('.bideoNagusia')?.addEventListener('click', () => {
      if (video.paused) {
        video.muted = false;
        video.play();
      } else {
        video.pause();
        video.muted = true;
      }
    });
  }

  // 🚀 Inicialización
  maquinaDeEscribir();
  gestionIdioma();
  controlVideoPrincipal();
  controlVideoFondo();

  document.body.classList.add('fade-in');
});
