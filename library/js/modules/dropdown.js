import { openModalRegister, openModalLogin } from "./modal.js";
import { openModalProfile } from "./profile.js";
import { renderLibraryCard } from "./librarycard.js";

const headerProfile = document.querySelector('.header-profile');
const profileDropdown = headerProfile.querySelector('.profile-dropdown');
const headerProfileBtn = headerProfile.querySelector('.header-profile__btn');
const profileDropdownTitle = headerProfile.querySelector('.profile-dropdown__title');

export const getAuth = () => {
  return localStorage.getItem('auth') === 'true'
    && localStorage.getItem('card')
    && localStorage.getItem('name')
    && localStorage.getItem('surname')
    && localStorage.getItem('email')
    && localStorage.getItem('password');
};

const logout = e => {
  e.preventDefault();

  localStorage.setItem('auth', 'false');

  renderLibraryCard();
  toggleDropdown();
  closeDropdown();
};

const showDropdown = () => {
  profileDropdown.classList.toggle('profile-dropdown_show');
  toggleDropdown();
};

const clickOverlayDropdown = ({ target = e.target }) => {
  if (profileDropdown.classList.contains('profile-dropdown_show') && !target.closest('.header-profile__btn') && !target.closest('.profile-dropdown')) {
    closeDropdown();
  }
};

export const closeDropdown = () => {
  profileDropdown.classList.remove('profile-dropdown_show');
  document.removeEventListener('click', clickOverlayDropdown);
};

export const toggleDropdown = () => {
  const dropdownContentsWithAuth = profileDropdown.querySelector('.profile-dropdown__content_with-auth')
  const dropdownContentsNoAuth = profileDropdown.querySelector('.profile-dropdown__content_no-auth')

  if (getAuth()) {
    headerProfile.classList.add('header-profile_auth');
    headerProfileBtn.textContent = localStorage.getItem('name').slice(0, 1) + localStorage.getItem('surname').slice(0, 1);
    headerProfileBtn.title = `${localStorage.getItem('name')} ${localStorage.getItem('surname')}`;
    profileDropdownTitle.textContent = localStorage.getItem('card');
    dropdownContentsWithAuth.classList.add('profile-dropdown__content_show');
    dropdownContentsNoAuth.classList.remove('profile-dropdown__content_show');
  } else {
    headerProfile.classList.remove('header-profile_auth');
    headerProfileBtn.textContent = '';
    headerProfileBtn.title = '';
    profileDropdownTitle.textContent = 'Profile';
    dropdownContentsWithAuth.classList.remove('profile-dropdown__content_show');
    dropdownContentsNoAuth.classList.add('profile-dropdown__content_show');
  }

  document.addEventListener('click', clickOverlayDropdown);
};

const processingHeaderProfile = e => {
  const target = e.target

  if (target.closest('.header-profile__btn')) {
    showDropdown();
    return;
  }

  if (target.closest('.profile-dropdown__login')) {
    openModalLogin(e);
    return;
  }

  if (target.closest('.profile-dropdown__register')) {
    openModalRegister(e);
    return;
  }

  if (target.closest('.profile-dropdown__my-profile')) {
    openModalProfile(e);
    return;
  }

  if (target.closest('.profile-dropdown__logout')) {
    logout(e);
    return;
  }
};

export const dropdown = () => {
  headerProfile.addEventListener('click', processingHeaderProfile);
  toggleDropdown();
};