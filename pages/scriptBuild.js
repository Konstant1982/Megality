$(window).on('load', function() {
    $('#carouselExampleCaptions').carousel(); // Запускаем карусель после полной загрузки
});

$(document).ready(function() {
    function adjustCarouselHeight() {
        let windowHeight = $(window).height();
        $('.carousel-inner').css('height', windowHeight);
        $('.carousel-item').css('height', windowHeight);
    }

    adjustCarouselHeight(); // Применяем на загрузке
    $(window).resize(adjustCarouselHeight); // Применяем при изменении размера окна

    // Перемещенеи фото
    $(document).ready(function() {
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
