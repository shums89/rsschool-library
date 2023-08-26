const headerNav = document.querySelector('.header-nav');
const headerNavToggle = headerNav.querySelector('.header-nav__toggle');

const openMenu = () => {
  headerNav.classList.remove('header-nav_closed');
  headerNav.classList.add('header-nav_opened');
  document.addEventListener('click', closeMenuOverlay);
};

const closeMenuOverlay = ({ target = e.target }) => {
  if (headerNav.classList.contains('header-nav_opened') && !target.closest('.header-nav') && !target.closest('.header-nav__toggle')) {
    closeMenu();
  }
};

const showMenu = () => {
  headerNav.classList.contains('header-nav_closed') ? openMenu() : closeMenu();
};

export const closeMenu = () => {
  headerNav.classList.add('header-nav_closed');
  headerNav.classList.remove('header-nav_opened');
  document.removeEventListener('click', closeMenuOverlay);
};

export const menu = () => {
  headerNav.classList.remove('header-nav_nojs');
  headerNavToggle.addEventListener('click', showMenu);
  document.addEventListener('click', closeMenuOverlay);
  closeMenu();
};