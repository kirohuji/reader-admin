import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "not-found",
    component: () => import("../pages/error-page/404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes: routes,
});

export default router;
