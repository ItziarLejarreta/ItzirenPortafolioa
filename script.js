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

  // 🎬 Reproducción controlada del vídeo principal
  function controlVideoPrincipal() {
    const video = document.querySelector('.bideoNagusia video');
    if (!video) return;

    // Asegurar estado inicial: pausado y silenciado
    video.pause();
    video.muted = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('preload', 'metadata');

    // Reproducir y quitar mute al hacer clic
    video.closest('.bideoNagusia')?.addEventListener('click', () => {
      if (video.paused) {
        video.muted = false;
        video.play().catch(err => console.warn('Error al reproducir:', err));
      } else {
        video.pause();
        video.muted = true;
      }
    });

    // Reiniciar al terminar
    video.addEventListener('ended', () => {
      video.currentTime = 0;
      video.pause();
      video.muted = true;
    });
  }

  // 🚀 Inicialización
  maquinaDeEscribir();
  gestionIdioma();
  controlVideoPrincipal();

  document.body.classList.add('fade-in');
});
