const startBtn = document.querySelector('.hero-btn');

let observer = new IntersectionObserver((entries) => {
    entries.forEach((el) => {
        if (el.isIntersecting) {
            el.target.src = el.target.dataset.src;
        }
    });
});

startBtn.addEventListener('click', () => {
    document.querySelectorAll('.lazy-img').forEach((el) => {
        observer.observe(el);
    });
});