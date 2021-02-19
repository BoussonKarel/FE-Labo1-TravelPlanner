

document.addEventListener('DOMContentLoaded', () => {
    const colorSlider = document.querySelector('.js-color-slider');

    colorSlider.addEventListener('input', function() {
        document.documentElement.style.setProperty('--theme-color-hue', this.value);
    });

    // WARNING: DO NOT COPY
    let colorHue = 0;
    setInterval(() => {
        document.documentElement.style.setProperty('--theme-color-hue', colorHue);
        colorHue += 2;
        if (colorHue > 360) {
            colorHue = 0;
        }
    }, 100);
});