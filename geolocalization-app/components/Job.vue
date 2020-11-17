<template>
  <v-card>
    <v-img :src="currentData.image"></v-img>
    <v-card-title class="headline"> {{ currentData.title }} </v-card-title>
    <v-card-text>
      <p>{{ currentData.description }}</p>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Date:</v-list-item-title>
          <v-list-item-subtitle>{{ currentData.date }}</v-list-item-subtitle>
          <v-list-item-title>Status</v-list-item-title>
          <v-list-item-subtitle>{{ currentData.status }}</v-list-item-subtitle>
          <v-list-item-title>Assigned to</v-list-item-title>
          <v-list-item-subtitle>{{
            currentData.assigned_to
          }}</v-list-item-subtitle>
          <v-list-item-title>created at</v-list-item-title>
          <v-list-item-subtitle>{{
            currentData.created_at
          }}</v-list-item-subtitle>
          <v-list-item-title>updated at</v-list-item-title>
          <v-list-item-subtitle>{{
            currentData.updated_at
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <div v-if="currentData.latitude">
        <div id="map-wrap" style="height: 200px">
          <no-ssr>
            <l-map :zoom="13" :center="getLocation()">
              <l-tile-layer
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              ></l-tile-layer>
              <l-marker :lat-lng="getLocation()"></l-marker>
            </l-map>
          </no-ssr>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import config from "@/assets/js/config";
import { common } from "@/mixins/common";

export default {
  mixins: [common],
  name: "job",
  props: ["job"],
  watch: {
    job: {
      handler(val, oldVal) {
        this.currentData = {};
        if (val) {
          this.currentData = Object.assign({}, this.formatDate(val));
        }
      },
      deep: true,
    },
  },
  beforeMount() {
    if (this.job) {
      this.currentData = Object.assign({}, this.formatDate(this.job));
    }
  },
  data() {
    return {
      path: config.routes.back.me.path,
      dialog: false,
      currentData: {},
    };
  },
  methods: {
    getLocation() {
      if (this.currentData) {
        return [this.currentData.latitude, this.currentData.longitude];
      }
    },
  },
};
</script>
