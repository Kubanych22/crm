// управление модальным окном

import {addGoodToPage} from './showGoods.js';
import {form, showTotalGoodsPrice} from './priceControl.js';
import {URL} from './renderGoods.js';

const modal = document.querySelector('.modal');
const isChecked = document.querySelector('.checkbox__input');
const discountInput = document.querySelector('.discount-input');
const openModalBtn = document.querySelector('.main__button');
const totalCost = document.querySelector('.form__cost-total');
const list = document.querySelector('.table__tbody');
const submitBnt = document.querySelector('.form__submit-button')

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
export const modalControl = () => {
  openModalBtn.addEventListener('click', () => {
    form.reset();
    openModal();
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

export const fetchRequest = async (url, {
  method = 'GET',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    
    if (headers) {
      options.headers = headers;
    }
    const response = await fetch(url, options);
    if (response.status === 404 || response.status === 422 || response.status >= 500) {
      callback(new Error(`Ошибка! Проанализируйте код ошибки: ${response.status}- ${response.statusText}`));
      return;
    }
    if (response.ok) {
      const data = await response.json();
      if (callback) {
        callback(null, data);
        form.reset();
        closeModal();
        return;
      }
    }
    throw new Error(`Неизвестная ошибка!: ${response.status}- ${response.statusText}`);
  } catch (err) {
    callback(err);
  }
};

// создание модального окна при возникновении ошибок
const createErrorPage = (errorMessage) => {
  const errorModal = document.createElement('div');
  errorModal.classList.add('modal__error');
  errorModal.classList.remove('modal__error-hide');
  errorModal.innerHTML = `
        <svg class="error__img" xmlns="http://www.w3.org/2000/svg" width="94" height="94" viewBox="0 0 94 94" fill="none">
          <path d="M2 2L92 92" stroke="#D80101" stroke-width="3" stroke-linecap="round"/>
          <path d="M2 92L92 2" stroke="#D80101" stroke-width="3" stroke-linecap="round"/>
        </svg>
        <p class="error__message">${errorMessage}</p>
        <button class="modal__error-close" type="button">
          <svg class="modal__close-img" viewBox="0 0 24 24" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2L22 22" stroke-width="3" stroke-linecap="round"/>
            <path d="M2 22L22 2" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </button>
    `;
  return errorModal;
};

export const renderGood = (err, data) => {
  if (err) {
    const errorModal = createErrorPage('Что-то пошло не так');
    form.append(errorModal);
    console.log(err);
    const handleModal = (evt) => {
      evt.preventDefault();
      const target = evt.target;
      const closeBtn = target.closest('.modal__error-close');
      if (!errorModal || closeBtn) {
        form.reset();
        errorModal.classList.add('modal__error-hide');
        errorModal.classList.remove('modal__error');
        closeModal();
      }
    };
    modal.addEventListener('click', handleModal);
    return;
  }
  const {totalGoodPrice} = addGoodToPage(data, list);
  showTotalGoodsPrice(totalGoodPrice);
};

const inputElement = document.querySelector('.form__input-button');
const message = document.createElement('p');

export const getImgFile = () => {
  inputElement.addEventListener('change', handleFiles, false);
};

const chechFileSize = (file) => {
  if (file.size > 1024 * 1024) {
    message.classList.add('too__large-img');
    message.textContent = 'Изображение не должно превышать размер 1 Мб';
    form.append(message);
    submitBnt.disabled = true;
    return false;
  } else {
    message.remove();
    submitBnt.disabled = false;
    return true;
  }
};

const handleFiles = async () => {
  message.remove();
  const file = inputElement.files[0];
  
  if (!chechFileSize(file)) {
    return;
  }
};

// организация ввода нового товара
export const formControl = (form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const newGood = Object.fromEntries(formData);
    await fetchRequest(`${URL}/api/goods/`, {
      method: 'POST',
      body: newGood,
      callback: renderGood,
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
