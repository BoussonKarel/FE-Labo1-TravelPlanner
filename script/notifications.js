const TIME_VISIBLE = 4000;
let notificationHolder = null;

const getDOM = () => {
    notificationHolder = document.querySelector('.js-notifications');
}

const fadeOutNotification = (notificationElement) => {
    const timerId = setTimeout(() => {
        notificationElement.classList.add('u-fading-out');
        console.log('fade')

        notificationElement.addEventListener('transitionend', function() {
            console.log('end')
            this.parentNode.removeChild(this);
        });

        notificationElement.addEventListener('mouseover', function() {
            clearTimeout(timerId);
        })
        
    }, TIME_VISIBLE);
}

const showNotification = (message, undoCallback) => {
    const notificationElement = document.createElement('div');
    notificationElement.classList.add('c-notification');
    notificationElement.classList.add('u-will-fade');

    const messageElement = document.createElement('p');
    messageElement.innerText = message;
    messageElement.classList.add('c-notification__message');

    const buttonElement = document.createElement('button');
    buttonElement.innerHTML = `
        <svg class="c-notification__icon" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    `;
    buttonElement.classList.add('c-notification__button');

    buttonElement.addEventListener('click', function() {
        notificationHolder.removeChild(notificationElement);
    })

    notificationElement.appendChild(messageElement);
    notificationElement.appendChild(buttonElement);

    notificationHolder.appendChild(notificationElement);

    fadeOutNotification(notificationElement);
}

document.addEventListener('DOMContentLoaded', () => {
    getDOM();
});