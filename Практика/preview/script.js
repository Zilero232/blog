'use strict'

const   btn = document.querySelectorAll('button'),
        overlay = document.querySelector('.overlay');

// btn.onclick = function() {
//     alert('Second');
// };

let i = 0;
const element = (e) => {
    console.log(e.target);
    console.log(e.type);
    // i++;
    // if (i == 1) {
    //     btn.removeEventListener('click', element);
    // }
};

// btn.addEventListener('click', element);
// overlay.addEventListener('click', element);

// const link = document.querySelector('a');

// link.addEventListener('click', (event) => {
//     event.preventDefault();
//     console.log(event.target);
// });

btn.forEach(item => {
    item.addEventListener('click', element);
});

console.log(document.body.ElementSibling);
