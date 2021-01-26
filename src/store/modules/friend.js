import axios from "axios";

export default {
  state: {
    contacts: []
  },
  mutations: {
    setContacts(state, payload) {
      state.contacts = payload;
    }
  },
  actions: {
    addContacts(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:3000/friend/add/", payload)
          .then(result => {
            resolve(result);
          })
          .catch(error => {
            reject(error.response);
          });
      });
    },
    getContact(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:3000/friend/${payload}`)
          .then(result => {
            context.commit("setContacts", result.data.data);
            console.log(result);
            resolve(result);
          })
          .catch(error => {
            reject(error.response);
          });
      });
    },
    deleteContact(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(
            `http://localhost:3000/friend?user_id=${payload.user_id}&friend_email=${payload.friend_email}`
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
    getContacts(state) {
      return state.contacts;
    }
  }
};
