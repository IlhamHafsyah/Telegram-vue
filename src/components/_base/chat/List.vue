<template>
  <div class="list">
    <b-row>
      <b-col cols="9">
        <h4>Telegram</h4>
      </b-col>
      <b-col cols="3" style="padding-left: 23px">
        <div class="drop">
          <b-dropdown
            id="dropdown-1"
            right
            text=""
            variant="outline-none"
            class="m-md-2"
          >
            <template slot="button-content">
              <img src="../../../assets/dropdown.png" />
            </template>
            <b-dropdown-item>
              <b-row>
                <b-col cols="4">
                  <button @click="toProfile">
                    <img src="../../../assets/Settings.png" alt="" />
                  </button>
                </b-col>
                <b-col cols="8"> Setting</b-col>
              </b-row> </b-dropdown-item
            ><br />
            <b-dropdown-item>
              <b-row>
                <b-col cols="4">
                  <button v-b-modal.modal-tall>
                    <img src="../../../assets/Contacts.png" alt="" />
                  </button>
                </b-col>
                <b-col cols="8"> Contacts</b-col>
              </b-row> </b-dropdown-item
            ><br />
            <b-dropdown-item>
              <b-row>
                <b-col cols="4">
                  <button v-b-modal.modal-prevent-closing>
                    <img src="../../../assets/Invite friends.png" alt="" />
                  </button>
                </b-col>
                <b-col cols="8"> Invite</b-col>
              </b-row> </b-dropdown-item
            ><br />
            <b-dropdown-item>
              <b-row>
                <b-col cols="4">
                  <button>
                    <img src="../../../assets/FAQ.png" alt="" />
                  </button>
                </b-col>
                <b-col cols="8"> FAQ</b-col></b-row
              ></b-dropdown-item
            >
            <br />
            <b-dropdown-item>
              <b-row>
                <b-col cols="4">
                  <button @click="toLogout">
                    <img src="../../../assets/FAQ.png" alt="" /></button
                ></b-col>
                <b-col cols="8"> Logout</b-col></b-row
              ></b-dropdown-item
            >
          </b-dropdown>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="9">
        <b-form>
          <b-form-group id="input-group-1" label-for="input-1">
            <b-form-input
              id="input-1"
              class="login-form"
              placeholder="Type your message..."
            ></b-form-input>
          </b-form-group>
        </b-form>
      </b-col>
      <b-col cols="3">
        <button v-b-modal.modal-tall>
          <img src="../../../assets/Plus.png" alt="" />
        </button>
      </b-col>
    </b-row>
    <br />
    <div class="cards">
      <b-card>
        <b-row
          v-for="(item, index) in getRooms"
          :key="index"
          style="background-color: #a6b7e042; margin-bottom: 1px; border-radius: 5px;"
        >
          <b-col cols="3">
            <div class="photo">
              <img
                v-if="item.photo.length < 16"
                class="default"
                src="../../../assets/pict_default.jpg"
                style="width: 60px; height: 60px; margin: 12px 12px"
              />
              <img
                v-else-if="item.photo"
                v-b-toggle.sidebar-right
                left
                :src="'http://localhost:3000/profile/' + item.photo"
                alt="photo"
                style="width: 60px; height: 60px; margin: 12px 12px"
              />
              <img
                v-else
                v-b-toggle.sidebar-right
                src="../../../assets/pict_default.jpg"
                alt=""
                style="width: 60px; height: 60px; margin: 12px 12px"
              />
            </div>
          </b-col>
          <b-col cols="9">
            <b-row>
              <b-col cols="12">
                <div class="name">
                  <p
                    @click="
                      getMessages(
                        item.id_room,
                        item.user_b,
                        item.username,
                        item.photo,
                        item.status
                      )
                    "
                  >
                    {{ item.username }}
                  </p>
                </div></b-col
              >
              <!-- <b-col cols="12"
                ><div class="msg">
                  <p v-if="getMsg.length > 0">
                    {{ getMsg[getMsg.length - 1].message.substring(0, 30) }}...
                  </p>
                  <p v-else></p></div
              ></b-col>
              <h6
                v-if="getNotif > 0"
                style="width: 15px; height: 15px; margin-top: -33px; padding-top: 1px; margin-left: 240px; color: white; background-color: #5c83f0; border-radius: 20px"
              >
                {{ getNotif }}
              </h6>
              <h6 v-else></h6> -->
            </b-row>
          </b-col>
          <b-sidebar id="sidebar-right" right shadow>
            <div class="px-3 py-2">
              <img
                v-if="item.photo"
                left
                :src="'http://localhost:3000/profile/' + item.photo"
                style="width: 80px; height: 80px; margin: 12px 12px; border-radius: 20px"
                alt="photo"
              />
              <img
                v-else
                src="../../../assets/pict_default.jpg"
                alt=""
                style="width: 80px; height: 80px; margin: 12px 12px; border-radius: 20px"
              />
              <br />
              <div class="friendname">
                <h5>{{ item.username }}</h5>
              </div>
              <br />
              <div class="friendpn">
                <p>phone number</p>
                <h5>{{ item.phone_number }}</h5>
              </div>
              <br />
              <div class="friendbio">
                <p>bio</p>
                <h5>{{ item.bio }}</h5>
              </div>
              <br />
              <p style="color: grey">Location</p>
              <div class="maps">
                <GmapMap
                  :center="coordinate"
                  :zoom="10"
                  map-type-id="roadmap"
                  style="width: 230px; height: 170px"
                >
                  <GmapMarker
                    :position="coordinate"
                    :clickable="true"
                    icon="https://img.icons8.com/color/48/000000/map-pin.png"
                  />
                </GmapMap>
                <br /><br />
              </div>
            </div>
          </b-sidebar>
        </b-row>
      </b-card>
    </div>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Input your friend's email to invite"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Email"
          label-for="name-input"
          invalid-feedback="Email is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <div>
      <b-modal id="modal-tall" title="Your contact list">
        <b-row class="my-4" v-for="(item, index) in getContacts" :key="index">
          <b-card class="contlist" @click="joinRoom(item.user_id)">
            <b-col cols="3">
              <div class="photo">
                <b-img
                  left
                  :src="'http://localhost:3000/profile/' + item.photo"
                  alt="photo"
                  class="list-photo"
                ></b-img>
              </div>
            </b-col>
            <b-col cols="9">
              <div class="contact-name">
                {{ item.username }}
              </div>
            </b-col>
          </b-card>
          <!-- <button class="deleteC" @click="deleteCont(item.friend_email)">
            delete
          </button> -->
        </b-row>
      </b-modal>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "List",
  data() {
    return {
      socket: io("http://localhost:3000"),
      name: "",
      nameState: null,
      results: "",
      user_b: "",
      oldroom: "",
      coordinate: {
        lat: -10,
        lng: 110
      }
    };
  },
  created() {
    this.socket.on("chatMessage", data => {
      console.log(data);
      this.addMessage(data);
      if (data.receiver_id == this.getUserData.user_id) {
        this.$toasted.success("new message! " + data.username, {
          duration: 10000
        });
      }
    });
    this.getRoom(this.getUserData.user_id);
    this.getContact(this.getUserData.user_id);
    this.$getLocation()
      .then(coordinates => {
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng
        };
        console.log(coordinates);
      })
      .catch(error => {
        alert(error);
      });
    // const notData = {
    //   receiver_id: this.getUserData.user_id,
    //   sender_id: this.getUserB
    // };
    // this.countNotif(notData);
  },
  computed: {
    ...mapGetters([
      "getUserData",
      "getContacts",
      "getRooms",
      "getMsg",
      "getNotif",
      "getUserB"
    ])
  },
  components: {},
  methods: {
    ...mapActions([
      "addContacts",
      "getContact",
      "joinRooms",
      "getRoom",
      "logout",
      "deleteContact",
      "getMessage",
      "countNotif"
    ]),
    ...mapMutations(["setNotif", "addMessage", "setSend", "setHead"]),

    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }

      const data = {
        friend_email: this.name,
        user_id: this.getUserData.user_id
      };
      console.log(data);
      this.addContacts(data)
        .then(result => {
          return this.$swal("Success!", `${result.data.msg}`, "success");
        })
        .catch(error => {
          return this.$swal("warning", `${error.data.msg}`, "error");
        });
      // Push the name to submitted names
      // this.submittedNames.push(this.name);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
    joinRoom(b) {
      // console.log(s);
      const roomData = {
        user_a: this.getUserData.user_id,
        user_b: b
      };
      // console.log(roomData);
      this.joinRooms(roomData)
        .then(result => {
          return this.$swal("Success!", `${result.data.msg}`, "success");
        })
        .catch(error => {
          return this.$swal("warning", `${error.data.msg}`, "error");
        });
    },
    deleteCont(email) {
      console.log(email);
      const dataDel = {
        user_id: this.getUserData.user_id,
        friend_email: email
      };
      console.log(dataDel);
      this.deleteContact(dataDel)
        .then(result => {
          return this.$swal("Success!", `${result.data.msg}`, "success");
        })
        .catch(error => {
          return this.$swal("warning", `${error.data.msg}`, "error");
        });
    },
    getMessages(room, user_b, name, pic, onoff) {
      if (this.oldroom) {
        this.socket.emit("changeRoom", {
          room: room,
          oldroom: this.oldroom
        });
        this.oldroom = room;
      } else {
        this.socket.emit("joinRoom", {
          room: room
        });
        this.oldroom = room;
      }
      const data = {
        id_room: room,
        receiver_id: this.getUserData.user_id
      };
      const dataSend = {
        id_room: room,
        receiver_id: this.getUserData.user_id,
        sender_id: user_b
      };
      const dataHead = {
        username: name,
        photo: pic,
        status: onoff
      };
      this.setHead(dataHead);
      this.setSend(dataSend);
      this.getMessage(data);
      this.setNotif(0);
    },
    toProfile() {
      this.$router.push("/profile");
    },
    toLogout() {
      this.logout(this.getUserData.user_id);
    }
  }
};
</script>

