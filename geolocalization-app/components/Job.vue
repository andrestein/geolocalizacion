<template>
  <v-card>
    <v-img :src="currentData.image"></v-img>
    <v-card-title class="headline"> {{ currentData.title }} </v-card-title>
    <v-card-text>
      <p>{{ currentData.description }}</p>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Date:</v-list-item-title>
          <v-list-item-subtitle>{{currentData.date}}</v-list-item-subtitle>
          <v-list-item-title>Status</v-list-item-title>
          <v-list-item-subtitle>{{currentData.status}}</v-list-item-subtitle>
          <v-list-item-title>Assigned to</v-list-item-title>
          <v-list-item-subtitle>{{currentData.assigned_to}}</v-list-item-subtitle>
          <v-list-item-title>created at</v-list-item-title>
          <v-list-item-subtitle>{{currentData.created_at}}</v-list-item-subtitle>
          <v-list-item-title>updated at</v-list-item-title>
          <v-list-item-subtitle>{{currentData.updated_at}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
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
        console.log(val);
        this.currentData = Object.assign({}, this.formatDate(val));
      },
      deep: true,
    },
  },
  data() {
    return {
      path: config.routes.back.me.path,
      dialog: false,
      currentData: {},
    };
  },
  methods: {},
};
</script>
