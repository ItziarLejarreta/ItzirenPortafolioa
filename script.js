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
                // Quita el cursor intermitente cuando termina la palabra, excepto en la última
                if (i === text.length - 1 && index < spans.length - 1) {
                    span.style.borderRight = '0.5vw solid transparent';
                }
            }, delay);
            delay += 50;
        }
        // Aplica el cursor intermitente al terminar la última palabra
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

    // 🖱️ Efecto centrado al hacer hover en los iframes (Refactorizado para mejor estabilidad)
    document.querySelectorAll('.atalIframe').forEach(iframe => {
        // Almacenar el padre original de forma segura
        const originalParent = iframe.parentElement; 
        const eduki = document.querySelector('.edukiKontainer');

        iframe.addEventListener('mouseenter', () => {
            if (iframe.classList.contains('centrado')) return;
            
            // Mover al contenedor superior para centrar
            eduki.appendChild(iframe);
            originalParent.classList.add('desactivado');
            iframe.classList.add('centrado');
        });

        iframe.addEventListener('mouseleave', () => {
            if (originalParent) {
                // Regresar al padre original
                originalParent.appendChild(iframe);
                iframe.classList.remove('centrado');
                originalParent.classList.remove('desactivado');
            }
        });
    });

    // 🌐 Idioma activo y transición
    // Determina el idioma basándose en 'index-es.html' o 'index.html' (por defecto Euskera 'eu')
    const currentLang = window.location.href.includes('index-es.html') ? 'es' : 'eu';
    localStorage.setItem('idiomaElegido', currentLang);

    document.querySelectorAll('.hizkuntzaBotoia').forEach(button => {
        const lang = button.textContent.trim().toLowerCase();
        
        // Desactivar el botón del idioma actual
        if (lang === currentLang) {
            button.classList.add('activeLang');
            button.disabled = true;
        }

        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Priorizar data-target, si no existe, usar el antiguo onclick
            const target = button.getAttribute('data-target') || 
                           (button.getAttribute('onclick')?.split("'")[1]); 
            
            if (!target) return; // Salir si no hay URL de destino

            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = target;
            }, 500);
        });
    });

    // 🎬 Control de reproducción del vídeo principal
    const videoContainer = document.querySelector('.bideoNagusia');
    // Asegurarse de que el elemento 'video' existe
    if (videoContainer) {
        const video = videoContainer.querySelector('video');
    
        videoContainer.addEventListener('click', () => {
            if (video && video.paused) {
                video.play();
            }
        });

        // Asegurar loop manual (ya que loop en HTML puede tener problemas en algunos navegadores)
        if (video) {
            video.addEventListener('ended', () => {
                video.currentTime = 0;
                video.pause();
                // Opcional: Si quieres que empiece a reproducirse de nuevo sin clic, usa video.play()
            });
        }
    }

    // Animación de entrada
    document.body.classList.add('fade-in');

    
});