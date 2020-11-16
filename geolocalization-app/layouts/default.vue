<template>
  <v-app dark>
    <v-app-bar color="primary" :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <template color="secondary">
        <v-btn color="primary">
          <v-icon color="secondary">mdi-account</v-icon>
          <div>Account</div>
        </v-btn>
        <v-btn
          color="primary"
          @click="$router.push(config.routes.front.login.path)"
        >
          <v-icon>mdi-exit-to-app</v-icon>
          <div>exit</div>
        </v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <Toast />
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { common } from "@/mixins/common";
import config from "@/assets/js/config";
import Toast from "@/components/Toast";

export default {
  components: { Toast },
  data() {
    return {
      config: config,
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Geolocalizacion",
    };
  },
  created() {
    this.sessionState();
  },
  computed: {
    ...mapGetters(["getCookie"]),
  },
  methods: {
    ...mapMutations(["resetCookie"]),
    close() {
      this.resetCookie();
      this.$router.push("/");
    },
    /**
     *  Valida el estado de la sesion segun el token
     */
    async sessionState() {
      try {
        let userToken = this.getCookie(config.cookie.token);
        if (userToken) {
          //Valido el token
          this.validating = true;
        } else {
          this.$store.commit("messageToast", "Please Login.");
          this.$router.push(config.routes.front.login.path);
        }
      } catch (error) {
        console.log(error);
        this.$router.push(config.routes.front.login.path);
      }
    },
  },
};
</script>
