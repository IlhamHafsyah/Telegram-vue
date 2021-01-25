<template>
  <div class="userData">
    <b-row>
      <b-col cols="3">
        <div class="back">
          <button @click="toList">
            <img src="../../../assets/back.png" alt="" />
          </button>
        </div>
      </b-col>
      <b-col cols="9"
        ><p>@{{ getUserProfile[0].username }}</p></b-col
      >
    </b-row>
    <b-img
      left
      :src="'http://localhost:3000/profile/' + getUserProfile[0].photo"
      alt="photo"
    ></b-img>
    <br />
    <input type="file" id="file" @change="handleFile" />
    <label for="file">
      Edit
    </label>
    <br />
    <h4>{{ getUserProfile[0].username }}</h4>
    <br /><br />
    <h3>Account</h3>
    <br />
    <div class="profile-form">
      <b-form>
        <b-form-group id="input-group-1" label="" label-for="input-1">
          <b-form-input
            id="input-1"
            class="data-form"
            placeholder="+ 62"
            v-model="getUserProfile[0].phone_number"
          ></b-form-input>
        </b-form-group>
        <p>Tap to change phone number</p>

        <br />
        <b-form-group id="input-group-2" label="Username" label-for="input-2">
          <b-form-input
            id="input-2"
            class="data-form"
            placeholder="@name"
            v-model="getUserProfile[0].username"
          ></b-form-input>
        </b-form-group>
        <br />
        <b-form-group id="input-group-3" label="Bio" label-for="input-3">
          <b-form-textarea
            id="textarea"
            placeholder="Enter something..."
            v-model="getUserProfile[0].bio"
            rows="1"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
        <br />
        <button @click="updates">Edit</button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "userData",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getUserData", "getUserProfile"])
  },
  created() {
    this.userId(this.getUserData.user_id);
    // console.log(this.getUserData);
    // console.log(this.getUserProfile);
    this.getProfile(this.getUserData.user_id);
    console.log(this.getUserProfile);
  },
  methods: {
    ...mapActions(["getProfile", "updateProfile"]),
    ...mapMutations(["userId"]),
    handleFile(event) {
      console.log(event.target.files[0].size);
      if (event.target.files[0].size > 2000000) {
        return this.$swal("warning", `File too large, max 2 MB`, "error");
      } else {
        this.getUserProfile[0].photo = event.target.files[0];
      }
    },
    updates() {
      // console.log(this.getUserProfile[0]);
      const {
        username,
        phone_number,
        bio,
        location,
        photo
      } = this.getUserProfile[0];
      console.log("getUserProfile[0]");
      console.log(this.getUserProfile[0]);
      const data = new FormData();
      data.append("username", username);
      data.append("phone_number", phone_number);
      data.append("bio", bio);
      data.append("location", location);
      data.append("photo", photo);
      this.userId(this.getUserData.user_id);
      this.updateProfile(data)
        .then(result => {
          console.log("ini result");
          console.log(result);
          return this.$swal("Success!", `${result.data.msg}`, "success");
        })
        .catch(error => {
          return this.$swal("warning", `${error.data.msg}`, "error");
        });
    },
    toList() {
      this.$router.push("/chatlist");
    }
  }
};
</script>

<style>
.profile {
  padding-top: 30px;
}

.profile p {
  padding-left: 58px;
  font-family: "Rubik", sans-serif;
  color: #7e98df;
  font-size: 17px;
  font-weight: bold;
}

.profile .card {
  border-radius: 20px;
  margin: 5% auto;
  width: 110px;
  height: 110px;
}

.profile h4 {
  font-family: "Rubik", sans-serif;
  font-weight: bold;
}

.profile h3 {
  padding-left: 40px;
  color: black;
  text-align: left;
  font-weight: bold;
  font-size: 20px;
}

.userData .profile-form {
  padding-left: 35px;
}

.userData .data-form {
  border: none;
  border-bottom: 1px solid;
  font-family: "Rubik", sans-serif;
  border-radius: 0%;
  font-size: 15px;
}

.userData .form-control {
  border: none;
  border-bottom: 1px solid;
  font-family: "Rubik", sans-serif;
  border-radius: 0%;
  font-size: 15px;
}

.userData .profile-form p {
  padding-left: 0px;
  font-family: "Rubik", sans-serif;
  color: #7e98df;
  font-size: 15px;
  font-weight: 500;
  text-align: left;
}

.userData button {
  width: 70px;
  height: 30px;
  border: none;
  border-radius: 20px;
  background-color: #7e98df;
  font-family: "Rubik", sans-serif;
  font-weight: 500;
  color: whitesmoke;
}

.userData button:hover {
  padding-bottom: 7px;
  box-shadow: 0px 20px 20px rgba(105, 139, 231, 0.205);
}

.back button {
  padding-top: 3px;
  border: none;
  background-color: rgba(255, 255, 255, 0);
}

input[type="file"] {
  display: none;
}

.float-left {
  margin: auto 38%;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.205);
}
</style>
