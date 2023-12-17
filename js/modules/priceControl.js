// функция для отображения итоговой цены при добавлении товара

export const form = document.querySelector('.modal__form');
const mainTotalPrice = document.querySelector('.main__total-price');
export {calculateTotalPrice, showTotalGoodsPrice};
  export const setTotalPrice = () => {
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
    totalFormCost.textContent = totalFormPrice;
    return totalFormPrice;
  };
  
  ['click', 'keyup', 'change'].forEach(event =>
      form.addEventListener(event, setTotalPrice));

// вычисление общей суммы товаров в таблице
const calculateTotalPrice = () => {
  const prices = document.querySelectorAll('.total-cost');
  let totalGoodsPrice = [...prices].reduce((total, price) => total + Number(price.textContent.substring(0, price.textContent.length - 2)), 0);
  showTotalGoodsPrice(totalGoodsPrice);
};

// Отображение общей суммы. Вся таблица не пересчитывается.
// При добавлении товара, его сумма добавляется к общей сумме
// При удалении отнимается.
const showTotalGoodsPrice = (totalFormPrice) => {
  let totalGoodsPrice = Number(mainTotalPrice.textContent.substring(0, mainTotalPrice.textContent.length - 2));
  totalGoodsPrice = totalGoodsPrice + totalFormPrice;
  mainTotalPrice.textContent = totalGoodsPrice.toString() + ' ₽';
};
