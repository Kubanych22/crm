// отображение таблицы вместе с добавленным товаром
import {URL} from './renderGoods.js';

export const addGoodToPage = (good, list) => {
  const {tr, totalGoodPrice} = createRow(good);
  list.prepend(tr);
  return {tr, totalGoodPrice};
};

// создание строки в таблице для добавления товара
export const createRow = (good) => {
  const tr = document.createElement('tr');
  let td;
  let btn = document.createElement('button');
  
  const id = document.createElement('td');
  id.textContent = good.id;
  tr.append(id);
  
  const goodName = document.createElement('td');
  goodName.textContent = good.title;
  goodName.classList.add('product__name')
  tr.append(goodName);
  
  const category = document.createElement('td');
  category.textContent = good.category;
  tr.append(category);
  
  const units = document.createElement('td');
  units.textContent = good.units;
  tr.append(units)
  
  const countTd = document.createElement('td');
  countTd.textContent = good.count;
  tr.append(countTd);
  const count = Number(good.count)
  
  const priceTd = document.createElement('td');
  priceTd.textContent = good.price + ' ₽';
  tr.append(priceTd)
  const price = Number(good.price)
  
  const discountTd = document.createElement('td');
  discountTd.textContent = good.discount;
  discountTd.hidden = true;
  tr.append(discountTd);
  const discount = Number(good.discount);
  let totalGoodPrice;
  if (discount !== 0) {
    totalGoodPrice = (price - (price * discount) / 100) * count;
  } else {
    totalGoodPrice = price * count;
  }
  td = document.createElement('td');
  td.textContent = totalGoodPrice + ' ₽';
  td.classList.add('total-cost');
  tr.append(td);
  
  td = document.createElement('td');
  td.classList.add('table__button-no-img');
  btn.classList.add('button-contain-img');
  const imageGood = document.createElement('img');
  imageGood.src = `${URL}/${good.image}`;
  btn.append(imageGood);
  td.append(btn);
  tr.append(td);
  td = document.createElement('td');
  td.classList.add('table__button-edit');
  td.innerHTML = `<button class="button-edit"></button>`;
  tr.append(td);
  td = document.createElement('td');
  td.classList.add('table__button-delete');
  td.innerHTML = `<button class="button-delete"></button>`;
  tr.append(td);
  return {tr, totalGoodPrice};
};


