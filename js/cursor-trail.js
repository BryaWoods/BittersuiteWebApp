document.addEventListener('DOMContentLoaded', () => {
    const cursorTrail = document.getElementById('cursor-trail');

    document.addEventListener('mousemove', (e) => {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${e.clientX}px`;
        star.style.top = `${e.clientY}px`;
        cursorTrail.appendChild(star);

        // Remove stars after a certain time to prevent buildup
        setTimeout(() => {
            star.remove();
        }, 1000); // Adjust the duration as needed
    });
});
