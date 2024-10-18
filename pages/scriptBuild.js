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

        // Определение активного слайда и отображение соответствующего мануала
        let activeIndex = $('.carousel-item.active').index();
        const manualText = $('#manualText');

        if (activeIndex >= 0 && activeIndex <= 11) {
            manualText.html(`
                <h3>Manual laminating the fuselage</h3>
    <p>0.  4 layers of wax and 2 layers of alcohol-based PVA.</p>  
    <p>1. 1st-2nd layer of gelcoat (250 ml). Increase the dye amount by 3 times (1 kg/30 mg of dye). Gelcoat consists of 50% epoxy resin and 50% aerosil by volume (epoxy resin).</p>
    <p>2. 3rd layer of gelcoat, apply paste to the edges and corners, then immediately lay down (120 ml).</p>
    <p>3. 50 g/m² Plain.</p>
    <p>4. 100 g/m² Twill.</p>
    <p>Epoxy resin: + 60 ml.</p>
    <p>5. 150 g/m² Plain.</p>
    <p>6. 500 g/m² Plain — wing joint (increase to 650 g/m²).</p>
    <p>Epoxy resin: + 60 ml.</p>
    <p>7. 300 g/m² x 15 mm — joint edge.</p>
    <p>Epoxy resin: + 40 ml.</p>
    <p>8. 100 g/m² Twill.</p>
    <p>9. 50 g/m² Plain.</p>
    <p>10. Release fabric.</p>
    <p>11. Vacuum.</p>
            `);
        } else if (activeIndex >= 12 && activeIndex <= 29) {
            manualText.html(`
                <h3>Manual 2: Laminating process continuation</h3>
                <p>Content for slides 13 to 30.</p>
                <p>1. Apply additional layers of gelcoat.</p>
                <p>2. Strengthen the wing joints with specific material.</p>
            `);
        } else if (activeIndex >= 30 && activeIndex <= 39) {
            manualText.html(`
                <h3>Manual 3: Final laminating steps</h3>
                <p>Content for slides 31 to 40.</p>
                <p>1. Complete the vacuum process.</p>
                <p>2. Final touches and surface finishing.</p>
            `);
        }
    });

    // Перетаскивание карусели с условием для вертикальной прокрутки
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

        // Получаем текущее положение пальца
        const pageY = e.type === 'mousemove' ? e.pageY : e.originalEvent.touches[0].pageY;
        const y = pageY - inner.position().top;
        const walk = (y - startY);
        
        // Если прокрутка по вертикали больше 10 пикселей, не позволяем прокрутку карусели
        if (Math.abs(walk) > 10) {
            e.preventDefault(); // Предотвращаем выделение текста
            inner.scrollTop(scrollTop - walk); // Устанавливаем новое значение вертикальной прокрутки
        }
    });

    // Анимация появления/скрытия текста мануала
    $('#manualFolder').on('click', function () {
        const manualText = $('#manualText');
        manualText.slideToggle(300);  // Плавная анимация
    });
});
