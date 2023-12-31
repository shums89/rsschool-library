# Library

## Описание проекта

Library – задание stage#0 в ходе выполнения которого вы сверстаете landing page сайта по подбору и продаже книг, сделаете его адаптивным и интерактивным.

## Этапы работы над проектом:

Задание состоит из трёх частей:

- Часть 1. Фиксированная вёрстка
  - [Требования и критерии оценки](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/library/library-part1.md)
  - в этой части задания необходимо сверстать страницу по макету, которая корректно отображается при ширине экрана 1440рх. Если ширина экрана будет больше данного значения, то стоит сделать обертку, которая будет центрироваться на странице
  - проверяется валидность и семантичность вёрстки, её совпадение с макетом
- Часть 2. Адаптивная вёрстка
  - [Требования и критерии оценки](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/library/library-part2.md)
  - в этой части задания необходимо добавить адаптивность свёрстанной странице. При ширине страницы 768px ставится задача совпадения вёрстки с макетом, на остальных разрешениях до 320рх включительно достаточно обеспечить отсутствие горизонтальной полосы прокрутки 
    Также на этом этапе в вёрстку добавляется адаптивное меню, для создания которого используется js
  - проверяется совпадения вёрстки с макетом при ширине страницы 768px, отсутствие горизонтальной полосы прокрутки, работа адаптивного меню
- Часть 3. Добавление функционала
  - [Требования и критерии оценки](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/library/library-part3.md)
  - в этой части задания используем JavaScript для добавления странице интерактивности
  - проверяется реализованный функционал

[Макет в figma](https://www.figma.com/file/SGY7eOpXC1xBddFNsb72o7/%D0%91%D0%B8%D0%B1%D0%BB%D0%B8%D0%BE%D1%82%D0%B5%D0%BA%D0%B0-stage0?type=design&node-id=0-1&mode=design)

## Структура макета:

- Макет состоит из трёх основных блоков: `<header>`, `<main>`, `<footer>`
- на данном макете есть 6 `<section>`:
  - `welcome to the brooklyn library`
  - `about`
  - `favorites`
  - `coffee shop`
  - `our contacts`
  - `digital library cards`
- для позиционирования `header` допускается объединение с ближайшей секцией в обертку с общим фоном

## Технические требования

1. вёрстка валидная, семантическая, соответствующая макету
2. приложение корректно отображается и работает в браузере Google Chrome последней версии
3. запрещается использование CSS-фреймворков (например `bootstrap`)
4. допускается использование CSS-препроцессоров (например `Sass`), `normalize.css`
5. не рекомендуется использовать сброс стилей при помощи `reset.css`
6. запрещено добавление вёрстки картинкой, когда делается скрин части макета и вставляется в вёрстку. Для вёрстки используйте теги и символы, картинками можно добавлять изображения и иконки, а не элементы вёрстки (кнопки, блоки, секции)
