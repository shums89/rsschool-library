import { toggleDropdown, closeDropdown } from "./dropdown.js";

const getcardSingupBtn = document.querySelector('.getcard__btn-singup');
const getcardLoginBtn = document.querySelector('.getcard__btn-login');

const modalRegister = document.querySelector('.modal-register');
const btnCloseRegister = modalRegister.querySelector('.modal-with-form__btn');
const formRegister = modalRegister.querySelector('.modal-with-form__form');
const modalRegisterLoginBtn = modalRegister.querySelector('.modal-register__login');

const modalLogin = document.querySelector('.modal-login');
const btnCloseLogin = modalLogin.querySelector('.modal-with-form__btn');
const formLogin = modalLogin.querySelector('.modal-with-form__form');
const modalLoginRegisterBtn = modalLogin.querySelector('.modal-login__register');

const getCardNumber = () => {
  const n = Math.floor(Math.random() * 1e100).toString(16);
  return ('0'.repeat(Math.max(9 - n.length, 0)) + n).slice(0, 9).toUpperCase();
};

const addVisits = () => {
  localStorage.setItem('visits', localStorage.getItem('visits') ? +localStorage.getItem('visits') + 1 : 1);
};

const register = e => {
  e.preventDefault();

  const formData = new FormData(formRegister);
  for (let pair of formData.entries()) {
    localStorage.setItem(pair[0], pair[1]);
  }
  localStorage.setItem('card', getCardNumber());
  localStorage.setItem('auth', 'true');
  formRegister.reset();

  addVisits();
  toggleDropdown();
  closeModalRegister();
};

const login = e => {
  e.preventDefault();

  if (!localStorage.getItem('card')
    || !localStorage.getItem('name')
    || !localStorage.getItem('surname')
    || !localStorage.getItem('email')
    || !localStorage.getItem('password')
  ) {
    alert('Вход в учётную запись доступен только после регистрации!');
    formLogin.reset();
    openModalRegister();
    return;
  }

  const formData = new FormData(formLogin);
  const formDataItems = {};

  for (let pair of formData.entries()) {
    formDataItems[pair[0]] = pair[1];
  }

  if ((formDataItems.login == localStorage.getItem('card') || formDataItems.login == localStorage.getItem('email'))
    && formDataItems.password == localStorage.getItem('password')
  ) {
    localStorage.setItem('auth', 'true');
    formLogin.reset();
    toggleDropdown();
    closeModalLogin();
  } else {
    alert('Неверный логин и/или пароль!');
  }
  addVisits();
};

const clickOverlayRegister = e => {
  if (!e.target.closest('.modal-register__wrapper')) {
    closeModalRegister();
  }
};

const clickOverlayLogin = e => {
  if (!e.target.closest('.modal-login__wrapper')) {
    closeModalLogin();
  }
};

export const openModalRegister = e => {
  if (e) {
    e.preventDefault();
  }
  closeModalLogin();
  modalRegister.classList.add('modal_show');
  btnCloseRegister.addEventListener('click', closeModalRegister);
  modalRegister.addEventListener('click', clickOverlayRegister);
  formRegister.addEventListener('submit', register);
  modalRegisterLoginBtn.addEventListener('click', openModalLogin);
  closeDropdown();
};

const closeModalRegister = () => {
  modalRegister.classList.remove('modal_show');
  btnCloseRegister.removeEventListener('click', closeModalRegister);
  modalRegister.removeEventListener('click', clickOverlayRegister);
  modalRegisterLoginBtn.removeEventListener('click', openModalLogin);
};

export const openModalLogin = e => {
  e.preventDefault();
  closeModalRegister();
  modalLogin.classList.add('modal_show');
  btnCloseLogin.addEventListener('click', closeModalLogin);
  modalLogin.addEventListener('click', clickOverlayLogin);
  formLogin.addEventListener('submit', login);
  modalLoginRegisterBtn.addEventListener('click', openModalRegister);
  closeDropdown();
};

const closeModalLogin = () => {
  modalLogin.classList.remove('modal_show');
  btnCloseLogin.removeEventListener('click', closeModalLogin);
  modalLogin.removeEventListener('click', clickOverlayLogin);
  modalLoginRegisterBtn.removeEventListener('click', openModalRegister);
};

export const modal = () => {
  getcardSingupBtn.addEventListener('click', openModalRegister);
  getcardLoginBtn.addEventListener('click', openModalLogin);
};