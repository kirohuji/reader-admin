import Vue from "vue";
import router from "../router";
import "../plugins";
import Root from "./Root.vue";
import store from "./store";
import './permission' // permission control
import "normalize.css/normalize.css"; // a modern alternative to CSS
import "../styles/variables.scss";
import "../styles/index.scss";
import "../components/organisms/DataSearchForm/style.scss";
import "../components/organisms/DataForm/style.scss";
import "../components/organisms/DataTable/style.scss";
function createApp() {
  return new Vue({
    el: "#app",
    router,
    store,
    ...Root,
  });
}
export default createApp;
