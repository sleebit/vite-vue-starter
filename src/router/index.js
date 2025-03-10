import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/auth/:type?",
    name: "Auth",
    component: () => import("@/views/Auth.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/Settings.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
