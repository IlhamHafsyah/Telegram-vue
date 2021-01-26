import axios from "axios";

export default {
  state: {
    message: []
  },
  mutations: {
    setMessage(state, payload) {
      state.message = payload;
      console.log(state.message);
    }
  },
  actions: {
    getMessage(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:3000/message?id_room=${payload}`)
          .then(result => {
            context.commit("setMessage", result.data.data);
            resolve(result);
          })
          .catch(error => {
            reject(error.response);
          });
      });
    },
    sendMessage(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:3000/message", payload)
          .then(result => {
            console.log(result);
            resolve(result);
          })
          .catch(error => {
            reject(error.response);
          });
      });
    }
  },
  getters: {
    getMsg(state) {
      return state.message;
    }
  }
};