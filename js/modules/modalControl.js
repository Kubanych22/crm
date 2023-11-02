// управление модальным окном

import {addGoodToPage} from './showGoods.js';
import {form, showTotalGoodsPrice} from './priceControl.js';

const modal = document.querySelector('.modal');
const isChecked = document.querySelector('.checkbox__input');
let discountInput = document.querySelector('.discount-input');
const openModalBtn = document.querySelector('.main__button');
const totalCost = document.querySelector('.form__cost-total');
const list = document.querySelector('.table__tbody');

export const modalControl = () => {
  const openModal = () => {
    modal.classList.remove('close-modal');
    modal.classList.add('open-modal');
    isChecked.checked = false;
    discountInput.disabled = true;
  };
  
  const closeModal = () => {
    modal.classList.remove('open-modal');
    modal.classList.add('close-modal');
  };
  openModalBtn.addEventListener('click', () => {
    openModal();
    form.reset();
    totalCost.textContent = '';
  });
  modal.addEventListener('click', (event) => {
    const target = event.target;
    const closeBtn = target.closest('.modal__close');
    if (target === modal || closeBtn) {
      closeModal(target, closeBtn);
    }
  });
  
  return {
    closeModal,
  };
};

// управление полем ввода дисконта при включении/отключении чекбокса
isChecked.addEventListener('click', () => {
  if (isChecked.checked) {
    discountInput.required = true;
    discountInput.disabled = false;
    discountInput.focus();
  } else {
    discountInput.required = false;
    discountInput.disabled = true;
    discountInput.value = '';
  }
});

// организация ввода нового товара
export const formControl = (form, closeModal) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newGood = Object.fromEntries(formData);
    const totalFormPrice = addGoodToPage(newGood, list);
    showTotalGoodsPrice(totalFormPrice);
    
    form.reset();
    closeModal();
  });
};

// функция установки атрибута required элементам формы

const inputs = document.querySelectorAll('input');
const textAreas = document.querySelectorAll('textarea');

export const setRequiredAttribute = () => {
  [...inputs].map(elem => {
    if (elem.type !== 'checkbox' && elem.type !== 'file') {
      elem.required = true;
    }
  });
  [...textAreas].map(elem => elem.required = true);
};
