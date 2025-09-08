document.addEventListener('DOMContentLoaded', () => {

    // ✍️ Máquina de escribir
    function maquinaDeEscribir() {
        const spans = document.querySelectorAll('.idazMakina span');
        if (spans.length === 0) return; // Salir si no hay elementos

        let totalDelay = 0;

        spans.forEach((span, index) => {
            const text = span.textContent;
            span.textContent = ''; // Limpiar el texto inicial
            let charDelay = 0;

            for (let i = 0; i < text.length; i++) {
                setTimeout(() => {
                    span.textContent += text[i];
                    // El cursor se maneja en el CSS, por lo que esta lógica no es necesaria aquí.
                }, totalDelay + charDelay);
                charDelay += 50;
            }

            // Aplica el cursor intermitente al terminar cada span
            // Y quita la animación una vez que todos los spans han terminado
            setTimeout(() => {
                span.style.animation = 'blink-caret 0.75s step-end infinite';

                if (index === spans.length - 1) {
                    // Si es el último span, deja el cursor al final
                    span.style.borderRight = '0.5vw solid #5FBFBF';
                    span.style.animationPlayState = 'running';
                }
            }, totalDelay + charDelay);
            
            totalDelay += charDelay;
        });
    }

    // 🎞️ Animación de entrada para los vídeos
    function animacionVideos() {
        const iframes = document.querySelectorAll('.atalIframe');
        if (iframes.length === 0) return;

        const observer = new IntersectionObserver((entries, observer) => {
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
    }

    // 🖱️ Efecto centrado al hacer hover en los iframes (Refactorizado)
    function efectoHoverIframes() {
        const atalIframes = document.querySelectorAll('.atalIframe');
        const eduki = document.querySelector('.edukiKontainer');
        if (atalIframes.length === 0 || !eduki) return;

        atalIframes.forEach(iframe => {
            const originalParent = iframe.parentElement;

            iframe.addEventListener('mouseenter', () => {
                if (iframe.classList.contains('centrado')) return;
                
                originalParent.classList.add('desactivado');
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
    }

    // 🌐 Idioma activo y transición
    function gestionIdioma() {
        const currentPath = window.location.pathname.includes('index-es.html') ? 'es' : 'eu';
        localStorage.setItem('idiomaElegido', currentPath);

        document.querySelectorAll('.hizkuntzaBotoia').forEach(button => {
            const lang = button.textContent.trim().toLowerCase();
            if (lang === currentPath) {
                button.classList.add('activeLang');
                button.disabled = true;
            }

            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetUrl = (lang === 'es' ? 'index-es.html' : 'index.html');
                
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 500);
            });
        });
    }

    // 🎬 Control de reproducción del vídeo principal
    function controlVideoPrincipal() {
        const videoContainer = document.querySelector('.bideoNagusia');
        if (!videoContainer) return;
        const video = videoContainer.querySelector('video');

        videoContainer.addEventListener('click', () => {
            if (video && video.paused) {
                video.play();
            }
        });

        if (video) {
            video.addEventListener('ended', () => {
                video.currentTime = 0;
                video.pause();
            });
        }
    }

    // Llamadas a las funciones
    maquinaDeEscribir();
    animacionVideos();
    efectoHoverIframes();
    gestionIdioma();
    controlVideoPrincipal();

    // Animación de entrada
    document.body.classList.add('fade-in');
});