import {calculateTotalPrice} from './priceControl.js';
import {createRow} from './showGoods.js';

const method = 'GET';
export const URL = 'https://ossified-synonymous-centipede.glitch.me';
// export const URL = 'http://localhost:3000';

export let pages = 1;
export const loadGoods = (callback, page = 1) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, `${URL}/api/goods/?page=${page.toString()}`);
  xhr.addEventListener('load', () => {
    const dataObject = JSON.parse(xhr.response);
    pages = dataObject.pages;
    const data = dataObject.goods;
    callback(data);
  });
  
  xhr.addEventListener('error', () => {
    console.log(new Error(xhr.status), xhr.response);
  });
  
  xhr.send();
};

export const renderGoods = (data) => {
  const list = document.querySelector('.table__tbody');
  const goods = data.map((good) => {
    const {tr, totalGoodPrice} = createRow(good);
    list.append(tr);
    return totalGoodPrice;
  });
  calculateTotalPrice();
};
