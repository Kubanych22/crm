// удаление строки с товаром в таблице

import {showTotalGoodsPrice} from './priceControl.js';
import {fetchRequest} from './modalControl.js';
import {URL} from './renderGoods.js';

const table = document.querySelector('.table');

export const serviceFeatures = () => {
  const deleteRow = async (delRow) => {
    const id = delRow.firstChild.textContent;
    const priceGoodTd = delRow.querySelector('.total-cost');
    let priceGood = priceGoodTd.textContent.substring(0, priceGoodTd.textContent.length - 2);
    priceGood = -Number(priceGood);
    delRow.remove();
    showTotalGoodsPrice(priceGood);
    await fetchRequest(`${URL}/api/goods/${id}`, {
      method: 'DELETE',
      callback: callback(),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  
  const showPicture = (btnPict, tr) => {
    const nameProduct = tr.querySelector('.product__name');
    const urlPict = btnPict.children[0].src;
    const width = 600;
    const height = 600;
    const top = (screen.height / 2) - height / 2;
    const left = (screen.width / 2) - width / 2;
    const newPage = open('about:blank', '', `width=${width},height=${height},top=${top},left=${left}`);
    
    const productName = document.createElement('h2');
    productName.classList.add('product__name');
    productName.textContent = nameProduct.textContent;
    productName.style.textAlign = 'center';
    productName.style.paddingTop = '20px';
    
    const img = document.createElement('img');
    img.classList.add('product__image');
    img.src = urlPict;
    img.alt = 'Изображение товара';
    img.style.marginBottom = '10px';
    
    const detailInformation = document.createElement('p');
    detailInformation.innerHTML = `
      Для получения более подробной информации о товаре обратитесь в отдел продаж по телефону:
      <a href="tel:4951234567">(495) 123-45-67</a>
    `;
    newPage.document.body.append(productName, img, detailInformation);
  };
  
  function callback() {
    return function () {
      return undefined;
    };
  }
  
  table.addEventListener('click', async (e) => {
    e.preventDefault();
    const target = e.target;
    const btnDel = target.closest('.button-delete');
    const btnPict = target.closest('.button-contain-img');
    if (btnDel) {
      const delRow = target.closest('tr');
      await deleteRow(delRow);
    }
    if (btnPict) {
      const tr = target.closest('tr');
      showPicture(btnPict, tr);
    }
  });
};

