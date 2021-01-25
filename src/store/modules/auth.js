import axios from "axios";
import router from "../../router/index";

export default {
  state: {
    user: {},
    token: localStorage.getItem("token") || null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      state.token = payload.token;
      console.log(state.user);
    },
    delDataUser(state) {
      state.user = {};
      state.token = null;
      router.push("/");
    }
  },
  actions: {
    register(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:3000/auth/register", payload)
          .then(result => {
            resolve(result);
            router.push("/");
          })
          .catch(error => {
            reject(error.response);
          });
      });
    },
    login(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:3000/auth/login", payload)
          .then(result => {
            context.commit("setUser", result.data.data);
            localStorage.setItem("token", result.data.data.token);
            resolve(result);
            router.push("/chatlist");
          })
          .catch(error => {
            reject(error.response);
          });
      });
    },
    logout(context) {
      localStorage.removeItem("token");
      context.commit("delDataUser");
    }
  },
  getters: {
    isLogin(state) {
      return state.token !== null;
    },
    getUserData(state) {
      return state.user;
    }
  }
};
