const modal = document.querySelector('.modal');
const formContainer = document.querySelector('.modal__container')
const openModalBtn = document.querySelector('.main__button');

openModalBtn.addEventListener('click', () => {
  modal.classList.remove('close-modal');
  modal.classList.add('open-modal');
});

modal.addEventListener('click', (event) => {
  const target = event.target;
  const closeBtn = target.closest('.modal__close');
  if (target === modal || closeBtn) {
    modal.classList.remove('open-modal');
    modal.classList.add('close-modal');
  }
});

const table = document.querySelector('.table');

const deleteRow = (event) => {
  const target = event.target;
  const btnDel = target.closest('.table__button-delete');
  const delRow = btnDel.closest('tr')
  const tableBody = delRow.closest('tbody');
  delRow.remove();
  console.log('Удаленная строка:');
  console.log(delRow);
  const afterDeleteTable = tableBody.closest('table');
  console.log('Таблица после удаления:');
  console.log(afterDeleteTable);
}

table.addEventListener('click', deleteRow);
