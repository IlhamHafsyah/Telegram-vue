import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import Auth from "./modules/auth";
import Friend from "./modules/friend";
import Room from "./modules/room";
import Profile from "./modules/profile";
import Message from "./modules/message";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    Friend,
    Room,
    Profile,
    Message
  },
  getters: {},
  plugins: [
    createPersistedState({
      paths: [`Auth.user`]
    })
  ]
});
