/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    let adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        promo = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if (favorite) {
            console.log('Добавлен любимый фильм');
        }

        if (newFilm) {
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
            createMoviesList(movieDB.movies, promo);
            event.target.reset();
        }
    });

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    const makeChanges = () => {
        genre.textContent = 'Драма';
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };

    const sortArr = (arr) => {
        arr.sort();
    };

    const createMoviesList = (films, parent) => {
        parent.innerHTML = "";
        sortArr(movieDB.movies);

        films.forEach((film, i) => {
            if (film.length > 21) {
                parent.innerHTML += `
                <li class="promo__interactive-item">
                    ${i + 1} - ${film.substring(0, 22)}...
                    <div class="delete"></div>
                </li>        
                `;
            } else {
                parent.innerHTML += `
                <li class="promo__interactive-item">
                    ${i + 1} - ${film}
                    <div class="delete"></div>
                </li>
                `;
            }
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMoviesList(films, parent);
            });
        });
    };

    deleteAdv(adv);
    makeChanges();
    createMoviesList(movieDB.movies, promo);

});