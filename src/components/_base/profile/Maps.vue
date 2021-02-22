<template>
  <div class="maps">
    <GmapMap
      :center="coordinate"
      :zoom="10"
      map-type-id="roadmap"
      style="width: 345px; height: 200px"
    >
      <GmapMarker
        :position="coordinate"
        :clickable="true"
        :draggable="true"
        @click="clickMarker"
        icon="https://img.icons8.com/color/48/000000/map-pin.png"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: "Maps",
  data() {
    return {
      coordinate: {
        lat: -10,
        lng: 110
      }
    };
  },
  created() {
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
  methods: {
    clickMarker(pos) {
      console.log("jalan");
      console.log(pos);
      console.log(pos.latLng.lat());
      console.log(pos.latLng.lng());
      this.coordinate = {
        lat: pos.latLng.lat(),
        lng: pos.latLng.lng()
      };
    }
  }
};
</script>

<style>
.maps {
  padding-left: 30px;
}
</style>
