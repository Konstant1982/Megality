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
});
