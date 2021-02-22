import axios from "axios";

export default {
  state: {
    profile: {},
    id: ""
  },
  mutations: {
    setProfile(state, payload) {
      state.profile = payload;
    },
    userId(state, payload) {
      state.id = payload;
    }
  },
  actions: {
    getProfile(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_API}/profile/${payload}`)
          .then(result => {
            context.commit("setProfile", result.data.data);
            resolve(result);
          })
          .catch(error => {
            reject(error.response);
          });
      });
    },
    updateProfile(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_API}/profile/edit/${context.state.id}`,
            payload
          )
          .then(result => {
            resolve(result);
          })
          .catch(error => {
            reject(error.response);
          });
      });
    }
  },
  getters: {
    getUserProfile(state) {
      return state.profile;
    }
  }
};
