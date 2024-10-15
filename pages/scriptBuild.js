$(document).ready(function () {
    const zoomContainers = document.querySelectorAll('.zoom-container');

    zoomContainers.forEach(container => {
        const img = container.querySelector('img');

        // Инициализация Panzoom для каждого изображения
        const panzoomInstance = Panzoom(img, {
            maxScale: 3, // Максимальный зум
            contain: 'outside' // Разрешаем перемещение за пределы контейнера
        });

        // Обработчик для клика по изображению (зум)
        container.addEventListener('click', function () {
            const currentScale = panzoomInstance.getScale();
            if (currentScale === 1) {
                panzoomInstance.zoomIn();
                img.style.cursor = 'zoom-out';
            } else {
                panzoomInstance.zoomOut();
                img.style.cursor = 'zoom-in';
            }
        });

        // Добавление событий для перемещения изображения при увеличении
        img.addEventListener('mousedown', function (e) {
            if (panzoomInstance.getScale() > 1) {
                panzoomInstance.pan(e.pageX, e.pageY);
            }
        });
    });

    // Код для перетаскивания карусели
    let isDragging = false;
    let startY;
    let scrollTop;

    const inner = $('.carousel-inner');

    inner.on('mousedown touchstart', (e) => {
        isDragging = true;
        const pageY = e.type === 'mousedown' ? e.pageY : e.originalEvent.touches[0].pageY;
        startY = pageY - inner.position().top; // Запоминаем начальную вертикальную позицию
        scrollTop = inner.scrollTop(); // Получаем текущее значение вертикальной прокрутки
    });

    inner.on('mouseleave mouseup touchend', () => {
        isDragging = false; // Останавливаем перетаскивание
    });

    inner.on('mousemove touchmove', (e) => {
        if (!isDragging) return; // Если не нажато, ничего не делаем
        e.preventDefault(); // Предотвращаем выделение текста
        const pageY = e.type === 'mousemove' ? e.pageY : e.originalEvent.touches[0].pageY;
        const y = pageY - inner.position().top; // Текущая вертикальная позиция
        const walk = (y - startY); // Вычисляем расстояние перемещения
        inner.scrollTop(scrollTop - walk); // Устанавливаем новое значение вертикальной прокрутки
    });
});
