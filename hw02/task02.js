const box = document.querySelector('#box');

const moveBox = (e) => {
    box.style.transform = `translateX(${e.clientX}px)`;
}

window.addEventListener('mousemove', _.debounce(moveBox, 100));