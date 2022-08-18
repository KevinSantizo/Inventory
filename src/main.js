// =========================================================
// * Vue Material Dashboard - v1.5.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-dashboard/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";

// router setup
import router from "./routes/index";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";
// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";
import vuetify from "./plugins/vuetify";
import VueBarcodeScanner from "vue-barcode-scanner";
import "vue-search-select/dist/VueSearchSelect.css";
import VueGoodTable from "vue-good-table";

import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
import VueExcelXlsx from "vue-excel-xlsx";
Vue.use(VueExcelXlsx);
Vue.use(VueSweetalert2);


Vue.prototype.$Chartist = Chartist;

let options = {
  sound: true, // default is false // default is blank
  sensitivity: 300, // default is 100
  requiredAttr: true, // default is false
  controlSequenceKeys: ["NumLock", "Clear"], // default is null
  callbackAfterTimeout: true, // default is false
};

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.use(VueBarcodeScanner, options);
Vue.use(VueGoodTable);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  vuetify,

  data: {
    Chartist: Chartist,
  },
});
