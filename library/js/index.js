//====================================================================
// ABOUT
//====================================================================

const aboutSlider = document.querySelector('.about-slider');
const aboutSliderList = aboutSlider.querySelector('.about-slider__list');
const aboutSliderItems = aboutSliderList.querySelectorAll('.about-slider__item');
const aboutSliderControl = aboutSlider.querySelector('.about-slider__controls');
const aboutSliderSwitches = aboutSlider.querySelector('.about-slider__switches');

const changeSlide = (e) => {
  const target = e.target;
  const aboutSliderControls = aboutSliderControl.querySelectorAll('.about-slider__control');
  const slideWidth = +getComputedStyle(aboutSliderItems[0]).width.replace('px', '') + +getComputedStyle(aboutSliderList).gap.replace('px', '');
  let currentSlide = 0;

  aboutSliderControls.forEach((element, index) => {
    if (element.closest('.about-slider__control_current')) {
      currentSlide = index;
    }
  });

  if (target.closest('.about-slider__control_current')
    || (target.closest('.about-slider__switch_prev') && currentSlide === 0)
    || (target.closest('.about-slider__switch_next') && currentSlide === --aboutSliderControls.length)
  ) {
    return;
  }

  if (target.closest('.about-slider__switch_prev')) {
    console.log('prev');
    currentSlide--;
  } else if (target.closest('.about-slider__switch_next')) {
    console.log('next');
    currentSlide++;
  } else if (target.closest('.about-slider__control')) {
    console.log('control');
    aboutSliderControls.forEach((element, index) => {
      if (element === target) {
        currentSlide = index;
      }
    });
  }

  aboutSliderControls.forEach((element, index) => {
    element.classList.remove('about-slider__control_current');

    if (index === currentSlide) {
      element.classList.add('about-slider__control_current');
    }
  });

  aboutSliderList.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
  aboutSlider.querySelector('.about-slider__switch_prev').disabled = (currentSlide === 0);
  aboutSlider.querySelector('.about-slider__switch_next').disabled = (currentSlide === --aboutSliderControls.length);

};

aboutSliderControl.addEventListener('click', changeSlide);
aboutSliderSwitches.addEventListener('click', changeSlide);

//====================================================================
// FAVORITES
//====================================================================

const tab = document.querySelector('.tabs');
const tabHeader = tab.querySelector('.tabs-header');

const debounce = (callee, timeoutMs) => {
  return function perform(...args) {
    let previousCall = this.lastCall

    this.lastCall = Date.now()

    if (previousCall && this.lastCall - previousCall <= timeoutMs) {
      clearTimeout(this.lastCallTimer)
    }

    this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs)
  }
};

const hideSeason = () => {
  const tabsContentSeason = tab.querySelector('.tabs-content__seasons');
  tabsContentSeason.classList.add('fade-in');
  tabsContentSeason.classList.remove('fade-out');
};

const changeSeasons = (e) => {
  const target = e.target;
  const tabsContentSeason = tab.querySelector('.tabs-content__seasons');
  const tabsContentSeasons = tab.querySelectorAll('.tabs-content__season');

  tabsContentSeasons.forEach((element) => {
    if (element.closest(`.${target.value}`)) {
      element.classList.remove('visually-hidden');
    } else {
      element.classList.add('visually-hidden');
    }
  });

  tabsContentSeason.classList.remove('fade-in');
  tabsContentSeason.classList.add('fade-out');
};

const changeSeasonsWithDebounce = debounce(changeSeasons, 1000)

tabHeader.addEventListener('change', hideSeason);
tabHeader.addEventListener('change', changeSeasonsWithDebounce);

//====================================================================
// PROFILE
//====================================================================

const headerProfile = document.querySelector('.header-profile');
const profileDropdown = headerProfile.querySelector('.profile-dropdown');

const closeDropdown = e => {
  if (profileDropdown.classList.contains('profile-dropdown_show') && !e.target.closest('.header-profile__btn') && !e.target.closest('.profile-dropdown')) {
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

const processingHeaderProfile = e => {
  const target = e.target;

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

headerProfile.addEventListener('click', processingHeaderProfile);
