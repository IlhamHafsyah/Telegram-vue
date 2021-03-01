import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import toasted from "vue-toasted";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueSweetalert2 from "vue-sweetalert2";
import * as VueGoogleMaps from "vue2-google-maps";
import VueGeolocation from "vue-browser-geolocation";

import dotenv from "dotenv";

dotenv.config();
process.env.VUE_APP_API;
process.env.VUE_APP_SOCKET;

Vue.use(VueGeolocation);

Vue.use(VueSweetalert2);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_KEY,
    libraries: "places"
  }
});
Vue.use(toasted, {
  duration: 5000,
  position: "top-right",
  action: {
    text: "X",
    onClick: (e, toastObject) => {
      toastObject.goAway(0);
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
