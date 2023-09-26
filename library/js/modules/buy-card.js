const modalBuyCard = document.querySelector('.modal-buy-card');
const btnpPofileClose = modalBuyCard.querySelector('.modal-buy-card__close');
const buyCardBtn = modalBuyCard.querySelector('.modal-buy-card__buy');
const formBuyCard = document.querySelector('.modal-buy-card__form');

const buyCard = e => {
  e.preventDefault();

  localStorage.setItem('buy-card', 'true');
  formBuyCard.reset();
  closeModalBuyCard();
};

const clickOverlayBuyCard = e => {
  if (!e.target.closest('.modal-buy-card__wrapper')) {
    closeModalBuyCard();
  }
};

export const openModalBuyCard = e => {
  e.preventDefault();
  modalBuyCard.classList.add('modal_show');
  formBuyCard.addEventListener('submit', buyCard);
  modalBuyCard.addEventListener('click', clickOverlayBuyCard);
  btnpPofileClose.addEventListener('click', closeModalBuyCard);
};

const closeModalBuyCard = () => {
  modalBuyCard.classList.remove('modal_show');
  formBuyCard.removeEventListener('submit', buyCard);
  modalBuyCard.removeEventListener('click', clickOverlayBuyCard);
  btnpPofileClose.removeEventListener('click', closeModalBuyCard);
};

