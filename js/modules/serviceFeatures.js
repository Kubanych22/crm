// удаление строки с товаром в таблице

import {showTotalGoodsPrice} from './priceControl.js';

const table = document.querySelector('.table');

export const deleteGood = () => {
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
