<template>
  <div class="form">
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="input-group-2"
        label="Email address:"
        label-for="input-2"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-2"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Your Password:"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "FormLogin",
  data() {
    return {};
  },
  methods: {
    onSubmit() {
      this.$router.push({
        name: "Chat",
        params: {
          ...this.form
        }
      });
    },
    onReset() {
      //reset
    }
  }
};
</script>
