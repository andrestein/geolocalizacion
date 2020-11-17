<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center"></div>
      <v-card>
        <v-card-title class="headline"> Welcome to your Job list </v-card-title>
      </v-card>
      <v-card-text>
        <v-data-table
          :page="page"
          :pageCount="numberOfPages"
          :headers="headers"
          hide-default-footer
          :server-items-length="totalJobs"
          :items="jobs"
          :options.sync="options"
          :loading="loading"
          class="elevation-1"
        >
          <template v-slot:item.action="{ item }">
            <v-icon
              @click="                
                job = Object.assign({}, item);
                dialogJob = true;
                $forceUpdate();
              "
              >mdi-eye</v-icon
            >
          </template>
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="numberOfPages"></v-pagination>
        </div>
      </v-card-text>
      <v-dialog v-model="dialogJob" max-width="450">
        <job :job="job" />
      </v-dialog>
      <Toast />
    </v-col>
  </v-row>
</template>

<script>
import config from "@/assets/js/config";
import Toast from "@/components/Toast";
import Job from "@/components/Job";
import { common } from "@/mixins/common";

export default {
  mixins: [common],
  data() {
    return {
      page: 0,
      numberOfPages: 0,
      totalJobs: 0,
      jobs: [],
      job: {},
      loading: true,
      dialogJob: false,
      headers: [
        { text: "Title", value: "title" },
        { text: "Date", value: "date" },
        { text: "status", value: "status" },
        { text: "Acciones", value: "action", sortable: false },
      ],
      options: {},
      path: config.routes.back.jobs.path,
      loading: false,
      message: "",
    };
  },
  components: { Toast, Job },
  mount() {
    this.jobsData();
  },
  watch: {
    options: {
      handler() {
        this.jobsData();
      },
    },
    deep: true,
  },
  methods: {
    test(item){
      console.log(item);
    },
    /**
     * Obtiene la informacion del usuario
     */
    async jobsData() {
      try {
        let url = this.path;
        this.loading = true;
        const { page, itemsPerPage } = this.options;
        let pageNumber = page - 1;
        let response = await this.$axios.get(
          url + "?page=" + this.page,
          this.getOptions()
        );
        this.loading = false;
        if (response.status == 200) {
          this.numberOfPages = response.data.last_page;
          this.totalJobs = response.data.per_page;
          this.jobs = response.data.data;
        }
      } catch (error) {
        this.loading = false;
        console.log(error);
        this.$store.commit("messageToast", "Pease try later.");
      }
    },
  },
};
</script>
