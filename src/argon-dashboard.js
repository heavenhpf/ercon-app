import "./assets/js/nav-pills.js";
import "./assets/scss/argon-dashboard.scss";

import GlobalComponents from './plugins/global.js';

export default {
  install(app) {
    app.use(GlobalComponents);
  },
};
