<template>
  <div class="chatlist">
    <b-row>
      <b-col cols="4">
        <List />
      </b-col>
      <b-col cols="8"><Chat /></b-col>
    </b-row>
  </div>
</template>

<script>
import List from "../components/_base/chat/List";
import Chat from "../components/_base/chat/Chat";
export default {
  name: "Chatlist",
  components: {
    List,
    Chat
  }
};
</script>