<style>
.list h4 {
  padding-top: 25px;
  padding-left: 30px;
  padding-bottom: 20px;
  text-align: left;
  font-family: "Rubik", sans-serif;
  color: #7e98df;
  font-weight: 700;
}

.drop {
  border: none;
  padding-top: 15px;
  width: 50px;
  height: 50px;
}

button {
  padding-top: 3px;
  border: none;
  background-color: rgba(255, 255, 255, 0);
}

.drop .dropdown-toggle::after {
  display: none;
  appearance: none;
}

.drop .dropdown-menu {
  background-color: #7e98df;
  border-radius: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
}

.drop .dropdown-item {
  color: white;
  font-family: "Rubik", sans-serif;
  font-size: 15px;
}

.drop .dropdown-item :hover {
  background-color: #697fb9;
  color: white;
  font-family: "Rubik", sans-serif;
  font-weight: bold;
}

.drop .dropdown-item li :hover {
  background-color: #697fb9;
}

.list .form-group {
  padding-left: 30px;
}

.list .login-form {
  border-style: none;
  background-color: rgb(243, 243, 243);
  border-radius: 10px;
  border-color: rgb(221, 221, 221);
  font-size: 12px;
}

.list button {
  padding-top: 3px;
  border: none;
  background-color: rgba(255, 255, 255, 0);
}

