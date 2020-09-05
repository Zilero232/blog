'use strict';

const   box = document.getElementById('box'),
        btns = document.getElementsByTagName('button'),
        circles = document.getElementsByClassName('circle'),
        hearts = document.querySelectorAll('.heart'),
        oneHearts = document.querySelector('.heart'),
        wraper = document.querySelector('.wrapper');

box.style.backgroundColor = 'blue';
box.style.width = '420px';

btns[1].style.borderRadius = '100%';
circles[0].style.backgroundColor = 'red';

box.style.cssText = 'background-color: yellow; width: 500px';

// for (let i = 0; i < hearts.length; i++) {
//     hearts[i].style.backgroundColor = '#ccc';
// }

hearts.forEach(item => {
    item.style.backgroundColor = '#ccc';
});

let div = document.createElement('div');
const text = document.createTextNode('Здесь был я');

div.classList.add('black');

wraper.append(div);

wraper.prepend(div);

wraper.appendChild(div);

hearts[0].before(div);

wraper.insertBefore(div, hearts[0]);

hearts[0].before(div); 

// circles[1].remove();

// hearts[1].replaceWith(circles[0]);

div.innerHTML = '<h1>Hello Word</h1>';

div.textContent = "Hello";

div.insertAdjacentHTML('beforeend', '<h2>Hello World</h2>');