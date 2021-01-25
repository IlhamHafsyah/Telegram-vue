<template>
  <div class="Register">
    <b-card>
      <RegisForm />
    </b-card>
  </div>
</template>

<script>
import RegisForm from "../components/_base/auth/RegisForm";

export default {
  name: "Register",
  data() {
    return {};
  },
  components: {
    RegisForm
  }
};
</script>

<style>
.Register .card {
  margin: 5% auto;
  width: 35%;
  justify-content: center;
  border-radius: 30px;
  box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.205);
}

a {
  font-family: "Rubik", sans-serif;
  color: #7e98df;
  font-size: 12px;
}

.Register .card button {
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

.Register .card button:hover {
  box-shadow: 0px 20px 20px rgba(105, 139, 231, 0.205);
}

.Register .card .google {
  width: 90%;
  font-family: "Rubik", sans-serif;
  font-weight: 700;
  font-size: 16px;
  background: #fcfdff;
  border-radius: 50px;
  color: #7e98df;
  border: 1px solid #7e98df;
}
</style>
