<template>
  <b-container class="bv-example-row">
    <div>
      <b-button v-b-toggle.sidebar-right>Toggle Sidebar</b-button>
      <b-sidebar id="sidebar-right" title="Sidebar" right shadow>
        <div class="px-3 py-2">
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
          <b-img
            src="https://picsum.photos/500/500/?image=54"
            fluid
            thumbnail
          ></b-img>
        </div>
      </b-sidebar>
    </div>
    <!-- ============================================================================================= -->
    <b-form-group>
      <b-form-select class="mb-3" v-model="room" @change="selectRoom">
        <b-form-select-option :value="null"
          >Please select Room</b-form-select-option
        >
        <b-form-select-option value="html">HTML</b-form-select-option>
        <b-form-select-option value="css">CSS</b-form-select-option>
        <b-form-select-option value="js">JS</b-form-select-option>
      </b-form-select>
    </b-form-group>
    <b-row>
      <b-col cols="2">
        <div class="chat">
          <div class="chat-window">
            <p class="room">User 1</p>
            <hr />
            <p class="room">User 2</p>
            <hr />
          </div>
        </div>
      </b-col>
      <b-col cols="10">
        <div class="chat">
          <div class="chat-window">
            <div class="output">
              <p v-if="typing.isTyping">
                <em>{{ typing.username }} is typing a message...</em>
              </p>
              <p v-for="(value, index) in messages" :key="index">
                <strong>{{ value.username }} :</strong>
                {{ value.message }}
              </p>
            </div>
          </div>
          <input
            class="message"
            v-model="message"
            type="text"
            placeholder="Message"
          />
          <button class="send" @click="sendingMessage">Send</button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "Chat",
  data() {
    return {
      socket: io.connect(`https://${process.env.VUE_APP_SOCKET}`, {
        path: "/api2/socket.io"
      }),
      username: "",
      message: "",
      messages: [],
      room: "",
      oldroom: "",
      typing: false
    };
  },
  // watch: {
  //   message(value) {
  //     // console.log(value);
  //     value
  //       ? this.socket.emit("typing", {
  //           username: this.username,
  //           room: this.room,
  //           isTyping: true
  //         })
  //       : this.socket.emit("typing", {
  //           room: this.room,
  //           isTyping: false
  //         });
  //   }
  // },
  created() {
    // if (!this.$route.params.username) {
    //   this.$router.push("/");
    // } else {
    //   this.username = this.$route.params.username;
    // }
    // console.log(this.$route.params);
    this.socket.on("chatMessage", data => {
      console.log(data);
      this.messages.push(data);
    });
    // this.socket.on("typingMessage", data => {
    //   console.log(data);
    //   this.typing = data;
    // });
    // console.log(this.messages);
  },
  methods: {
    sendingMessage() {
      // const setData = {
      //   username: this.username,
      //   message: this.message
      // };
      // console.log(setData);
      // this.socket.emit("globalMessage", setData);
      // this.socket.emit("privateMessage", setData);
      // this.socket.emit("broadcastMessage", setData);
      //================================================
      const setData = {
        username: this.username,
        message: this.message,
        room: this.room
      };
      this.socket.emit("roomMessage", setData);
      this.message = "";
    },
    selectRoom(data) {
      console.log(data);
      if (this.oldroom) {
        console.log("pernah masuk room " + this.oldroom);
        console.log("dan akan masuk ke room " + data);
        this.socket.emit("changeRoom", {
          username: this.username,
          room: data,
          oldroom: this.oldroom
        });
        this.oldroom = data;
      } else {
        console.log("belum pernah masuk ke manapun");
        console.log("dan akan masuk ke room " + data);
        this.socket.emit("joinRoom", {
          username: this.username,
          room: data
        });
        this.oldroom = data;
      }
    }
  }
};
</script>

<style scoped>
.chat {
  max-width: 600px;
  border: 1px solid #ddd;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.05);
  border-radius: 2px;
}

.room {
  margin: 10px 0;
}

h2 {
  font-size: 18px;
  padding: 10px 20px;
  color: #575ed8;
}

.mario-chat {
  max-width: 600px;
  margin: 30px auto;
  border: 1px solid #ddd;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.05);
  border-radius: 2px;
}

.chat-window {
  height: 400px;
  overflow: auto;
  background: #f9f9f9;
}

.output p {
  text-align: left;
  padding: 14px 0px;
  margin: 0 20px;
  border-bottom: 1px solid #e9e9e9;
  color: #555;
}

.feedback p {
  color: #aaa;
  padding: 14px 0px;
  margin: 0 20px;
}

.output strong {
  color: #575ed8;
}

label {
  box-sizing: border-box;
  display: block;
  padding: 10px 20px;
}

input {
  padding: 10px 20px;
  box-sizing: border-box;
  background: #eee;
  border: 0;
  display: block;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
  font-family: Nunito;
  font-size: 16px;
}

button {
  background: #575ed8;
  color: #fff;
  font-size: 18px;
  border: 0;
  padding: 12px 0;
  width: 100%;
  border-radius: 0 0 2px 2px;
}
</style>
