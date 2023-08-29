import { getAuth } from "./profile.js";
import { openModalLogin } from "./modal.js";

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

export const toogleEventToBtnBook = () => {
  const auth = getAuth();

  bookBuyBtns.forEach(element => {
    if (auth) {
      element.removeEventListener('click', openModalLogin);
    } else {
      element.addEventListener('click', openModalLogin);
    }
  });
};

export const favorites = () => {
  tabHeader.addEventListener('change', hideSeason);
  tabHeader.addEventListener('change', changeSeasonsWithDebounce);
  toogleEventToBtnBook();
};