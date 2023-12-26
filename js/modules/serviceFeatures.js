// удаление строки с товаром в таблице

import {setTotalPrice, showTotalGoodsPrice} from './priceControl.js';
import {closeModal, fetchRequest, modalControl} from './modalControl.js';
import {URL} from './renderGoods.js';

const table = document.querySelector('.table');
let id;

export const serviceFeatures = () => {
  const editGood = async (good) => {
    id = good.firstChild.textContent;
    await fetchRequest(`${URL}/api/goods/${id}`, {
      callback: showGoodInModal,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  
  const showGoodInModal = async (err, data) => {
    const modal = await modalControl();
    const form = modal.querySelector('.modal__form');
    let formData = new FormData(form);
    formData.append('discount', '');
    const title = modal.querySelector('input[name=title]');
    const category = modal.querySelector('input[name=category]');
    let textArea = modal.querySelector('textarea');
    const units = modal.querySelector('input[name=units]');
    const count = modal.querySelector('input[name=count]');
    const checkboxDiscount = modal.querySelector('input[name=checkbox__discount]');
    const discountInput = modal.querySelector('.discount-input');
    const price = modal.querySelector('input[name=price]');
    const image = modal.querySelector('input[name=image]');
    
    title.value = data.title;
    category.value = data.category;
    textArea.value = data.description;
    units.value = data.units;
    count.value = data.count;
    price.value = data.price;
    discountInput.value = data.discount;
    if (discountInput.value > 0) {
      checkboxDiscount.checked = true;
    }
    
    image.textContent = data.image;
    
    setTotalPrice(form);
    [count, discountInput, price, checkboxDiscount].forEach(item => {
      item.addEventListener('change', () => {
        setTotalPrice(form);
      });
      form.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      });
    });
    
    form.addEventListener('submit', async () => {
      formData = new FormData(form);
      const editedGood = Object.fromEntries(formData);
      await fetchRequest(`${URL}/api/goods/${id}`, {
        method: 'PATCH',
        callback: showGoodInModal,
        body: editedGood,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      closeModal();
    });
  };
  
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
    const btnEdit = target.closest('.button-edit');
    if (btnDel) {
      const delRow = target.closest('tr');
      await deleteRow(delRow);
    }
    if (btnPict) {
      const tr = target.closest('tr');
      showPicture(btnPict, tr);
    }
    if (btnEdit) {
      const editRow = target.closest('tr');
      await editGood(editRow);
    }
  });
};

