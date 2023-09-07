import { getAuth } from "./dropdown.js";
import { openModalLogin } from "./modal.js";
import { openModalBuyCard } from "./buy-card.js";

const tab = document.querySelector('.tabs');
const tabHeader = tab.querySelector('.tabs-header');
const bookBuyBtns = document.querySelectorAll('.book__btn');

const debounce = (callee, timeoutMs) => {
  return function perform(...args) {
    let previousCall = this.lastCall

    this.lastCall = Date.now()

    if (previousCall && this.lastCall - previousCall <= timeoutMs) {
      clearTimeout(this.lastCallTimer)
    }

    this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs)
  }
};

const hideSeason = () => {
  const tabsContentSeason = tab.querySelector('.tabs-content__seasons');
  tabsContentSeason.classList.add('fade-in');
  tabsContentSeason.classList.remove('fade-out');
};

const changeSeasons = ({ target = e.target }) => {
  const tabsContentSeason = tab.querySelector('.tabs-content__seasons');
  const tabsContentSeasons = tab.querySelectorAll('.tabs-content__season');

  tabsContentSeasons.forEach((element) => {
    if (element.closest(`.${target.value}`)) {
      element.classList.remove('visually-hidden');
    } else {
      element.classList.add('visually-hidden');
    }
  });

  tabsContentSeason.classList.remove('fade-in');
  tabsContentSeason.classList.add('fade-out');
};

const changeSeasonsWithDebounce = debounce(changeSeasons, 1000)

const addEventToBtnBook = () => {
  bookBuyBtns.forEach(element => {
    element.addEventListener('click', toogleEventToBtnBook);
  });
};

const toogleEventToBtnBook = e => {
  if (!getAuth()) {
    openModalLogin(e);
    return;
  }

  if (localStorage.getItem('buy-card') !== 'true') {
    openModalBuyCard(e);
    return;
  }
  e.target.closest('.book').classList.add('book_own');
  e.target.textContent = 'Own';
  e.target.disabled = true;
  e.target.removeEventListener('click', toogleEventToBtnBook);
};

export const getBooksOwn = () => {
  const books = document.querySelectorAll('.book');

  let booksOwnArr = [];

  books.forEach(element => {
    if (element.matches('.book_own')) {
      let booksOwn = {};
      booksOwn.title = element.querySelector('.book__title').textContent;
      booksOwn.author = element.querySelector('.book__author').textContent.replace('By ', '');
      booksOwnArr.push(booksOwn)
    }
  });

  return booksOwnArr;
};

export const favorites = () => {
  tabHeader.addEventListener('change', hideSeason);
  tabHeader.addEventListener('change', changeSeasonsWithDebounce);
  addEventToBtnBook();
};