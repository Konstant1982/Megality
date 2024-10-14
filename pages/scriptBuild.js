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

    // Перетаскивание карусели
    let isDragging = false;
    let startX;
    let scrollLeft;

    const inner = $('.carousel-inner');

    inner.on('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - inner.position().left; // Запоминаем начальную позицию мыши
        scrollLeft = inner.scrollLeft(); // Получаем текущее значение прокрутки
    });

    inner.on('mouseleave mouseup', () => {
        isDragging = false; // Останавливаем перетаскивание
    });

    inner.on('mousemove', (e) => {
        if (!isDragging) return; // Если не нажато, ничего не делаем
        e.preventDefault(); // Предотвращаем выделение текста
        const x = e.pageX - inner.position().left; // Текущая позиция мыши
        const walk = (x - startX) * 2; // Вычисляем расстояние перетаскивания
        inner.scrollLeft(scrollLeft - walk); // Устанавливаем новое значение прокрутки
    });

    inner.on('touchstart', (e) => {
    isDragging = true;
    startX = e.originalEvent.touches[0].pageX - inner.position().left; // Используем координаты касания
    scrollLeft = inner.scrollLeft();
});

inner.on('touchend mouseleave mouseup', () => {
    isDragging = false; // Останавливаем перетаскивание
});

inner.on('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.originalEvent.touches[0].pageX - inner.position().left; // Текущая позиция касания
    const walk = (x - startX) * 2; // Вычисляем расстояние перетаскивания
    inner.scrollLeft(scrollLeft - walk);
});
});
