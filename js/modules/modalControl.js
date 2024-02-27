// управление модальным окном
import {setTotalPrice, showTotalGoodsPrice} from './priceControl.js';
import {loadGoods, renderGoods, URL} from './renderGoods.js';
import showModal from './modal.js';
import {addGoodToPage} from './showGoods';

let modal;
const openModalBtn = document.querySelector('.main__button');
const list = document.querySelector('.table__tbody');

export let newImage;

const openModal = (isChecked, discountInput) => {
  modal.classList.remove('close-modal');
  modal.classList.add('open-modal');
  isChecked.checked = false;
  discountInput.disabled = true;
};

export const closeModal = () => {
  modal.remove();
};

export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener('loadend', () => {
    resolve(reader.result);
  });
  
  reader.addEventListener('error', err => {
    reject(err);
  });
  reader.readAsDataURL(file);
});

// организация ввода и отправки нового товара
export const formControl = async (form) => {
  let newGood;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const target = event.target;
    const formData = new FormData(target);
    newGood = Object.fromEntries(formData);
    newGood.image = await toBase64(newGood.image);
    await fetchRequest(`${URL}/api/goods/`, {
      method: 'POST',
      body: newGood,
      callback: renderGood,
      headers: {
        'Content-type': 'application/json',
      },
    });
    closeModal();
    const list = document.querySelector('.table__tbody');
    list.innerHTML = '';
    loadGoods(renderGoods);
  });
  
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  });
  
  // функция установки атрибута required элементам формы
  
  const inputs = document.querySelectorAll('input');
  const textAreas = document.querySelectorAll('textarea');
  
  const setRequiredAttribute = () => {
    [...inputs].map(elem => {
      if (elem.type !== 'checkbox' && elem.type !== 'file') {
        elem.required = true;
      }
    });
    [...textAreas].map(elem => elem.required = true);
  };
  
  setRequiredAttribute();
};

export const showGoodImgPreview = (file) => {
  const formField = document.querySelector('.form__field');
  const wrapper = document.createElement('div');
  wrapper.classList.add('preview');
  wrapper.style.width = 150 + 'px';
  wrapper.style.gridColumn = 2;
  wrapper.style.justifySelf = 'center';
  const img = document.createElement('img');
  img.src = file;
  wrapper.append(img);
  formField.append(wrapper);
};

export const modalControl = async (method) => {
  modal = await showModal();
  const form = modal.querySelector('.modal__form');
  const isChecked = document.querySelector('.checkbox__input');
  const discountInput = document.querySelector('.discount-input');
  
  openModal(isChecked, discountInput);
  const totalCost = document.querySelector('.form__cost-total');
  totalCost.textContent = '';
  
  modal.addEventListener('click', (event) => {
    const target = event.target;
    const closeBtn = target.closest('.modal__close');
    if (target === modal || closeBtn) {
      closeModal(target, closeBtn);
    }
  });
  
  const countInput = document.querySelector('input[name=count]');
  const discountInputForm = document.querySelector('input[name=discount]');
  const priceInput = document.querySelector('input[name=price]');
  
  [countInput, discountInputForm, priceInput].forEach(item => {
    item.addEventListener('change', () => {
      setTotalPrice(form);
    });
  });
  
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
  
  if (method !== 'PATCH') {
    await formControl(form);
  }
  
  const inputElement = document.querySelector('.form__input-button');
  const message = document.createElement('p');
  
  inputElement.addEventListener('change', async () => {
    const file = inputElement.files[0];
    if (chechFileSize(file, message, form)) {
      newImage = await toBase64(file);
      showGoodImgPreview(newImage);
    }
  });
  
  const chechFileSize = (file, message, form) => {
    const submitBnt = document.querySelector('.form__submit-button');
    const preview = document.querySelector('.preview');
    if (preview) {
      preview.remove();
    }
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
  return {modal, closeModal};
};

openModalBtn.addEventListener('click', modalControl);

export const fetchRequest = async (url, {
  method,
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
      const dataObject = await response.json();
      const data = dataObject.goods ? dataObject.goods : dataObject;
      if (callback) {
        return callback(null, data);
      }
    }
    throw new Error(`Неизвестная ошибка!: ${response.status}- ${response.statusText}`);
  } catch (err) {
    return callback(err);
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
    const form = modal.querySelector('.modal__form');
    form.append(errorModal);
    console.log(err);
    const handleModal = (evt) => {
      evt.preventDefault();
      const target = evt.target;
      const closeBtn = target.closest('.modal__error-close');
      if (!errorModal || closeBtn) {
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

