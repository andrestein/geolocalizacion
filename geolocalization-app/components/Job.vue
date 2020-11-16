<template>
  <v-card>
    <v-img :src="job.image" height="200px"></v-img>
    <v-card-title class="headline"> {{ job.title }} </v-card-title>
    <v-card-text>
      <p>{{ job.description }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
import config from "@/assets/js/config";
import { common } from "@/mixins/common";

export default {
  mixins: [common],
  prop: ["job"],
  watch: {
    job: function () {
      this.currentData = this.job;
    },
  },
  data() {
    return {
      path: config.routes.back.me.path,
      loading: false,
      currentData: {},
      message: "",
    };
  },
  methods: {},
};
</script>
