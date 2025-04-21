const sliderInput = document.querySelector('.slider__input');
const sliderImg = document.querySelector('.slider__image');

const changeSize = () => {
    let size = Number(sliderInput.value);
    sliderImg.style.transform = `scale(${size}%)`;
}

sliderInput.addEventListener('change', _.debounce(changeSize, 200));