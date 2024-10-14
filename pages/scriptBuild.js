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

        // Инициализация PhotoSwipe
var initPhotoSwipeFromDOM = function(gallerySelector) {
    var parseThumbnailElements = function(el) {
        var thumbElements = el.getElementsByTagName('a'),
            items = [],
            size,
            item;

        for (var i = 0; i < thumbElements.length; i++) {
            var link = thumbElements[i],
                size = link.getAttribute('data-size').split('x'),
                item = {
                    src: link.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };
            items.push(item);
        }
        return items;
    };

    var openPhotoSwipe = function(index, galleryElement) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        options = {
            index: index,
            bgOpacity: 0.8,
            showHideOpacity: true
        };

        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    var galleryElements = document.querySelectorAll(gallerySelector);
    for (var i = 0; i < galleryElements.length; i++) {
        galleryElements[i].onclick = function(e) {
            e.preventDefault();
            var index = Array.prototype.indexOf.call(galleryElements, this);
            openPhotoSwipe(index, this.parentNode);
        };
    }
};

document.addEventListener('DOMContentLoaded', function() {
    initPhotoSwipeFromDOM('.carousel-item a');
});
});  
});
