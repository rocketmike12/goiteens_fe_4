const btn = document.querySelector('#btn');
const gallery = document.querySelector('.gallery');

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const addSquare = function () {
    let newSquare = document.createElement('div');
    newSquare.style.backgroundColor = getRandomColor();
    gallery.appendChild(newSquare);
    newSquare.style.width = newSquare.style.height = `${Math.random() * 200}px`;
}

btn.addEventListener('click', addSquare);
