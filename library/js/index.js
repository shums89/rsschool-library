import { menu } from './modules/menu.js';
import { scroll } from './modules/scroll.js';
import { about } from './modules/about.js';
import { favorites } from './modules/favorites.js';
import { modal } from './modules/modal.js';
import { dropdown } from './modules/dropdown.js';

const init = () => {
  menu();
  scroll();
  about();
  favorites();
  modal();
  dropdown();
};

init();