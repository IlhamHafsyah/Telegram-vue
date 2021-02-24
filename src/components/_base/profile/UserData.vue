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
      <b-col cols="9">
        <!-- <p
          style="color: #7e98df; font-weight: bold; margin-left: 65px; margin-top: 7px"
        >
          @{{ getUserProfile[0].username }}
        </p> -->
      </b-col>
    </b-row>
    <!-- <p>{{ getUserProfile[0].photo }}</p> -->
    <img
      v-if="url"
      :src="url"
      alt=""
      style="width: 100px; height: 100px; border-radius: 20px; margin-left: 10px"
    />
    <img
      v-else-if="getUserProfile[0].photo.length < 16"
      class="default"
      src="../../../assets/pict_default.jpg"
      style="width: 100px; height: 100px; border-radius: 20px; margin-left: 10px"
    />
    <img
      v-else-if="getUserProfile[0].photo"
      left
      :src="'http://localhost:3000/profile/' + getUserProfile[0].photo"
      alt="photo"
      style="width: 100px; height: 100px; border-radius: 20px; margin-left: 10px"
    />
    <img
      v-else
      class="default"
      src="../../../assets/pict_default.jpg"
      style="width: 100px; height: 100px; border-radius: 20px; margin-left: 10px"
    />
    <br />
    <input type="file" id="file" @change="handleFile" />
    <label for="file" style="margin-left: 70px;">
      Edit
    </label>
    <button
      style="background-color: #ffffff00;"
      v-if="getUserProfile[0].photo.length < 16"
    >
      .
    </button>
    <button
      v-else
      @click="deleteImage"
      style="background-color: #ffffff00; position: relative; top: -105px; left: 0px"
    >
      <img style="width: 40%" src="../../../assets/delete-sign.png" alt="" />
    </button>

    <br />
    <h4>{{ getUserProfile[0].username }}</h4>
    <br />
    <h3>Account</h3>
    <div class="profile-form">
      <b-form>
        <b-form-group
          id="input-group-1"
          label=""
          label-for="input-1"
          style="margin-bottom: 5px"
        >
          <b-form-input
            id="input-1"
            class="data-form"
            placeholder="+ 62"
            v-model="getUserProfile[0].phone_number"
          ></b-form-input>
        </b-form-group>
        <p>Tap to change phone number</p>
        <b-form-group id="input-group-2" label="Username" label-for="input-2">
          <b-form-input
            id="input-2"
            class="data-form"
            placeholder="@name"
            v-model="getUserProfile[0].username"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-3" label="Bio" label-for="input-3">
          <b-form-textarea
            placeholder="Enter something..."
            rows="1"
            v-model="getUserProfile[0].bio"
            class="data-form"
          ></b-form-textarea>
        </b-form-group>
        <br />
        <button @click.prevent="updates">Edit</button>
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
    this.getProfile(this.getUserData.user_id);
    console.log(this.getUserProfile);
  },
  methods: {
    ...mapActions(["getProfile", "updateProfile"]),
    ...mapMutations(["userId"]),
    handleFile(event) {
      const type = event.target.files[0].type;
      if (type != "image/jpeg" && type != "image/png" && type != "image/jpg") {
        return this.$swal(
          "warning",
          `File format must be JPG, JPEG or PNG`,
          "error"
        );
      } else {
        if (event.target.files[0].size > 2000000) {
          return this.$swal("warning", `File too large, max 2 MB`, "error");
        } else {
          const file = (this.getUserProfile[0].photo = event.target.files[0]);
          this.url = URL.createObjectURL(file);
        }
      }
    },
    updates() {
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
          console.log(error);
          return this.$swal("warning", `${error.data.msg}`, "error");
        });
    },
    toList() {
      this.$router.push("/chatlist");
    },
    deleteImage() {
      this.getUserProfile[0].photo = "";
    }
  }
};
</script>

<style>
.userData {
  padding-top: 10px;
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

.userData .form-control {
  padding: 0;
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

.form-group label {
  margin-bottom: 0;
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

.form-group {
  margin-bottom: 0;
}
</style>
