
import {
  form, setTotalPrice,
  
} from './modules/priceControl.js';
import {formControl, getImgFile, modalControl, setRequiredAttribute} from './modules/modalControl.js';
import {loadGoods, renderGoods} from './modules/renderGoods.js';
import {serviceFeatures} from './modules/serviceFeatures.js';

const init = () => {
  loadGoods(renderGoods);
  setRequiredAttribute();
  modalControl();
  setTotalPrice();
  serviceFeatures();
  getImgFile();
  formControl(form);
};

init();
