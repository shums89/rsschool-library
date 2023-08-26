import { openModalRegister } from "./modal.js";

const headerProfile = document.querySelector('.header-profile');
const profileDropdown = headerProfile.querySelector('.profile-dropdown');
const headerProfileBtn = headerProfile.querySelector('.header-profile__btn');
const profileDropdownTitle = headerProfile.querySelector('.profile-dropdown__title');

const getAuth = () => {
  return localStorage.getItem('card') && localStorage.getItem('name') && localStorage.getItem('surname') && localStorage.getItem('email');
};

const showDropdown = () => {
  profileDropdown.classList.toggle('profile-dropdown_show');
  toggleDropdown();
};

const closeDropdown = ({ target = e.target }) => {
  if (profileDropdown.classList.contains('profile-dropdown_show') && !target.closest('.header-profile__btn') && !target.closest('.profile-dropdown')) {
    profileDropdown.classList.remove('profile-dropdown_show');
    document.removeEventListener('click', closeDropdown);
  }
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
    dropdownContentsWithAuth.classList.remove('profile-dropdown__content_show');
    dropdownContentsNoAuth.classList.add('profile-dropdown__content_show');
  }

  document.addEventListener('click', closeDropdown);
};

const processingHeaderProfile = ({ target = e.target }) => {
  if (target.closest('.header-profile__btn')) {
    showDropdown();
    return;
  }

  if (target.closest('.profile-dropdown__login')) {
    console.log('log in');
    return;
  }

  if (target.closest('.profile-dropdown__register')) {
    openModalRegister();
    return;
  }

  if (target.closest('.profile-dropdown__my-profile')) {
    console.log('my profile');
    return;
  }

  if (target.closest('.profile-dropdown__logout')) {
    console.log('log out');
    return;
  }
};

export const profile = () => {
  headerProfile.addEventListener('click', processingHeaderProfile);
  toggleDropdown();
};