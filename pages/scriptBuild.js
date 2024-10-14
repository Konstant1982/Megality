$(window).on('load', function() {
    $('#carouselExampleCaptions').carousel(); // Запускаем карусель после полной загрузки
});

$(document).ready(function() {
    function adjustCarouselHeight() {
        let windowHeight = $(window).height();
        
        // Отнимаем от высоты возможные элементы интерфейса или отступы
        let adjustedHeight = windowHeight - 100; // Можно настроить этот отступ под нужды
        
        $('.carousel-inner').css('height', adjustedHeight);
        $('.carousel-item').css('height', adjustedHeight);
    }

    adjustCarouselHeight(); // Применяем на загрузке
    $(window).resize(adjustCarouselHeight); // Применяем при изменении размера окна
});
