let timerId,
    btn = document.querySelector('.btn');
    i = 0;


btn.addEventListener('click', () => {
    myAnimation();
});

function myAnimation() {
    let box = document.querySelector('.box'),
        pos = 0,
        id = setInterval(frame, 10);

    function frame() {
        box.style.top = pos + 'px';
        box.style.left = pos + 'px';
        if (pos == 300) {
            clearInterval(id);
        } else {
            pos = pos + 5;
        }
    }    
}

// function logger() {
//     console.log('Hello');
//     i++;
//     if (i == 3) {
//         clearInterval(timerId);
//     }
// }