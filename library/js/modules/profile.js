const headerProfile = document.querySelector('.header-profile');
const profileDropdown = headerProfile.querySelector('.profile-dropdown');

const closeDropdown = ({ target = e.target }) => {
  if (profileDropdown.classList.contains('profile-dropdown_show') && !target.closest('.header-profile__btn') && !target.closest('.profile-dropdown')) {
    profileDropdown.classList.remove('profile-dropdown_show');
    document.removeEventListener('click', closeDropdown);
  }
};

const toggleDropdown = () => {
  profileDropdown.classList.toggle('profile-dropdown_show');

  if (profileDropdown.matches('.profile-dropdown_show')) {
    const dropdownContents = profileDropdown.querySelectorAll('.profile-dropdown__content')
    const auth = false ? 'with-auth' : 'no-auth';

    dropdownContents.forEach(element => {
      if (element.matches(`.profile-dropdown__content_${auth}`)) {
        element.classList.add('profile-dropdown__content_show');
      } else {
        element.classList.remove('profile-dropdown__content_show');
      }
    });

    document.addEventListener('click', closeDropdown);
  }
};

const processingHeaderProfile = ({ target = e.target }) => {
  if (target.closest('.header-profile__btn')) {
    toggleDropdown();
    return;
  }

  if (target.closest('.profile-dropdown__login')) {
    console.log('log in');
    return;
  }

  if (target.closest('.profile-dropdown__register')) {
    console.log('register');
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
};