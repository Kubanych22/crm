import loadStyle from './loadStyle.js';
import {CATEGORY} from './search.js';

const checkInputs = () => {
  const checkName = () => {
    const input = document.querySelector('.good__name');
    checkInput(input);
  };
  
  const checkCategory = () => {
    const input = document.querySelector('.good__category');
    checkInput(input);
  };
  
  const checkDescription = () => {
    const input = document.querySelector('.good__description');
    checkInput(input);
  };
  
  const checkUnit = () => {
    const input = document.querySelector('.good__unit');
    checkInput2(input);
  };
  
  const checkAmount = () => {
    const input = document.querySelector('.good__amount');
    checkInputNumbers(input);
  };
  
  const checkSearch = () => {
    const input = document.querySelector('.search__input');
    checkInput(input);
  };
  
  checkName()
  checkCategory()
  checkDescription()
  checkUnit()
  checkAmount()
};

const checkInput = (input) => {
  input.addEventListener('input', (e) => {
    e.preventDefault();
    input.value = input.value.replace(/([^a-zA-Zа-яёЁ0-9 _-]+)$/ig, '')
  });
};

const checkInput2 = (input) => {
  input.addEventListener('input', (e) => {
    e.preventDefault();
    input.value = input.value.replace(/[^а-я]/ig, '')
  });
};

const checkInputNumbers = (input) => {
  input.addEventListener('input', (e) => {
    e.preventDefault();
    input.value = input.value.replace(/\D/ig, '')
  });
};

const showModal = async (err, data) => {
  await loadStyle('style/modal.css');
  const modal = document.createElement('div');
  modal.classList.add('modal', 'close-modal');
  
  const container = document.createElement('div');
  container.classList.add('modal__container');
  
  const form = document.createElement('form');
  form.classList.add('modal__form', 'form');
  
  const product = document.createElement('div');
  product.classList.add('modal__product');
  const title = document.createElement('h2');
  title.classList.add('modal__title');
  title.textContent = 'Добавить товар';
  product.append(title);
  
  const hr = document.createElement('hr');
  hr.classList.add('form__line', 'line');
  
  let fieldset = document.createElement('fieldset');
  fieldset.classList.add('form__field');
  
  const wrapper = document.createElement('div');
  wrapper.classList.add('form__field-wrapper');
  let label = document.createElement('label');
  label.classList.add('form__label');
  let span = document.createElement('span');
  span.classList.add('form__label-text');
  span.textContent = 'Наименование';
  let input = document.createElement('input');
  input.classList.add('form__input', 'good__name');
  input.type = 'text';
  input.name = 'title';
  label.append(span, input);
  
  wrapper.append(label);
  
  label = document.createElement('label');
  label.classList.add('form__label');
  span = document.createElement('span');
  span.classList.add('form__label-text');
  span.textContent = 'Категория';
  input = document.createElement('input');
  input.classList.add('form__input', 'good__category');
  input.name = 'category';
  input.setAttribute('list', 'category-list');
  label.append(span, input);
  
  wrapper.append(label);
  
  const dataList = document.createElement('datalist');
  dataList.id = 'category-list';
  CATEGORY.map(item => {
    let option = document.createElement('option');
    option.value = item;
    dataList.append(option);
  })
  
  wrapper.append(dataList);
  fieldset.append(wrapper);
  
  label = document.createElement('label');
  label.classList.add('form__label');
  span = document.createElement('span');
  span.classList.add('form__label-text');
  span.textContent = 'Описание';
  const textArea = document.createElement('textarea');
  textArea.classList.add('form__textarea', 'good__description');
  textArea.name = 'description';
  textArea.maxLength = 240;
  label.append(span, textArea);
  fieldset.append(label);
  
  label = document.createElement('label');
  label.classList.add('form__label');
  span = document.createElement('span');
  span.classList.add('form__label-text');
  span.textContent = 'Единицы измерения';
  input = document.createElement('input');
  input.classList.add('form__input', 'good__unit');
  input.name = 'units';
  label.append(span, input);
  fieldset.append(label);
  
  label = document.createElement('label');
  label.classList.add('form__label');
  span = document.createElement('span');
  span.classList.add('form__label-text');
  span.textContent = 'Количество';
  input = document.createElement('input');
  input.classList.add('form__input', 'good__amount');
  input.name = 'count';
  input.type = 'number';
  label.append(span, input);
  fieldset.append(label);
  
  label = document.createElement('label');
  label.classList.add('form__label');
  label.classList.add('checkbox');
  span = document.createElement('span');
  span.classList.add('form__label-text');
  span.textContent = 'Дисконт, %';
  const checkboxInput= document.createElement('input');
  checkboxInput.classList.add('form__input', 'checkbox__input');
  checkboxInput.type = 'checkbox';
  checkboxInput.name = 'checkbox__discount';
  input = document.createElement('input');
  input.classList.add('form__input', 'good__discount');
  input.classList.add('discount-input');
  input.name = 'discount';
  input.type= 'number';
  input.step = 'any';
  label.append(span, checkboxInput, input);
  fieldset.append(label);
  
  label = document.createElement('label');
  label.classList.add('form__label');
  label.classList.add('form__label-last');
  span = document.createElement('span');
  span.classList.add('form__label-text');
  span.textContent = 'Цена';
  input = document.createElement('input');
  input.classList.add('form__input', 'good__price');
  input.name = 'price';
  input.type = 'number';
  input.step = 'any';
  label.append(span, input);
  fieldset.append(label);
  
  label = document.createElement('label');
  label.classList.add('form__label');
  label.classList.add('form__button', 'btn');
  span = document.createElement('span');
  span.classList.add('form__label-text');
  span.textContent = 'Добавить изображение';
  input = document.createElement('input');
  input.classList.add('form__input-button');
  input.name = 'image';
  input.type = 'file';
  input.accept = 'image/*';
  label.append(span, input);
  fieldset.append(label);
  form.append(product, hr, fieldset);
  
  const resultFieldSet = document.createElement('fieldset');
  
  resultFieldSet.classList.add('form__result');
  const paragraph = document.createElement('p');
  paragraph.classList.add('form__cost');
  span = document.createElement('span');
  span.classList.add('form__cost-text');
  span.textContent = 'Итоговая стоимость:\u00A0';
  const total = document.createElement('span');
  total.classList.add('form__cost-total');
  paragraph.append(span, total);
  
  const button = document.createElement('button');
  button.classList.add('form__submit-button', 'btn');
  button.type = 'submit';
  button.textContent = 'Добавить товар';
  
  resultFieldSet.append(paragraph, button);
  
  form.append(resultFieldSet);
  
  const close = document.createElement('button');
  close.classList.add('modal__close');
  close.type = 'button';
  close.innerHTML = `
    <svg class="modal__close-img" viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2L22 22" stroke-width="3" stroke-linecap="round"/>
      <path d="M2 22L22 2" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `;
  
  container.append(form, close);
  modal.append(container);
  document.body.append(modal);
  
  checkInputs();
  
  new Promise(resolve => {
    close.addEventListener('click', () => {
      modal.remove();
      resolve(true);
    });
  });
  return modal;
};

export default showModal;
