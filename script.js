document.addEventListener('DOMContentLoaded', () => {
    const spans = document.querySelectorAll('.idazMakina span');
    let delay = 0;

    spans.forEach((span, index) => {
        const text = span.textContent;
        span.textContent = ''; // Vaciar el contenido del span
        
        for (let i = 0; i < text.length; i++) {
            setTimeout(() => {
                span.textContent += text[i];
                if (i === text.length - 1 && index < spans.length - 1) {
                    // Ocultar el cursor del span actual al terminar de escribir
                    span.style.borderRight = '0.5vw solid transparent';
                }
            }, delay);
            delay += 50; // Ajusta este valor para cambiar la velocidad de escritura
        }

        // Mostrar el cursor solo en el span actual
        setTimeout(() => {
            span.style.borderRight = '0.5vw solid #5FBFBF';
            span.style.animation = 'blink-caret 0.75s step-end infinite';
        }, delay);
    });
});