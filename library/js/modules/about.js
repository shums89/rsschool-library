const aboutSlider = document.querySelector('.about-slider');
const aboutSliderList = aboutSlider.querySelector('.about-slider__list');
const aboutSliderItems = aboutSliderList.querySelectorAll('.about-slider__item');
const aboutSliderControl = aboutSlider.querySelector('.about-slider__controls');
const aboutSliderSwitches = aboutSlider.querySelector('.about-slider__switches');

const changeSlide = ({ target = e.target }) => {
  const aboutSliderControls = aboutSliderControl.querySelectorAll('.about-slider__control');
  const slideWidth = +getComputedStyle(aboutSliderItems[0]).width.replace('px', '') + +getComputedStyle(aboutSliderList).gap.replace('px', '');
  const countSlides = aboutSliderControls.length - 1;
  let currentSlide = 0;

  aboutSliderControls.forEach((element, index) => {
    if (element.closest('.about-slider__control_current')) {
      currentSlide = index;
    }
  });

  if (target.closest('.about-slider__control_current')
    || (target.closest('.about-slider__switch_prev') && currentSlide === 0)
    || (target.closest('.about-slider__switch_next') && currentSlide === countSlides)
  ) {
    return;
  }

  if (target.closest('.about-slider__switch_prev')) {
    currentSlide--;
  } else if (target.closest('.about-slider__switch_next')) {
    currentSlide++;
  } else if (target.closest('.about-slider__control')) {
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
  aboutSlider.querySelector('.about-slider__switch_next').disabled = (currentSlide === countSlides);
};

export const about = () => {
  aboutSliderControl.addEventListener('click', changeSlide);
  aboutSliderSwitches.addEventListener('click', changeSlide);
};