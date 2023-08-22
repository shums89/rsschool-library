import { menu } from './modules/menu.js';
import { scroll } from './modules/scroll.js';
import { about } from './modules/about.js';
import { favorites } from './modules/favorites.js';
import { profile } from './modules/profile.js';

const init = () => {
  menu();
  scroll();
  about();
  favorites();
  profile();
};

init();