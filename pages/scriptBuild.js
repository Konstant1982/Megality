$(document).ready(function () {
    const zoomContainers = document.querySelectorAll('.zoom-container');

    zoomContainers.forEach(container => {
        const img = container.querySelector('img');

        // Инициализация Panzoom для каждого изображения
        const panzoomInstance = Panzoom(img, {
            maxScale: 3, // Максимальный зум
            contain: 'outside' // Разрешаем перемещение изображения за пределы контейнера
        });

        // Обработчик для клика по изображению (зум)
        container.addEventListener('click', function () {
            if (panzoomInstance.getScale() === 1) {
                panzoomInstance.zoomIn(); // Увеличить изображение
                img.style.cursor = 'zoom-out'; // Меняем курсор на "уменьшить"
            } else {
                panzoomInstance.zoomOut(); // Уменьшить изображение
                img.style.cursor = 'zoom-in'; // Возвращаем курсор на "увеличить"
            }
        });
    });
});

    // Остальной код для перетаскивания карусели (если нужен)
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

