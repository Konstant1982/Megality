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

    
$(document).ready(function() {
    let isDragging = false;
    let startX;
    let scrollLeft;

    const carousel = $('#carouselExampleCaptions');
    const inner = $('.carousel-inner');

    inner.on('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - inner.position().left;
        scrollLeft = inner.scrollLeft();
    });

    inner.on('mouseleave mouseup', () => {
        isDragging = false;
    });

    inner.on('mousemove', (e) => {
        if (!isDragging) return; // если не нажато, не выполняем
        e.preventDefault(); // предотвращаем выделение текста
        const x = e.pageX - inner.position().left;
        const walk = (x - startX) * 2; // множитель для скорости прокрутки
        inner.scrollLeft = scrollLeft - walk; // перемещение карусели
    });
});


});
