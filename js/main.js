const openModal = document.querySelector('.modal');

openModal.classList.remove('close-modal');
openModal.classList.add('open-modal');

const closeModal = document.querySelector('.modal');

// closeModal.classList.remove('open-modal');
// closeModal.classList.add('close-modal');

const modalTitle = document.querySelector('.modal__title').innerHTML;
console.log(modalTitle);

const modalCloseButton = document.querySelector('.modal__close');
console.log(modalCloseButton);

const productId = document.querySelector('.modal__product-id').innerHTML;
console.log(productId);

const modalForm = document.querySelector('.modal__form');
console.log(modalForm);

const discountCheckBox = document.querySelector('.form__label.checkbox');
console.log(discountCheckBox);

const discountCheckBoxInput = document.querySelector('.checkbox__input');
console.log(discountCheckBoxInput);

const totalCostProducts = document.querySelector('.form__cost-total').innerHTML;
console.log(totalCostProducts);