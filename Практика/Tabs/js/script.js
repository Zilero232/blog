window.addEventListener('DOMContentLoaded', () => {

    //=================================Tabs================================//
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent(i);
                    showTabContent(i);
                }
            });
        }
    });


    hideTabContent();
    showTabContent();

});




//=================================Time================================//
const deadline = '2020-08-24';


function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60)) % 24),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds,
    };
}

function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
            days.innerHTML = `00`;
            hours.innerHTML = `00`;
            minutes.innerHTML = `00`;
            seconds.innerHTML = `00`;
            clearInterval(timeInterval);
        }
    }
    updateClock();
}

setClock('.timer', deadline);




//=================================Modal================================//
const btn = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    close = document.querySelector('[data-close]');

btn.forEach(item => {
    item.addEventListener('click', openModal);
});

function openModal() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
}

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

close.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

const modalTimerId = setTimeout(openModal, 30000);

function showModelByScroll() {
    if (window.pageYOffset >= document.documentElement.offsetHeight - document.documentElement.clientHeight) {
        openModal();
        window.removeEventListener('scroll', showModelByScroll);
    }
}

window.addEventListener('scroll', showModelByScroll);


//=================================Cards================================//
class Cards {
    constructor(url, alt, title, descr, price, parentSelector, ...classRest) {
        this.url = url;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.transfer = 27;
        this.changeToUrl();
        this.parentSelector = document.querySelector(parentSelector);
        this.classRest = classRest;
    }

    changeToUrl() {
        this.price = this.price * this.transfer;
    }
    
    DymanictCards() {
        const element = document.createElement('div');
        if (this.classRest.length === 0) {
            this.element = 'menu__item';
            element.classList.add(this.element);
        } else {
            this.classRest.forEach(item => element.classList.add(item));
        }

  
        element.innerHTML = `
            <img src="${this.url}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>

        `;
        this.parentSelector.append(element);
    }
}

new Cards(
    'img/tabs/vegy.jpg',
    'vegy',
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    250,
    '.menu .container',
).DymanictCards();

new Cards(
    'img/tabs/elite.jpg',
    'elite',
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    550,
    '.menu .container',
).DymanictCards();

new Cards('img/tabs/post.jpg',
    'post',
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    430,
    '.menu .container',
).DymanictCards();



