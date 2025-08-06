document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO CARROSSEL ---
    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next-arrow');
        const prevButton = document.querySelector('.prev-arrow');
        
        let slideWidth = slides.length > 0 ? slides[0].getBoundingClientRect().width : 0;
        let currentIndex = 0;

        // Função para mover os slides
        const moveToSlide = (targetIndex) => {
            const amountToMove = targetIndex * (slideWidth + 15); // 15 é o gap
            track.style.transform = 'translateX(-' + amountToMove + 'px)';
            currentIndex = targetIndex;
        };

        // Navegação para a direita
        nextButton.addEventListener('click', () => {
            let nextIndex = currentIndex + 1;
            if (nextIndex > slides.length - Math.floor(track.parentElement.offsetWidth / slideWidth)) {
                nextIndex = 0; // Volta para o início se chegar ao fim
            }
            moveToSlide(nextIndex);
        });

        // Navegação para a esquerda
        prevButton.addEventListener('click', () => {
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) {
                 prevIndex = 0; // Para no início
            }
            moveToSlide(prevIndex);
        });
        
        // Recalcular a largura do slide ao redimensionar a janela
        window.addEventListener('resize', () => {
            slideWidth = slides.length > 0 ? slides[0].getBoundingClientRect().width : 0;
            moveToSlide(currentIndex); // Reposiciona o carrossel
        });
    }


    // --- LÓGICA DO FAQ (ACORDEÃO) ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');

        questionButton.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Opcional: fecha todos os outros itens antes de abrir o novo
            // faqItems.forEach(i => i.classList.remove('open'));

            if (!isOpen) {
                item.classList.add('open');
            } else {
                item.classList.remove('open');
            }
        });
    });
});