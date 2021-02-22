<template>
  <div class="cards">
    <b-row>
      <b-col cols="3">
        <div class="photo">
          <b-card>
            <b-img
              left
              :src="'http://localhost:3000/profile/' + item.photo"
              alt="photo"
            ></b-img>
          </b-card>
        </div>
      </b-col>
      <b-col cols="9">
        <b-row>
          <b-col cols="12">
            <div class="name">
              name
              <!-- {{ item.username }} -->
            </div></b-col
          >
          <b-col cols="12"
            ><div class="msg">
              Message
            </div></b-col
          >
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Card",
  data() {
    return {};
  },
  created() {
    // this.getRoom(this.getUserData.user_id);
  },
  computed: {
    // ...mapGetters(["getRooms"])
  },
  methods: {
    ...mapActions(["getRoom"])
  }
};
</script>

<style>
.cards .photo {
  padding-left: 10px;
}

.cards .photo .card {
  width: 100px;
  height: 100px;
  border-radius: 20px;
  margin-left: 15px;
}

.name {
  padding-left: 25px;
  text-align: left;
  padding-top: 10px;
  font-family: "Rubik", sans-serif;
  font-weight: bold;
  font-size: 25px;
}

.msg {
  padding-left: 25px;
  text-align: left;
  padding-top: 10px;
  font-family: "Rubik", sans-serif;
  color: #7e98df;
  font-size: 20px;
}

.cards .card-body {
  border: none;
}
</style>
