<template>
  <div class="chat">
    <p>Please select a chat to start messaging</p>
    <ChatInput />
  </div>
</template>

<script>
import ChatInput from "../../_base/chat/ChatInput";

export default {
  name: "Chat",
  components: {
    ChatInput
  }
};
</script>
<style>
.chat p {
  font-family: "Rubik", sans-serif;
  text-align: center;
  margin: 35% auto;
  font-weight: 500 !important;
  font-size: 15px !important;
  color: black !important;
}

.chat .card-body {
  width: 800px;
}
</style>
