document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript cargado correctamente.');

    // Verifica si Lightbox está disponible
    if (typeof lightbox !== 'undefined') {
        // Inicializa Lightbox
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true
        });

        // Asegúrate de que todos los videos estén silenciados
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.muted = true;
        });

        // Ejemplo: Pausar todos los videos cuando se cierra el Lightbox
        lightbox.on('close', function() {
            videos.forEach(video => video.pause());
        });
    } else {
        console.error('Lightbox no está definido');
    }
    // Animación de escritura manual
    const text = document.querySelector('.text');
    const characters = text.textContent.split('');
    text.innerHTML = '';
    
    characters.forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'hidden';
        text.appendChild(span);

        setTimeout(() => {
            span.classList.remove('hidden');
        }, i * 100); // Ajusta la duración aquí (100ms por letra)
    });
});