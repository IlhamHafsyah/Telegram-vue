<template>
  <div class="chat">
    <b-row v-for="(item, index) in getRooms" :key="index">
      <b-col cols="2">
        <img
          v-if="item.photo"
          left
          :src="'http://localhost:3000/profile/' + item.photo"
          alt="photo"
        />
        <div v-else>
          <img src="../../../assets/pict_default.jpg" alt="" />
        </div>
      </b-col>
      <b-col cols="10" style="width: 200px">
        <h4>{{ item.username }}</h4>
        <p>online</p>
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col cols="11">
        <div class="chats">
          <div class="chat-window">
            <div class="output" v-for="(item, index) in getMsg" :key="index">
              <!-- <p>
                <em> is typing a message...</em>
              </p> -->
              <div class="left" v-if="item.sender_id == getUserData.user_id">
                <p>
                  <strong>{{ item.username }}</strong> <br />
                  {{ item.message }}
                </p>
              </div>
              <div class="right" v-else>
                <p>
                  <strong>{{ item.username }}</strong> <br />
                  {{ item.message }}
                </p>
              </div>
            </div>
          </div>
          <!-- <input class="message" type="text" placeholder="Message" />
          <button class="send" @click="sendingMessage">Send</button> -->
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

.row {
  display: flex;
  margin-right: 0px !important;
  flex-wrap: wrap;
  margin-left: -15px;
}

.chat .row {
  padding-top: 20px;
  /* margin-right: 0px !important; */
}

.chat img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
}

/* .chat .col-9 h4 {
  text-align: left;
  font-family: "Rubik", sans-serif;
  color: cornflowerblue;
} */

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
/* .chat .row {
  height: 552px;
} */
</style>
