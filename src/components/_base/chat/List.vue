<template>
  <div class="list">
    <b-row>
      <b-col cols="9">
        <h4>Telegram</h4>
      </b-col>
      <b-col cols="3">
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
    <!-- <b-card> -->
    <!-- <Card /> -->
    <div class="cards">
      <b-card>
        <b-row v-for="(item, index) in getRooms" :key="index">
          <b-col cols="3">
            <div class="photo">
              <b-img
                v-b-toggle.sidebar-right
                left
                :src="'http://localhost:3000/profile/' + item.photo"
                alt="photo"
              ></b-img>
            </div>
          </b-col>
          <b-col cols="9">
            <b-row>
              <b-col cols="12">
                <div class="name">
                  <!-- name -->
                  {{ item.username }}
                </div></b-col
              >
              <b-col cols="12"
                ><div class="msg">
                  Message
                </div></b-col
              >
            </b-row>
          </b-col>
          <b-sidebar id="sidebar-right" right shadow>
            <div class="px-3 py-2">
              <div class="nameat">
                <p>@{{ item.username }}</p>
              </div>

              <b-img
                left
                :src="'http://localhost:3000/profile/' + item.photo"
                alt="photo"
              ></b-img>
              <br />
              <div class="friendname">
                <h5>{{ item.username }}</h5>
              </div>
              <br />
              <div class="friendpn">
                <p>phone number</p>
                <h5>{{ item.phone_number }}</h5>
              </div>
              <div class="friendbio">
                <p>bio</p>
                <h5>{{ item.bio }}</h5>
              </div>
              <div class="maps">
                <GmapMap
                  :center="coordinate"
                  :zoom="10"
                  map-type-id="roadmap"
                  style="width: 250px; height: 170px"
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
    <!-- </b-card> -->
    <!-- <b-button v-b-modal.modal-prevent-closing>Open Modal</b-button> -->

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
                <!-- <img src="../../../assets/pict_default.jpg"  /> -->
              </div>
            </b-col>
            <b-col cols="9">
              <div class="contact-name">
                {{ item.username }}
              </div>
            </b-col>
          </b-card>
        </b-row>
      </b-modal>
    </div>
    <!-- <div> -->
    <!-- <b-sidebar id="sidebar-right" right shadow>
        <div class="px-3 py-2">
          <p>@nama orang</p>
          <b-img
            left
            src="'http://localhost:3000/profile/' + getUserProfile[0].photo"
            alt="photo"
          ></b-img>
          <br />
          <h4>username</h4>
          <br /><br />
          <br />
          <p>phone number</p>
          <h4>08123213123</h4>
          <p>bio</p>
          <h4>Available</h4>
          <div class="maps">
            <GmapMap
              :center="coordinate"
              :zoom="10"
              map-type-id="roadmap"
              style="width: 250px; height: 170px"
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
      </b-sidebar> -->
    <!-- </div> -->
  </div>
</template>

<script>
// import Card from "../../_base/chat/Card";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "List",
  data() {
    return {
      name: "",
      nameState: null,
      results: "",
      user_b: "",
      coordinate: {
        lat: -10,
        lng: 110
      }
    };
  },
  created() {
    this.getContact(this.getUserData.user_id);
    this.getRoom(this.getUserData.user_id);
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
  },
  computed: {
    ...mapGetters(["getUserData", "getContacts", "getRooms"])
  },
  components: {
    // Card
  },
  methods: {
    ...mapActions([
      "addContacts",
      "getContact",
      "joinRooms",
      "getRoom",
      "logout"
    ]),

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
    toProfile() {
      this.$router.push("/profile");
    },
    toLogout() {
      this.logout();
    }
    // clickMarker(pos) {
    //   console.log("jalan");
    //   console.log(pos);
    //   console.log(pos.latLng.lat());
    //   console.log(pos.latLng.lng());
    //   this.coordinate = {
    //     lat: pos.latLng.lat(),
    //     lng: pos.latLng.lng()
    //   };
    // }
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

.drop .dropdown-toggle select {
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
  box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.205);
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
  /* margin: 8% auto; */
  color: #697fb9;
}

.cards .photo {
  padding-left: 5px;
}

.cards .photo img {
  width: 100px;
  height: 100px;
  background-size: cover;
  border-radius: 20px;
  box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.205);
}

.cards .photo .card {
  width: 100px;
  height: 100px;
  border-radius: 20px;
  margin-left: 15px;
}

.name {
  padding-left: 50px;
  text-align: left;
  padding-top: 10px;
  font-family: "Rubik", sans-serif;
  font-weight: bold;
  font-size: 25px;
}

.msg {
  padding-left: 50px;
  text-align: left;
  padding-top: 10px;
  font-family: "Rubik", sans-serif;
  color: #7e98df;
  font-size: 20px;
}

.cards .card-body {
  border: none;
}

.cards .card {
  border: none;
  box-shadow: none;
}

.nameat p {
  padding-left: 127px;
  color: #697fb9;
  font-weight: bold;
}

.friendname h5 {
  padding-left: 35px;
  color: rgb(34, 34, 34);
  font-weight: bold;
  font-size: 25px !important;
}

.friendpn p {
  font-family: "Rubik", sans-serif;
  color: grey;
}

.friendpn h5 {
  font-family: "Rubik", sans-serif;
  color: rgb(0, 0, 0);
  font-weight: bold;
  font-size: 20px !important;
}

.friendbio p {
  font-family: "Rubik", sans-serif;
  color: grey;
}

.friendbio h5 {
  font-family: "Rubik", sans-serif;
  color: rgb(0, 0, 0);
  font-weight: bold;
  font-size: 20px !important;
}
</style>
