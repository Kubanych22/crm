import {pages, URL} from './renderGoods.js';
import {createRow} from './showGoods.js';
import {pageNumber} from './serviceFeatures.js';

export let CATEGORY;

const loadCategories = async (callback) => {
  const xhr = new XMLHttpRequest();
  await xhr.open('GET', `${URL}/api/categories/`);
  xhr.addEventListener('load', () => {
    const data = JSON.parse(xhr.response);
    CATEGORY = data;
    callback(data);
  });
  
  xhr.addEventListener('error', () => {
    console.log(new Error(xhr.status), xhr.response);
  });
  
  xhr.send();
};

const categories = (data) => {
  return data;
};
await loadCategories(categories);

export const search = async (btnSearch) => {
  const searchInput = document.querySelector('.search__input');
  const title = searchInput.value;
  
  const showFoundTotalGoodsPrice = (totalFormPrice) => {
    const mainTotalPrice = document.querySelector('.main__total-price');
    mainTotalPrice.textContent = totalFormPrice.toString() + ' ₽';
  };
  
  const calculateTotalPriceFoundGoods = () => {
    const prices = document.querySelectorAll('.total-cost');
    let totalGoodsPrice = [...prices].reduce((total, price) => total + Number(price.textContent.substring(0, price.textContent.length - 2)), 0);
    showFoundTotalGoodsPrice(totalGoodsPrice);
  };
  
  const renderFoundGoods = (data) => {
    if (!data) {
      return;
    }
    const list = document.querySelector('.table__tbody');
    list.innerHTML = '';
    const goods = data.map((good) => {
      const {tr, totalGoodPrice} = createRow(good);
      list.append(tr);
      return totalGoodPrice;
    });
    calculateTotalPriceFoundGoods();
  };
  
  const searchGoods = (data) => {
    let foundGoods = [];
    data.map(good => {
      const words = title.split(' ');
      for (let word of words) {
        if (good.title.toLowerCase().includes(word.toLowerCase())) {
          foundGoods.push(good);
          return;
        }
      }
    });
    
    if (foundGoods.length !== 0) {
      return foundGoods;
    }
    data.map(good => {
      const words = title.split(' ');
      for (const word of words) {
        if (good.category.toLowerCase().includes(word.toLowerCase())) {
          foundGoods.push(good);
          return;
        }
      }
    });
    if (foundGoods.length !== 0) {
      return foundGoods;
    }
    console.log('Товар не найден');
  };
  
  let resultData = [];
  const callback = (data, currentPage) => {
    if (currentPage <= pages) {
      resultData = resultData.concat(data)
    } else {
      renderFoundGoods(searchGoods(resultData));
    }
  };
  
  const loadFoundGoods = async (callback, page) => {
    const xhr = new XMLHttpRequest();
    await xhr.open('GET', `${URL}/api/goods/?page=${page}`);
    xhr.addEventListener('load', () => {
      const dataObject = JSON.parse(xhr.response);
      const data = dataObject.goods;
      callback(data, page);
    });
    
    xhr.addEventListener('error', () => {
      console.log(new Error(xhr.status), xhr.response);
    });
    
    xhr.send();
  };
  
  for (let page = 1; page <= pages + 1; page++) {
    await loadFoundGoods(callback, page);
  }
};
