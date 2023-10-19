// функция установки атрибута required элементам формы

const inputs = document.querySelectorAll('input');
const textAreas = document.querySelectorAll('textarea');

export const setRequiredAttribute = () => {
  [...inputs].map(elem => {
    if (elem.type !== 'checkbox' && elem.type !== 'file') {
      elem.required = true;
    }
  });
  [...textAreas].map(elem => elem.required = true);
};
