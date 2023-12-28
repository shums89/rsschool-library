import { closeDropdown } from "./dropdown.js";
import { getBooksOwn } from "./favorites.js";

const modalProfile = document.querySelector('.modal-profile');
const btnpPofileClose = modalProfile.querySelector('.modal-profile__close');
const cardNumberCopybtn = modalProfile.querySelector('.modal-profile__card-btn');
const cardNumber = modalProfile.querySelector('.modal-profile__card-number');

const clickOverlayProfile = e => {
  if (!e.target.closest('.modal-profile__wrapper')) {
    closeModalProfile();
  }
};

const renderModalProfile = () => {
  const avatar = modalProfile.querySelector('.modal-profile__avatar');
  const name = modalProfile.querySelector('.modal-profile__name');
  const visitsCount = modalProfile.querySelector('.cards-profile__visits-count');
  const booksCount = modalProfile.querySelector('.cards-profile__books-count');
  const rentedBooksList = modalProfile.querySelector('.rented-books__list');
  const ownBooks = getBooksOwn();

  avatar.textContent = localStorage.getItem('name').slice(0, 1) + localStorage.getItem('surname').slice(0, 1);
  name.textContent = `${localStorage.getItem('name')} ${localStorage.getItem('surname')}`;
  visitsCount.textContent = localStorage.getItem('visits') ? localStorage.getItem('visits') : 1;
  booksCount.textContent = ownBooks.length;
  rentedBooksList.innerHTML = '';

  if (ownBooks.length > 0) {
    ownBooks.forEach(book => {
      rentedBooksList.insertAdjacentHTML('beforeend', `
        <li class="rented-books__item">${book.title}, ${book.author}</li>
      `);
    });
  }

  cardNumber.textContent = localStorage.getItem('card');
};

const copyTextToClipboard = async () => {
  const text = modalProfile.querySelector('.modal-profile__card-number').textContent;
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error(`Ошибка при копировании текста в буфер: ${err}`);
  }
};

export const openModalProfile = e => {
  e.preventDefault();
  renderModalProfile();
  modalProfile.classList.add('modal_show');
  modalProfile.addEventListener('click', clickOverlayProfile);
  btnpPofileClose.addEventListener('click', closeModalProfile);
  cardNumberCopybtn.addEventListener('click', copyTextToClipboard);
  closeDropdown();
};

const closeModalProfile = () => {
  modalProfile.classList.remove('modal_show');
  modalProfile.removeEventListener('click', clickOverlayProfile);
  btnpPofileClose.removeEventListener('click', closeModalProfile);
  cardNumberCopybtn.removeEventListener('click', copyTextToClipboard);
};
