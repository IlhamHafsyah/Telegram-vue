import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
// import Maps from "../views/Maps.vue";
import store from "../store";
import Chat from "../views/Chat.vue";
import Chatlist from "../views/Chatlist.vue";
import Profile from "../views/Profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   component: Maps
  // },
  {
    path: "/chat",
    name: "Chat",
    component: Chat
  },
  {
    path: "/chatlist",
    name: "Chatlist",
    component: Chatlist,
    meta: { requiresAuth: true }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLogin) {
      next({
        path: "/register"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
