const modal = document.querySelector('.modal');
const form = document.querySelector('.modal__form');
const openModalBtn = document.querySelector('.main__button');
const table = document.querySelector('.table');
const list = document.querySelector('.table__tbody');
const inputs = document.querySelectorAll('input');
const textAreas = document.querySelectorAll('textarea');
let discountInput = document.querySelector('.discount-input');
const isChecked = document.querySelector('.checkbox__input');
const totalCost = document.querySelector('.form__cost-total');
const mainTotalPrice = document.querySelector('.main__total-price');

// функция установки атрибута required элементам формы
const setRequiredAttribute = () => {
  [...inputs].map(elem => {
    if (elem.type !== 'checkbox' && elem.type !== 'file') {
      elem.required = true;
    }
  });
  [...textAreas].map(elem => elem.required = true);
};

// удаление строки с товаром в таблице
const deleteGood = () => {
  const deleteRow = (event) => {
    const target = event.target;
    const btnDel = target.closest('.table__button-delete');
    const delRow = btnDel.closest('tr');
    const priceGoodTd = delRow.querySelector('.total-cost');
    let priceGood = priceGoodTd.textContent.substring(1);
    priceGood = -Number(priceGood);
    delRow.remove();
    showTotalGoodsPrice(priceGood);
  };
  
  table.addEventListener('click', deleteRow);
};

// функцмя для отображения итоговой цены при добавлении товара
const priceControl = () => {
  const setTotalPrice = () => {
    const count = form.count.value;
    const discount = form.discount.value;
    const price = form.price.value;
    const totalFormCost = document.querySelector('.form__cost-total');
    let totalFormPrice;
    if (discount !== null) {
      totalFormPrice = (price - (price * discount) / 100) * count;
    } else {
      totalFormPrice = price * count;
    }
    
    totalFormCost.textContent = '$' + totalFormPrice;
  };
  
  ['click', 'keyup', 'change'].forEach(event =>
      form.addEventListener(event, setTotalPrice));
};

// управление модальным окном
const modalControl = () => {
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

// создание строки в таблице для добавления товара
const createRow = (good) => {
  const checkDiscount = ({discount, price}) => {
    return (price - (price * discount) / 100);
  };
  const tr = document.createElement('tr');
  let td = document.createElement('td');
  const idp = document.querySelector('.modal__product-id');
  td.textContent = idp.querySelector('span').textContent;
  tr.append(td);
  let {count, price} = good;
  const entries = Object.entries(good);
  for (const [key, value] of entries) {
    if (key === 'description' || key === 'file') {
      continue;
    }
    if (key === 'checkbox__discount' || key === 'discount') {
      price = checkDiscount(good);
      continue;
    }
    if (key === 'price') {
      td = document.createElement('td');
      td.textContent = '$' + value;
      tr.append(td);
      continue;
    }
    
    td = document.createElement('td');
    td.textContent = value.toString();
    tr.append(td);
  }
  let totalFormPrice = price * count;
  td = document.createElement('td');
  td.textContent = '$' + totalFormPrice;
  td.classList.add('total-cost');
  tr.append(td);
 
// вывод для нового товара кнопок добавления изображения, редактирования и удаления
  td = document.createElement('td');
  td.classList.add('table__button-no-img');
  td.innerHTML = `<button class="button-contain-img"></button>`;
  tr.append(td);
  td = document.createElement('td');
  td.classList.add('table__button-edit');
  td.innerHTML = `<button class="button-edit"></button>`;
  tr.append(td);
  td = document.createElement('td');
  td.classList.add('table__button-delete');
  td.innerHTML = `<button class="button-delete"></button>`;
  tr.append(td);
  
  return {
    tr,
    totalFormPrice,
  };
};

// отображение таблицы вместе с добавленным товаром
const addGoodToPage = (good, list) => {
  const {tr, totalFormPrice} = createRow(good);
  list.prepend(tr);
  return totalFormPrice;
};

// вычисление общей суммы товаров в таблице
const calculateTotalPrice = () => {
  const prices = document.querySelectorAll('.total-cost');
  let totalGoodsPrice = [...prices].reduce((total, price) => total + Number(price.innerText.substring(1)), 0);
  showTotalGoodsPrice(totalGoodsPrice);
};

// Отображение общей суммы. Вся таблица не пересчитывается.
// При добавлении товара, его сумма добавляется к общей сумме
// При удалении отнимается.
const showTotalGoodsPrice = (totalFormPrice) => {
  let totalGoodsPrice = Number(mainTotalPrice.textContent.substring(1));
  totalGoodsPrice = totalGoodsPrice + totalFormPrice;
  mainTotalPrice.textContent = '$' + totalGoodsPrice;
};

// управление модальным окном, организация ввода нового товара
const formControl = (form, list, closeModal) => {
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

const init = () => {
  setRequiredAttribute(inputs);
  calculateTotalPrice();
  modalControl();
  priceControl();
  deleteGood();
  const {closeModal} = modalControl();
  formControl(form, list, closeModal);
};

init();
