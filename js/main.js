const modal = document.querySelector('.modal');
const formContainer = document.querySelector('.modal__container')
const openModalBtn = document.querySelector('.main__button');

openModalBtn.addEventListener('click', () => {  
  modal.classList.remove('close-modal');
  modal.classList.add('open-modal');
});

formContainer.addEventListener('click', (event) => {
  event.stopPropagation();
  const isModalOpen = event.target.closest('.modal__close');
  if (isModalOpen) {
    modal.classList.remove('open-modal');
    modal.classList.add('close-modal');
  }
});

modal.addEventListener('click', () => {
    modal.classList.remove('open-modal');
    modal.classList.add('close-modal');
})
