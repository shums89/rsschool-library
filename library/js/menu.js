const headerNav = document.querySelector('.header-nav');
const headerNavToggle = headerNav.querySelector('.header-nav__toggle');

headerNav.classList.remove('header-nav_nojs');
headerNavToggle.addEventListener('click', (() => {
  headerNav.classList.contains('header-nav_closed') ? openMenu() : closeMenu();
}));

document.addEventListener('click', (e => {
  if (headerNav.classList.contains('header-nav_opened') && !(e.target.closest('.header-nav') || e.target.closest('.header-nav__toggle'))) {
    closeMenu();
  }
}));

const openMenu = () => {
  headerNav.classList.remove('header-nav_closed');
  headerNav.classList.add('header-nav_opened');
};

const closeMenu = () => {
  headerNav.classList.add('header-nav_closed');
  headerNav.classList.remove('header-nav_opened');
};