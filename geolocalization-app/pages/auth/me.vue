<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center"></div>
      <v-card>
        <v-card-title class="headline">
          Hello {{ currentData.name }}
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="currentData.id"
              label="Id"
              name="Id"
              type="text"
              disabled
              outlined
            ></v-text-field>
            <v-text-field
              v-model="currentData.name"
              label="Name"
              name="Name"
              type="text"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="currentData.email"
              label="Email"
              name="Email"
              type="text"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="currentData.email_verified_at"
              label="Email Verified"
              name="emailVerified"
              type="text"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="currentData.created_at"
              label="Create at"
              name="createAt"
              type="text"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="currentData.updated_at"
              label="Update At"
              name="updateAt"
              type="text"
              outlined
            ></v-text-field>
          </v-form>
        </v-card-text>
      </v-card>
      <Toast />
    </v-col>
  </v-row>
</template>

<script>
import config from "@/assets/js/config";
import Toast from "@/components/Toast";
import { common } from "@/mixins/common";

export default {
  mixins: [common],
  data() {
    return {
      path: config.routes.back.me.path,
      currentData: {},
      loading: false,
      message: "",
    };
  },
  components: { Toast },
  beforeMount() {
    this.accountData();
  },
  methods: {
    /**
     * Obtiene la informacion del usuario
     */
    async accountData() {
      try {
        let url = this.path;
        let response = await this.$axios.get(url, this.getOptions());
        if (response.status == 200) {
          this.currentData = Object.assign({}, response.data);
          this.formatDate(this.currentData);
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
