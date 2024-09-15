// Получаем элементы слайдов и индикаторов
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

// Функция для отображения нужного слайда
function showSlide(index) {
    // Удаляем класс 'active' у всех слайдов и индикаторов
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
    });

    // Добавляем класс 'active' для текущего слайда и индикатора
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

// Обработчик клика на кнопку "Next"
document.querySelector('.next').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;  // Переход к следующему слайду
    showSlide(currentSlide);
});

// Обработчик клика на кнопку "Prev"
document.querySelector('.prev').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;  // Переход к предыдущему слайду
    showSlide(currentSlide);
});

// Обработчики кликов по индикаторам
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        currentSlide = i;  // Установка текущего слайда на тот, который соответствует индикатору
        showSlide(currentSlide);
    });
});

