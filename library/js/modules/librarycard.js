import { getAuth } from "./dropdown.js";
import { getBooksOwn } from "./favorites.js";
import { openModalProfile } from "./profile.js";

const libraryCard = document.querySelector('.librarycard');
const findcardTitle = libraryCard.querySelector('.findcard__title');
const findcardProfileVisitsCount = libraryCard.querySelector('.findcard-profile__visits-count');
const findcardProfileBooksCount = libraryCard.querySelector('.findcard-profile__books-count');
const visitProfileBtn = libraryCard.querySelector('.visit-profile__btn-profile');
const findcardFormName = libraryCard.querySelector('.findcard-form__name');
const findcardFormCard = libraryCard.querySelector('.findcard-form__card');

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
  } else {
    libraryCard.classList.remove('librarycard_auth');
    findcardTitle.textContent = 'Find your Library card';
    findcardFormName.value = '';
    findcardFormName.disabled = false;
    findcardFormCard.value = '';
    findcardFormCard.disabled = false;
    visitProfileBtn.removeEventListener('click', openModalProfile);
  }
};