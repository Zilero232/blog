//==================Урок первый по времени=============================\\

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

function logger() {
    console.log('Hello');
    i++;
    if (i == 3) {
        clearInterval(timerId);
    }
}

//==================Урок второй по датам=============================\\

const now = new Date('2020-05-01');

console.log(now.getFullYear());
console.log(now.getMonth());
console.log(now.getDate());
console.log(now.getDay());
console.log(now.getHours());
console.log(now.getUTCHours());
console.log(Date.parse('2020-01-01'));
console.log(now.getTime());

now.setHours(18, 40);
console.log(now);

function checkTime() {
    let start = new Date();

    for (let i = 0; i < 1000000; i++) {
        let some = i ** 3;
    }

    let end = new Date();

    alert(`Код отработал за ${end - start} миллисекунд`);
}

checkTime();