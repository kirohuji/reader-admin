import Vue from "vue";
import router from "../router";
import '../plugins'
import Root from './Root.vue'
function createApp() {
  return new Vue({
    el: "#app",
    router,
    ...Root
  });
}
export default createApp;
