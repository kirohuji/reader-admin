import Vue from "vue";
import router from "../router";
function createApp() {
  return new Vue({
    el: "#app",
    router,
  });
}
export default createApp;
