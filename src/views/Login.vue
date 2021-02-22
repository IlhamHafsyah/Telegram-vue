<template>
  <div class="login">
    <b-card>
      <h3>Login</h3>
      <p>Hi, Welcome back!</p>
      <br />
      <div class="form">
        <b-form>
          <b-form-group id="input-group-1" label="Email" label-for="input-1">
            <b-form-input
              id="input-1"
              class="login-form"
              type="email"
              v-model="form.email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>
          <br />
          <b-form-group id="input-group-2" label="Password" label-for="input-2">
            <b-form-input
              id="input-2"
              type="password"
              class="login-form"
              v-model="form.password"
              required
              placeholder="Enter password"
            ></b-form-input>
          </b-form-group>
          <a href="">Forgot password?</a>
          <br /><br />
          <b-button @click="loginIn">Login</b-button>
          <br /><br />
          <h5>Login with</h5>
          <br />
          <b-button class="google">
            <img src="../assets/google telegram.png" alt="" /> Google</b-button
          >
          <br /><br />
          <h6>
            Don't have an account ?
            <a @click="toRegister()">Sign up</a>
          </h6>
        </b-form>
      </div>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
// import FormLogin from "../components/_base/auth/FormLogin";

export default {
  name: "Login",
  // components: {
  //   FormLogin
  // },
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  created() {
    console.log(process.env.VUE_APP_API);
  },
  methods: {
    ...mapActions(["login"]),
    loginIn() {
      console.log(this.form);
      if (!this.form.email || !this.form.password) {
        return this.$swal("warning", "All data must be field in !", "error");
      } else {
        this.login(this.form)
          .then(result => {
            return this.$swal("Success!", `${result.data.msg}`, "success");
          })
          .catch(error => {
            return this.$swal("warning", `${error.data.msg}`, "error");
          });
      }
    },
    toRegister() {
      this.$router.push("/register");
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap");

.login {
  text-align: center;
  justify-content: center;
}

.card h3 {
  font-family: "Rubik", sans-serif;
  color: #7e98df;
  font-weight: bold;
  padding-top: 20px;
  padding-bottom: 20px;
}

p {
  font-family: "Rubik", sans-serif;
  text-align: left;
  font-size: 14px;
}

label {
  font-family: "Rubik", sans-serif;
  text-align: left;
  font-size: 12px;
  color: rgb(131, 131, 131);
}

.login .card {
  margin: 5% auto;
  width: 35%;
  justify-content: center;
  border-radius: 30px;
  box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.205);
}

.login .card button {
  width: 90%;
  height: 45px;
  font-family: "Rubik", sans-serif;
  font-weight: 700;
  font-size: 16px;
  background: #7e98df;
  border-radius: 50px;
  color: #ffffff;
  border: none;
  outline: none;
}

.login .card button:hover {
  box-shadow: 0px 20px 20px rgba(105, 139, 231, 0.205);
}

.form .login-form {
  border: none;
  border-bottom: 1px solid;
  font-family: "Rubik", sans-serif;
  border-radius: 0%;
  font-size: 12px;
}

a {
  font-family: "Rubik", sans-serif;
  color: #7e98df;
  font-size: 12px;
}

h5 {
  font-family: "Rubik", sans-serif;
  color: rgb(131, 131, 131);
  font-size: 12px !important;
  padding-top: 8px;
}

.login .card .google {
  width: 90%;
  font-family: "Rubik", sans-serif;
  font-weight: 700;
  font-size: 16px;
  background: #fcfdff;
  border-radius: 50px;
  color: #7e98df;
  border: 1px solid #7e98df;
}

h6 {
  font-size: 12px !important;
}
</style>
