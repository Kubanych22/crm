import loadStyle from './loadStyle.js';

const warningModal = async (err, data) => {
  await loadStyle('style/warning.css');
  const modal = document.createElement('div');
  modal.classList.add('modal', 'close-modal');
  
  const container = document.createElement('div');
  container.classList.add('modal__container');
  const title = document.createElement('p');
  title.classList.add('modal__title');
  title.textContent = 'Вы уверены, что хотите удалить этот товар?';
  container.append(title);
  
  const wrap = document.createElement('div');
  wrap.classList.add('wrap');
  
  const buttonYes = document.createElement('button');
  buttonYes.classList.add('button', 'btn-yes', 'btn');
  buttonYes.type = 'button';
  buttonYes.textContent = 'Да';
  
  const buttonNo = document.createElement('button');
  buttonNo.classList.add('button', 'btn-no', 'btn');
  buttonNo.type = 'button';
  buttonNo.textContent = 'Нет';
  
  wrap.append(buttonYes, buttonNo);
  
  container.append(wrap)
  
  const close = document.createElement('button');
  close.classList.add('modal__close');
  close.type = 'button';
  close.innerHTML = `
    <svg class="modal__close-img" viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2L22 22" stroke-width="3" stroke-linecap="round"/>
      <path d="M2 22L22 2" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `;
  
  container.append(close);
  modal.append(container);
  document.body.append(modal);
  
  new Promise(resolve => {
    close.addEventListener('click', () => {
      modal.remove();
      resolve(true);
    });
  });
  new Promise(resolve => {
    buttonNo.addEventListener('click', () => {
      modal.remove();
      resolve(true);
    });
  });
  return modal;
};

export default warningModal;
