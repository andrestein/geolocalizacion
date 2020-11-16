<template>
  <div>
    <br />
    <br />
    <br />
    <v-row mb="6" justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-spacer></v-spacer>
        <div class="text-center">
          <img src="/rootstack.png" />
        </div>
        <v-card>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="currentData.email"
                label="Email"
                name="email"
                :rules="[rules.required, rules.email]"
                prepend-icon="mdi-account"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="currentData.password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              ></v-text-field>
            </v-form>
            <v-progress-linear
              :active="loading"
              indeterminate
              color="blue"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="text-capitalize"
              color="secondary"
              rounded
              @click="login()"
              >Login</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <Toast />
  </div>
</template>

<script>
import config from "@/assets/js/config";
import { mapMutations } from "vuex";
import Toast from "@/components/Toast";

export default {
  layout: "blank",
  data() {
    return {
      path: config.routes.back.login.path,
      currentData: {},
      loading: false,
      message: "",
      rules: {
        required: value => !!value || 'Required.',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid email";
        },
      },
    };
  },
  components: { Toast },
  beforeMount() {
    this.load();
  },
  methods: {
    ...mapMutations(["resetToast", "resetCookie", "setheader"]),
    /**
     * Reinicia los storages del browser
     */
    load() {
      this.resetToast();
      this.resetCookie();
    },
    async login() {
      try {
        let url = this.path;
        this.loading = true;
        let response = await this.$axios.post(url, this.currentData, {});
        if (response.status == 200) {
          this.setheader(response.data);
          this.loading = false;
          this.$router.push(config.routes.front.jobs.path);
        }
      } catch (error) {
        this.loading = false;
        this.$store.commit("messageToast", "Login failed. Possible reasons can be: Invalid Email / password");
      }
    },
  },
};
</script>
