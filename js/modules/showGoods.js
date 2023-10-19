// отображение таблицы вместе с добавленным товаром

export const addGoodToPage = (good, list) => {
  const {tr, totalFormPrice} = createRow(good);
  list.prepend(tr);
  return totalFormPrice;
};

// создание строки в таблице для добавления товара

export const createRow = (good) => {
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

