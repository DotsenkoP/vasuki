    // Получаем элементы
    const carousel = document.querySelector('.carousel');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const currentIndexIndicator = document.querySelector('.current-index');
    const totalCountIndicator = document.querySelector('.total-count');

    const items = carousel.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    const itemsToShow = 3; // Количество видимых элементов
    let currentIndex = 0;

    // Устанавливаем общее количество карточек
    totalCountIndicator.textContent = totalItems;

    // Клонируем всех участников
    items.forEach(item => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
    });

    // Обновляем индикатор текущего элемента
    function updateIndicator() {
        const displayIndex = (currentIndex % totalItems) + 1; // Показать от 1 до totalItems
        currentIndexIndicator.textContent = displayIndex;
    }

    // Автоматическое движение карусели
    function moveCarousel() {
        currentIndex++;

        const offset = -currentIndex * (100 / itemsToShow);
        carousel.style.transform = `translateX(${offset}%)`;

        // Если достигли конца оригинального списка, мгновенно возвращаемся к началу
        if (currentIndex >= totalItems) {
            setTimeout(() => {
                carousel.style.transition = 'none'; // Отключаем анимацию
                currentIndex = 0; // Возвращаемся к началу
                carousel.style.transform = `translateX(0%)`;
                setTimeout(() => {
                    carousel.style.transition = 'transform 1s ease'; // Снова включаем анимацию
                }, 50);
            }, 1000); // Ждем завершения текущей анимации
        }

        updateIndicator();
    }

    // Подключаем кнопки
    prevButton.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) currentIndex = totalItems - 1;
        const offset = -currentIndex * (100 / itemsToShow);
        carousel.style.transform = `translateX(${offset}%)`;
        updateIndicator();
    });

    nextButton.addEventListener('click', moveCarousel);

    // Обновляем индикатор при запуске и запускаем бесконечное движение
    updateIndicator();
    setInterval(moveCarousel, 4000);