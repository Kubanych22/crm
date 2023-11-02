
import {
  calculateTotalPrice, form,
  priceControl,
} from './modules/priceControl.js';
import {deleteGood, showPictureGood} from './modules/serviceFeatures.js';
import {formControl, modalControl, setRequiredAttribute} from './modules/modalControl.js';

const init = () => {
  setRequiredAttribute();
  calculateTotalPrice();
  modalControl();
  priceControl();
  deleteGood();
  showPictureGood();
  const {closeModal} = modalControl();
  formControl(form, closeModal);
};

init();
