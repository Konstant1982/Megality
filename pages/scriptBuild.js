$(document).ready(function () {
    // Инициализация Panzoom для изображений
    function initializePanzoomForVisibleImage() {
        const activeItem = document.querySelector('.carousel-item.active');
        const zoomContainers = activeItem.querySelectorAll('.zoom-container');

        zoomContainers.forEach(container => {
            const img = container.querySelector('img');
            if (!img.panzoomInitialized) {
                const panzoomInstance = Panzoom(img, {
                    maxScale: 1.5,
                    contain: 'outside',
                    onPan: function() {
                        img.style.cursor = 'move';
                    },
                    onZoom: function() {
                        if (panzoomInstance.getScale() === 1) {
                            img.style.cursor = 'zoom-in';
                        } else {
                            img.style.cursor = 'zoom-out';
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

                img.panzoomInitialized = true;
            }
        });
    }

    initializePanzoomForVisibleImage();

    $('.carousel').on('slid.bs.carousel', function () {
        initializePanzoomForVisibleImage();
    });

    // Перетаскивание карусели
    let isDragging = false;
    let startY;
    let scrollTop;
    const inner = $('.carousel-inner');

    inner.on('mousedown touchstart', (e) => {
        isDragging = true;
        const pageY = e.type === 'mousedown' ? e.pageY : e.originalEvent.touches[0].pageY;
        startY = pageY - inner.position().top;
        scrollTop = inner.scrollTop();
    });

    inner.on('mouseleave mouseup touchend', () => {
        isDragging = false;
    });

    inner.on('mousemove touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const pageY = e.type === 'mousemove' ? e.pageY : e.originalEvent.touches[0].pageY;
        const y = pageY - inner.position().top;
        const walk = (y - startY);
        inner.scrollTop(scrollTop - walk);
    });

    // Анимация появления/скрытия текста мануала
    $('#manualFolder').on('click', function () {
        const manualText = $('#manualText');
        manualText.slideToggle(300);  // Плавная анимация
    });
});