.card {
  width: 100%;
  border-radius: 30px;
}

.list-photo {
  width: 100px;
  height: 100px;
  background-size: cover;
  border-radius: 20px;
  box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.205);
}

.contlist .contact-name {
  font-size: 25px;
  font-weight: bold;
  padding-left: 70px;
  margin-left: 70px;
  margin-top: 30px;
  color: #697fb9;
}

.contlist .card-body {
  padding: 5px;
}

.cards .photo img {
  border-radius: 10px;
}

.cards .card-body {
  padding: 0 15px;
}

.name p {
  text-align: left;
  padding-top: 28px;
  font-family: "Rubik", sans-serif;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  color: #1b316b;
}

.msg {
  text-align: left;
  margin-top: -15px;
  font-family: "Rubik", sans-serif;
  color: #4a67b6;
  font-size: 15px;
}

.cards .card-body {
  border: none;
}

.cards .card {
  border-color: #7e98df00;
}

.nameat p {
  padding-left: 127px;
  color: #697fb9;
  font-weight: bold;
}

.friendname h5 {
  text-align: center;
  color: rgb(34, 34, 34);
  font-weight: bold;
  font-size: 25px !important;
}

.friendpn p {
  font-family: "Rubik", sans-serif;
  color: rgb(128, 128, 128);
  margin-bottom: 0;
}

.friendpn h5 {
  text-align: center;
  font-family: "Rubik", sans-serif;
  color: #697fb9;
  font-size: 15px !important;
}

.friendbio p {
  font-family: "Rubik", sans-serif;
  color: rgb(128, 128, 128);
  margin-bottom: 0;
}

.friendbio h5 {
  text-align: center;
  font-family: "Rubik", sans-serif;
  color: #697fb9;
  font-size: 15px !important;
}

.deleteC button {
  color: #697fb9;
}

.btn-primary {
  background-color: #697fb9 !important;
  border-color: rgba(255, 255, 255, 0) !important;
}
</style>
