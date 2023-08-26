import { toggleDropdown } from "./profile.js";

const getcardBtnSingup = document.querySelector('.getcard__btn-singup');
const modalRegister = document.querySelector('.modal-register');
const btnClose = modalRegister.querySelector('.modal-with-form__btn');
const form = modalRegister.querySelector('.modal-with-form__form');

const getCardNumber = () => {
  const n = Math.floor(Math.random() * 1e100).toString(16);
  return ('0'.repeat(Math.max(9 - n.length, 0)) + n).slice(0, 9).toUpperCase();
};

const register = e => {
  e.preventDefault();

  const formData = new FormData(form);
  for (let pair of formData.entries()) {
    localStorage.setItem(pair[0], pair[1]);
  }
  localStorage.setItem('card', getCardNumber());
  form.reset();

  toggleDropdown();
  closeModal();
};

const login = () => {

};

const clickOverlay = e => {
  if (!e.target.closest('.modal-register__wrapper')) {
    closeModal();
  }
};

export const openModalRegister = () => {
  modalRegister.classList.add('modal_show');
  btnClose.addEventListener('click', closeModal);
  modalRegister.addEventListener('click', clickOverlay);
  form.addEventListener('submit', register);
};

const closeModal = () => {
  modalRegister.classList.remove('modal_show');
  btnClose.removeEventListener('click', closeModal);
  modalRegister.removeEventListener('click', clickOverlay);
};

export const modal = () => {
  getcardBtnSingup.addEventListener('click', openModalRegister);
};