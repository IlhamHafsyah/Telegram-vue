<template>
  <div class="chatInput">
    <b-row>
      <b-col cols="11">
        <b-form-group id="input-group-1" label="" label-for="input-3">
          <b-form-textarea
            id="textarea"
            placeholder="Type your message..."
            rows="1"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
      </b-col>
      <b-col cols="1">
        <button class="send" @click="sendingMessage">Send</button>
        <button><img src="../../../assets/Plus.png" alt="" /></button
      ></b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Chat",
  data() {
    return {
      // socket: io("http://localhost:3000"),
      username: "",
      message: "",
      messages: [],
      room: "",
      oldroom: "",
      typing: false
    };
  }
};
</script>

<style>
.chatInput {
  margin: 0% auto;
}

.chatInput button {
  border: none;
  background-color: white;
}

.chatInput .form-control {
  border: none;
  border-bottom: 1px solid;
  font-family: "Rubik", sans-serif;
  border-radius: 0%;
  font-size: 15px;
}
</style>
