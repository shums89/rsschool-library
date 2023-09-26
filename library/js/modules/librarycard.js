import { getAuth } from "./dropdown.js";
import { getBooksOwn } from "./favorites.js";
import { openModalProfile } from "./profile.js";

const libraryCard = document.querySelector('.librarycard');
const findcardTitle = libraryCard.querySelector('.findcard__title');
const findcardProfile = libraryCard.querySelector('.findcard-profile');
const findcardProfileVisitsCount = findcardProfile.querySelector('.findcard-profile__visits-count');
const findcardProfileBooksCount = findcardProfile.querySelector('.findcard-profile__books-count');
const visitProfileBtn = libraryCard.querySelector('.visit-profile__btn-profile');
const findcardForm = libraryCard.querySelector('.findcard-form');
const findcardFormName = findcardForm.querySelector('.findcard-form__name');
const findcardFormCard = findcardForm.querySelector('.findcard-form__card');
const findcardFormBtn = findcardForm.querySelector('.findcard-form__btn');

const openCardInfo = e => {
  e.preventDefault();

  const ownBooks = getBooksOwn();

  if (!localStorage.getItem('card')
    || !localStorage.getItem('name')
    || !localStorage.getItem('surname')
    || !localStorage.getItem('email')
    || !localStorage.getItem('password')
  ) {
    return;
  }

  if (findcardFormName.value == `${localStorage.getItem('name')} ${localStorage.getItem('surname')}`
    && findcardFormCard.value == localStorage.getItem('card')
  ) {
    findcardProfileVisitsCount.textContent = localStorage.getItem('visits') ? localStorage.getItem('visits') : 1;
    findcardProfileBooksCount.textContent = ownBooks.length;
    findcardProfile.style.display = 'block';
    findcardFormBtn.style.display = 'none';
    setTimeout(closeCardInfo, 10000);
  } else {
    alert('Card not found!');
  }
};

const closeCardInfo = () => {
  findcardFormName.value = '';
  findcardFormCard.value = '';
  findcardProfile.style.display = '';
  findcardFormBtn.style.display = '';
};

export const renderLibraryCard = () => {
  const ownBooks = getBooksOwn();

  if (getAuth()) {
    libraryCard.classList.add('librarycard_auth');
    findcardTitle.textContent = 'Your Library card';
    findcardFormName.value = `${localStorage.getItem('name')} ${localStorage.getItem('surname')}`;
    findcardFormName.disabled = true;
    findcardFormCard.value = localStorage.getItem('card');
    findcardFormCard.disabled = true;
    findcardProfileVisitsCount.textContent = localStorage.getItem('visits') ? localStorage.getItem('visits') : 1;
    findcardProfileBooksCount.textContent = ownBooks.length;
    visitProfileBtn.addEventListener('click', openModalProfile);
    findcardForm.removeEventListener('submit', openCardInfo);
  } else {
    libraryCard.classList.remove('librarycard_auth');
    findcardTitle.textContent = 'Find your Library card';
    findcardFormName.value = '';
    findcardFormName.disabled = false;
    findcardFormCard.value = '';
    findcardFormCard.disabled = false;
    visitProfileBtn.removeEventListener('click', openModalProfile);
    findcardForm.addEventListener('submit', openCardInfo);
  }
};