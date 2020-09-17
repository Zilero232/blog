'use strict';

let box = document.querySelector('#box'),
    left = 0,
    right = 0,
    tops = 0,
    bottom = 0;

function Actions() {
    document.addEventListener('keydown', (e) => {

        function movementBox() {
            if (e.keyCode == 39) {
                left++;
                box.style.left = `${left}%`;
                if (left == 0 || left == 94) {
                    
                }
            } else if (e.keyCode == 37) {
                left--;
                box.style.left = `${left}%`;
            } else if (e.keyCode == 38) {
                tops--;
                box.style.top = `${tops}%`;
            } else if (e.keyCode == 40) {
                tops++;
                box.style.top = `${tops}%`;
            }
        }
    
        movementBox();
    });
}

Actions();