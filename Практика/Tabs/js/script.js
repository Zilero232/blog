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
    modal = document.querySelector('.modal');

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
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
        closeModal();
    }
});

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



//=================================SendingForms================================//
const forms = document.querySelectorAll('form');

forms.forEach(item => {
    postData(item);
});

const Message = {
    loading: 'img/form/loading.svg.png',
    sucess: 'Спасибо! Мы скоро с вами свяжимся',
    failute: 'Что-то пошло не так!'
}

function postData(form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const status = document.createElement('img');
        status.src = Message.loading;
        setTimeout(() => {
            status.style.cssText = `
            display: block;
            margin: 0 auto;
            width: 30px;
            height: 30px;
            transform: rotate(360deg);
            transition: all 5s;
        `
        });

        form.append(status);

        const requst = new XMLHttpRequest();
        requst.open('POST', 'server.php');
        requst.setRequestHeader('Content-type', 'application/json');

        const formData = new FormData(form);

        console.log(formData);

        const object = {};
        formData.forEach(function (value, key) {
            object[key] = value;
        });

        requst.send(JSON.stringify(object));

        requst.addEventListener('load', () => {
            if (requst.status === 200) {
                showThanksModal(Message.sucess);
                form.reset();
                status.remove();
            } else {
                showThanksModal(Message.failute);
            }
        });

    });

    function showThanksModal(Message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${Message}</div>
            </div>
        `
        document.querySelector('.modal').append(thanksModal);

        openModal();

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);

    }
}

//=================================Slider================================//
const sliderWrapper = document.querySelector('.offer__slider-wrapper'),
    sliderInner = document.querySelector('.offer__slider-inner'),
    slide = document.querySelectorAll('.offer__slide'),
    current = document.querySelector('#current'),
    total = document.querySelector('#total'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next');
    width = getComputedStyle(sliderWrapper).width,
    fullWidth = +width.replace(/\D/g, '') * (slide.length - 1);

let offset = 0,
    indexSlider = 1;

carousel = document.createElement('div');
carousel.classList.add('carousel__indicators');
carousel.innerHTML;
sliderWrapper.append(carousel);

for (let i = 0; i < slide.length; i++) {
    const dots = document.createElement('div');
    dots.classList.add('dots');
    dots.setAttribute('data-slide-to', i + 1);
    dots.innerHTML;
    if (i == 0) dots.classList.add('dots__active');
    document.querySelector('.carousel__indicators').append(dots);
}

const dots = document.querySelectorAll('.dots');

sliderInner.style.width = slide.length * 100 + "%";
sliderInner.style.display = 'flex';
sliderWrapper.style.overflow = 'hidden';
slide.forEach(item => {
    item.style.width = width;
});

if (slide.length > 9) total.textContent = slide.length;
else total.textContent = `0${slide.length}`;

function CheckIndex() {
    localStorage.setItem('number', indexSlider);
    if (indexSlider < 10)
        indexSlider = `0${indexSlider}`;
        current.innerHTML = indexSlider;
}

function folding(item) {
    return +item.replace(/\D/g, '');
}

function activeDots() {
    dots.forEach(item => {
        item.classList.remove('dots__active');
    });

    dots[indexSlider - 1].classList.add('dots__active');
}

function ReloadDefault() {
    indexSlider = localStorage.getItem('number');
    offset += folding(width) * (indexSlider - 1);
    sliderInner.style.transform = `translateX(-${offset}px)`;
    CheckIndex();
    activeDots();
}
ReloadDefault();

next.addEventListener('click', () => {
    if (offset == fullWidth) {
        offset = 0;
        indexSlider = 1;
    } else {
        offset += folding(width);
        indexSlider++;
    }
    sliderInner.style.transform = `translateX(-${offset}px)`;
    sliderInner.style.transition = 'all 0.5s';

    activeDots();
    CheckIndex();
});

prev.addEventListener('click', () => {
    if (offset == 0) {
        offset = fullWidth;
        indexSlider = slide.length;
    } else {
        offset -= folding(width);
        indexSlider--;
    }
    sliderInner.style.transform = `translateX(-${offset}px)`;
    sliderInner.style.transition = 'all 0.5s';

    activeDots();
    CheckIndex();
});

dots.forEach(dots => {
    dots.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        indexSlider = slideTo;
        offset = folding(width) * (slideTo - 1);
        sliderInner.style.transform = `translateX(-${offset}px)`;
        sliderInner.style.transition = 'all 0.5s';

        CheckIndex();
        activeDots();
    });
})



//=================================Calculator================================//
const result = document.querySelector('.calculating__result span');

let sex, height, weight, age, ratio;

if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex')
} else {
    sex = 'Woman';
    localStorage.setItem('sex', 'Woman');
}

if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio')
} else {
    ratio = 1.375;  
    localStorage.setItem('ratio', 1.375);
}

    height =  localStorage.getItem('height'),
    weight = localStorage.getItem('weight'),
    sex = localStorage.getItem('sex'),
    age = localStorage.getItem('age'),
    ratio = localStorage.getItem('ratio');

function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
        return result.textContent = '____';
    }

    if (sex === 'Woman') {
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
}
calcTotal();

function LoadLocalStade(selector, classActive) {
    const element = document.querySelectorAll(selector);

    element.forEach(item => {
        item.classList.remove(classActive);

        if (item.getAttribute('id') === localStorage.getItem('sex')) {
            item.classList.add(classActive);
        } 
        if(item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            item.classList.add(classActive);
        }
    });
}
LoadLocalStade('#gender div', 'calculating__choose-item_active');
LoadLocalStade('.calculating__choose_big div', 'calculating__choose-item_active');


function getStaticInformation(parentSelector, activeClass) {
    const element = document.querySelectorAll(parentSelector);

    element.forEach(elem => {
        elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', ratio);
            } else {
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', sex);
            }

            element.forEach(item => {
                item.classList.remove(activeClass);
            });

            e.target.classList.add(activeClass);

            calcTotal();
        });
    }); 

}
getStaticInformation('#gender div', 'calculating__choose-item_active');
getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');


function getDynamicInforamtion(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
        if (input.value.match(/\D/g)) {
            input.style.border = '2px solid red';
        } else {
            input.style.border = 'none';
        }
        
        switch (input.getAttribute('id')) {
            case 'height':
                height = +input.value;
                localStorage.setItem('height', height);
                break;
            case 'weight':
                weight = +input.value;
                localStorage.setItem('weight', weight);
                break;
            case 'age':
                age = +input.value;
                localStorage.setItem('age', age);
                break;
        }

        calcTotal();
    });
}
getDynamicInforamtion('#height');
getDynamicInforamtion('#weight');
getDynamicInforamtion('#age');