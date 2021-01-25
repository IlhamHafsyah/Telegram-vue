<template>
  <div class="RegisForm">
    <h3>Register</h3>
    <p>Let's create your account!</p>
    <br />
    <div class="form">
      <b-form>
        <b-form-group id="input-group-1" label="Username" label-for="input-1">
          <b-form-input
            id="input-1"
            class="login-form"
            v-model="form.username"
            required
            placeholder="Enter username"
          ></b-form-input>
        </b-form-group>
        <br />
        <b-form-group id="input-group-2" label="Email" label-for="input-2">
          <b-form-input
            id="input-2"
            type="email"
            class="login-form"
            v-model="form.email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>
        <br />
        <b-form-group id="input-group-3" label="Password" label-for="input-3">
          <b-form-input
            id="input-3"
            type="password"
            class="login-form"
            v-model="form.password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>
        <a href="">Forgot password?</a>
        <br /><br />
        <b-button @click="regis">Register</b-button>
        <br /><br />
        <h5>Register with</h5>
        <br />
        <b-button class="google">
          <img src="../../../assets/google telegram.png" alt="" />
          Google</b-button
        >
        <br />
        <br />
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RegisForm",
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["register"]),

    regis() {
      if (!this.form.username || !this.form.email || !this.form.password) {
        return this.$swal("warning", "All data must be field in !", "error");
      } else {
        this.register(this.form)
          .then(result => {
            return this.$swal("Success!", `${result.data.msg}`, "success");
          })
          .catch(error => {
            return this.$swal("warning", `${error.data.msg}`, "error");
          });
      }
    }
  }
};
</script>

<style>
.RegisForm h3 {
  padding-left: -20px;
  text-align: center;
}
</style>
