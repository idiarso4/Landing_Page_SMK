document.addEventListener('DOMContentLoaded', function() {
    const achievementsContainer = document.querySelector('.achievements .features-grid');
    
    // Check if container exists
    if (!achievementsContainer) {
        console.warn('Achievements container not found');
        return;
    }

    const achievementCards = Array.from(achievementsContainer.querySelectorAll('.feature-card'));
    
    // Check if there are any cards
    if (!achievementCards.length) {
        console.warn('No achievement cards found');
        return;
    }

    const cardsPerPage = 2;
    let currentPage = 1;

    // Create pagination controls
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';
    achievementsContainer.parentElement.appendChild(paginationContainer);

    function showPage(page) {
        const startIndex = (page - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;

        achievementCards.forEach((card, index) => {
            card.style.display = (index >= startIndex && index < endIndex) ? 'block' : 'none';
        });

        updatePaginationButtons();
    }

    function updatePaginationButtons() {
        const totalPages = Math.ceil(achievementCards.length / cardsPerPage);
        paginationContainer.innerHTML = '';

        // Previous button
        if (currentPage > 1) {
            const prevButton = createPaginationButton('Previous', () => {
                currentPage--;
                showPage(currentPage);
            });
            prevButton.classList.add('pagination-prev');
            paginationContainer.appendChild(prevButton);
        }

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = createPaginationButton(i.toString(), () => {
                currentPage = i;
                showPage(currentPage);
            });
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            paginationContainer.appendChild(pageButton);
        }

        // Next button
        if (currentPage < totalPages) {
            const nextButton = createPaginationButton('Next', () => {
                currentPage++;
                showPage(currentPage);
            });
            nextButton.classList.add('pagination-next');
            paginationContainer.appendChild(nextButton);
        }
    }

    function createPaginationButton(text, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = 'pagination-button';
        button.addEventListener('click', onClick);
        return button;
    }

    // Initialize pagination
    showPage(currentPage);
});