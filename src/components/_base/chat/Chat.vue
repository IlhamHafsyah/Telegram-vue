<template>
  <div class="chat">
    <b-row v-for="(item, index) in getRooms" :key="index">
      <b-col cols="3">
        <b-img
          left
          :src="'http://localhost:3000/profile/' + item.photo"
          alt="photo"
        ></b-img>
      </b-col>
      <b-col cols="9">
        <h4>{{ item.username }}</h4>
        <p>online</p>
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col cols="11">
        <div class="chats">
          <div class="chat-window">
            <div class="output">
              <!-- <p>
                <em> is typing a message...</em>
              </p> -->
              <p v-for="(item, index) in getMsg" :key="index">
                <strong>{{ item.username }} :</strong>
                {{ item.message }}
              </p>
            </div>
          </div>
          <!-- <input class="message" type="text" placeholder="Message" />
          <button class="send" @click="sendingMessage">Send</button> -->
        </div>
        <b-form-group id="input-group-1" label="" label-for="input-3">
          <b-form-textarea
            id="textarea"
            placeholder="Type your message..."
            v-model="message"
            rows="1"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
      </b-col>
      <b-col cols="1">
        <button class="send" @click="sending">Send</button>
        <!-- <button><img src="../../../assets/Plus.png" alt="" /></button> -->
      </b-col>
    </b-row>
  </div>
</template>

<script>
// import ChatInput from "../../_base/chat/ChatInput";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "Chat",
  data() {
    return {
      message: ""
    };
  },
  components: {
    // ChatInput
  },
  created() {
    // this.getRoom(this.getUserData.user_id);
  },
  computed: {
    ...mapGetters(["getUserData", "getRooms", "getMsg"])
  },
  methods: {
    ...mapActions(["getMessage", "sendMessage"]),
    sending() {
      const setMsg = {
        id_room: this.getRooms[0].id_room,
        message: this.message,
        sender_id: this.getUserData.user_id,
        receiver_id: this.getRooms[0].user_b
      };
      this.sendMessage(setMsg);
    }
  }
};
</script>
<style>
/* .chat p {
  font-family: "Rubik", sans-serif;
  text-align: center;
  margin: 35% auto;
  font-weight: 500 !important;
  font-size: 15px !important;
  color: black !important;
} */

.chat .card-body {
  width: 800px;
}

.chat .row {
  padding-top: 20px;
}

.chat .row img {
  padding-right: 0;
  width: 50px;
  height: 50px;
  border-radius: 10px;
}

.chat .row h4 {
  text-align: left;
  font-family: "Rubik", sans-serif;
  color: cornflowerblue;
}

.chats {
  height: 440px;
}

.col-1 {
  padding-top: 440px;
  padding-right: 25px;
}

.chat .col-9 h4 {
  font-weight: bold;
  color: black;
  padding-top: 15px;
  padding-right: 70px;
  padding-bottom: 0;
  line-height: 0;
}
/* .chat .row {
  height: 552px;
} */
</style>
