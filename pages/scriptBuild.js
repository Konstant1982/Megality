$(document).ready(function () {
    function initializePanzoomForVisibleImage() {
        // Инициализация Panzoom только для видимого изображения
        const activeItem = document.querySelector('.carousel-item.active');
        const zoomContainers = activeItem.querySelectorAll('.zoom-container');

        zoomContainers.forEach(container => {
            const img = container.querySelector('img');

            // Убедимся, что Panzoom не инициализируется повторно
            if (!img.panzoomInitialized) {
                const panzoomInstance = Panzoom(img, {
                    maxScale: 1.5, // Максимальный зум до 150%
                    contain: 'outside', // Разрешаем перемещение за пределы контейнера
                    onPan: function() {
                        img.style.cursor = 'move'; // Меняем курсор при перемещении
                    },
                    onZoom: function() {
                        if (panzoomInstance.getScale() === 1) {
                            img.style.cursor = 'zoom-in'; // Меняем курсор при нормальном размере
                        } else {
                            img.style.cursor = 'zoom-out'; // Меняем курсор при увеличенном размере
                        }
                    }
                });

                container.addEventListener('click', function () {
                    const currentScale = panzoomInstance.getScale();
                    if (currentScale === 1) {
                        panzoomInstance.zoomIn();
                    } else {
                        panzoomInstance.zoomOut();
                    }
                });

                img.panzoomInitialized = true; // Флаг, что Panzoom уже инициализирован для этого изображения
            }
        });
    }

    // Инициализируем Panzoom для первого видимого изображения
    initializePanzoomForVisibleImage();

    // Добавляем обработчик для событий смены слайдов карусели
    $('.carousel').on('slid.bs.carousel', function () {
        initializePanzoomForVisibleImage(); // Инициализируем Panzoom при каждом новом активном слайде
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

   $(document).ready(function () {
    $('#manualFolder').on('click', function () {
        const manualText = $('#manualText');

        // Переключаем отображение текста
        manualText.slideToggle(300);  // Анимация появления/скрытия
    });
});
    
});
