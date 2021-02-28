import axios from "axios";

export default {
  state: {
    room: {},
    userB: "",
    head: {}
  },
  mutations: {
    setRoom(state, payload) {
      state.room = payload;
    },
    setUserB(state, payload) {
      state.userB = payload;
    },
    setHead(state, payload) {
      state.head = payload;
    }
  },
  actions: {
    joinRooms(context, payload) {
      console.log(payload);
      return new Promise((resolve, reject) => {
        axios
          .post(`https://${process.env.VUE_APP_API}/room/joinroom`, payload)
          .then(result => {
            console.log(result);
            resolve(result);
          })
          .catch(error => {
            reject(error.response);
          });
      });
    },
    getRoom(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`https://${process.env.VUE_APP_API}/room?user_a=${payload}`)
          .then(result => {
            context.commit("setRoom", result.data.data);
            context.commit("setUserB", result.data.data[0].user_b);
            resolve(result);
          })
          .catch(error => {
            reject(error.response);
          });
      });
    }
  },
  getters: {
    getRooms(state) {
      return state.room;
    },
    getUserB(state) {
      return state.userB;
    },
    getHead(state) {
      return state.head;
    }
  }
};
