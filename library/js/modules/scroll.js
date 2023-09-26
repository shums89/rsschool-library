import { closeMenu } from './menu.js';

export const scroll = () => {
  const links = document.querySelectorAll('.header-nav__link');

  links.forEach(link => {
    link.addEventListener('click', () => {
      const id = link.getAttribute('href');
      const section = document.querySelector(id);

      if (section) {
        seamless.scrollIntoView(section, {
          behavior: "smooth",
          block: "start",
          inline: "center",
        });
      }

      closeMenu();
    });
  });
};