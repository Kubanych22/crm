import {loadGoods, renderGoods} from './modules/renderGoods.js';
import {serviceFeatures} from './modules/serviceFeatures.js';

const init = async () => {
  loadGoods(renderGoods);
  serviceFeatures();
};

await init();
