<template>
  <div class="chat">
    <b-row>
      <b-col cols="2">
        <img
          v-if="getHead.photo.length < 16"
          class="default"
          src="../../../assets/pict_default.jpg"
        />
        <img
          v-else-if="getHead.photo"
          left
          :src="'http://localhost:3000/profile/' + getHead.photo"
          alt="photo"
        />
        <div v-else>
          <img src="../../../assets/pict_default.jpg" alt="" />
        </div>
      </b-col>
      <b-col cols="10" style="width: 200px">
        <h4>{{ getHead.username }}</h4>
        <p v-if="getHead.status == 'ON'">online</p>
        <p v-else>offline</p>
      </b-col>
    </b-row>
    <hr />
    <!-- <p v-if="typing.isTyping" class="mt-2" style="text-align:center">
      <em v-if="typing.username === this.getUserData.username"
        >{{ typing.username }} is typing a message...</em
      >
    </p> -->
    <b-row>
      <b-col cols="11">
        <div class="chats">
          <div class="chat-window">
            <div class="output" v-for="(item, index) in getMsg" :key="index">
              <div class="left" v-if="item.sender_id == getUserData.user_id">
                <p>
                  <strong>{{ item.username }}</strong> <br />
                  {{ item.message }}
                </p>
                <!-- <h6>{{ item }}</h6> -->
              </div>
              <div class="right" v-else>
                <p>
                  <strong>{{ item.username }}</strong> <br />
                  {{ item.message }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <b-form-group id="input-group-1" label="" label-for="input-3">
          <b-form-input
            id="textarea"
            placeholder="Type your message..."
            v-model="message"
            rows="1"
            max-rows="6"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="1">
        <button class="send" @click="sending">
          <img
            src="../../../assets/send.png"
            alt=""
            style="width: 37px; height: 37px"
          />
        </button>
      </b-col>
      <!-- <p>{{ getMsg }}</p> -->
    </b-row>
  </div>
</template>

<script>
import io from "socket.io-client";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "Chat",
  data() {
    return {
      socket: io("http://localhost:3000"),
      message: "",
      messagess: []
    };
  },
  components: {},
  created() {},
  computed: {
    ...mapGetters([
      "getUserData",
      "getRooms",
      "getMsg",
      "msg",
      "getSend",
      "getHead"
    ])
  },
  methods: {
    ...mapActions(["getMessage", "sendMessage"]),
    ...mapMutations(["setMessage"]),
    sending() {
      const setData = {
        username: this.getUserData.username,
        message: this.message,
        room: this.getSend.id_room,
        sender_id: this.getSend.receiver_id,
        receiver_id: this.getSend.sender_id
      };
      console.log(setData);
      this.socket.emit("roomMessage", setData);
      const setMsg = {
        id_room: this.getSend.id_room,
        message: this.message,
        sender_id: this.getSend.receiver_id,
        receiver_id: this.getSend.sender_id
      };
      console.log(setMsg);
      this.sendMessage(setMsg);
      this.message = "";
    }
  }
};
</script>
<style>
.chat .card-body {
  width: 800px;
}

.row {
  display: flex;
  margin-right: 0px !important;
  flex-wrap: wrap;
  margin-left: -15px;
}

.chat .row {
  padding-top: 20px;
}

.chat img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
}

.chats {
  height: 455px;
}

.col-1 {
  padding-top: 453px;
  padding-right: 25px;
}

.chat .col-10 h4 {
  text-align: left;
  font-weight: bold;
  color: black;
  padding-top: 15px;
  font-family: "Rubik", sans-serif;
  padding-bottom: 0;
  line-height: 0;
}

.chat .col-10 p {
  text-align: left;
  color: black;
  font-family: "Rubik", sans-serif;
}

.chat .output .left {
  margin-bottom: 5px;
  margin-left: 500px;
  padding: 20px 20px 5px 20px;
  color: white;
  max-width: 300px;
  font-family: "Poppins", sans-serif;
  background: rgb(76, 166, 240);
  border-radius: 30px 30px 5px 30px;
}

.chat .output .right {
  margin-bottom: 5px;
  padding: 20px 20px 5px 20px;
  color: white;
  max-width: 300px;
  font-family: "Poppins", sans-serif;
  background: #7e98df;
  border-radius: 30px 30px 30px 5px;
}

.chat .chat-window {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 460px;
}

.chat-window::-webkit-scrollbar {
  width: 0px;
}

.chat-window::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(255, 255, 255);
  border-radius: 10px;
}

.chat-window::-webkit-scrollbar-thumb {
  background: #7e98df;
  border-radius: 10px;
}
</style>
