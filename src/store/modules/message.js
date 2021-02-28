import axios from "axios";

export default {
  state: {
    message: [],
    notif: 0,
    send: {}
  },
  mutations: {
    setNotif(state, payload) {
      state.notif = payload;
    },
    setSend(state, payload) {
      state.send = payload;
    },
    setMessage(state, payload) {
      state.message = payload;
      console.log(state.message);
    },
    addMessage(state, payload) {
      state.message.push(payload);
      console.log(state.message);
    }
  },
  actions: {
    getMessage(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://${process.env.VUE_APP_API}/message?id_room=${payload.id_room}&receiver_id=${payload.receiver_id}`
          )
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
          .post(`https://${process.env.VUE_APP_API}/message`, payload)
          .then(result => {
            console.log(result);
            resolve(result);
          })
          .catch(error => {
            reject(error.response);
          });
      });
    },
    countNotif(context, payload) {
      console.log(payload);
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://${process.env.VUE_APP_API}/message/countnotif?receiver_id=${payload.receiver_id}&sender_id=${payload.sender_id}`
          )
          .then(result => {
            console.log(result);
            context.commit("setNotif", result.data.data[0].total);
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
    },
    getNotif(state) {
      return state.notif;
    },
    getSend(state) {
      return state.send;
    }
  }
};
