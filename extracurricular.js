document.addEventListener('DOMContentLoaded', function() {
    const extracurricularGrid = document.querySelector('.extracurricular-grid');
    const categories = [];
    let currentCategory = 0;

    // Group cards by category
    function initializeCategories() {
        let currentCategoryTitle = '';
        let currentCategoryCards = [];

        Array.from(extracurricularGrid.children).forEach(element => {
            if (element.classList.contains('category-title')) {
                if (currentCategoryTitle) {
                    categories.push({
                        title: currentCategoryTitle,
                        cards: currentCategoryCards
                    });
                }
                currentCategoryTitle = element.textContent;
                currentCategoryCards = [];
            } else if (element.classList.contains('activity-card')) {
                currentCategoryCards.push(element.outerHTML);
            }
        });

        // Push the last category
        if (currentCategoryTitle) {
            categories.push({
                title: currentCategoryTitle,
                cards: currentCategoryCards
            });
        }
    }

    function showCategory(index) {
        if (index < 0 || index >= categories.length) return;
        currentCategory = index;

        // Clear current content
        extracurricularGrid.innerHTML = '';

        // Add category title
        const titleElement = document.createElement('h3');
        titleElement.classList.add('category-title');
        titleElement.textContent = categories[index].title;
        extracurricularGrid.appendChild(titleElement);

        // Add cards
        categories[index].cards.forEach(cardHTML => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = cardHTML;
            extracurricularGrid.appendChild(tempDiv.firstChild);
        });

        updatePaginationButtons();
    }

    function createPaginationContainer() {
        const container = document.createElement('div');
        container.classList.add('category-pagination');
        extracurricularGrid.parentElement.appendChild(container);
        return container;
    }

    function updatePaginationButtons() {
        const paginationContainer = document.querySelector('.category-pagination');
        paginationContainer.innerHTML = '';

        // Previous button
        if (currentCategory > 0) {
            const prevButton = document.createElement('button');
            prevButton.textContent = 'Previous Category';
            prevButton.classList.add('pagination-btn', 'prev-btn');
            prevButton.onclick = () => showCategory(currentCategory - 1);
            paginationContainer.appendChild(prevButton);
        }

        // Category indicators
        categories.forEach((category, index) => {
            const indicator = document.createElement('button');
            indicator.classList.add('category-indicator');
            if (index === currentCategory) {
                indicator.classList.add('active');
            }
            indicator.onclick = () => showCategory(index);
            indicator.textContent = `${index + 1}`;
            paginationContainer.appendChild(indicator);
        });

        // Next button
        if (currentCategory < categories.length - 1) {
            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next Category';
            nextButton.classList.add('pagination-btn', 'next-btn');
            nextButton.onclick = () => showCategory(currentCategory + 1);
            paginationContainer.appendChild(nextButton);
        }
    }

    // Initialize pagination
    initializeCategories();
    createPaginationContainer();
    showCategory(0);
});