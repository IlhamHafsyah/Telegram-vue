<template>
  <div class="profile">
    <b-row>
      <b-col cols="4">
        <div class="overflow">
          <UserData />
          <br />
          <Maps />
          <br />
          <Setting />
        </div>
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

<style>
.userData {
  padding-right: 25px;
}

.overflow {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 600px;
}

.overflow::-webkit-scrollbar {
  width: 7px;
}

.overflow::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(167, 167, 167, 0.521);
  border-radius: 10px;
}

.overflow::-webkit-scrollbar-thumb {
  background: #7e98df;
  border-radius: 10px;
}
</style>
