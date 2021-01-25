<template>
  <div class="profile">
    <b-row>
      <b-col cols="4">
        <UserData />
        <br />
        <Maps />
        <br />
        <Setting />
      </b-col>
      <b-col cols="8">
        <Chat />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Chat from "../components/_base/chat/Chat";
import Maps from "../components/_base/profile/Maps";
import UserData from "../components/_base/profile/UserData";
import Setting from "../components/_base/profile/Setting";

export default {
  name: "Profile",
  components: {
    Chat,
    UserData,
    Setting,
    Maps
  }
};
</script>
