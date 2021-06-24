import Vue from "vue";
import router from "../router";
import '../plugins'
import Root from './Root.vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS 
import '../styles/variables.scss';
import '../styles/index.scss'
function createApp() {
  return new Vue({
    el: "#app",
    router,
    ...Root
  });
}
export default createApp;
