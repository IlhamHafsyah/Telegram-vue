import axios from "axios";

export default {
  state: {
    room: {}
  },
  mutations: {
    setRoom(state, payload) {
      state.room = payload;
      console.log(state.room);
    }
  },
  actions: {
    joinRooms(context, payload) {
      console.log(payload);
      return new Promise((resolve, reject) => {
        axios
          .post(`process.env.VUE_APP_API/room/joinroom`, payload)
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
          .get(`process.env.VUE_APP_API/room?user_a=${payload}`)
          .then(result => {
            context.commit("setRoom", result.data.data);
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
    }
  }
};
