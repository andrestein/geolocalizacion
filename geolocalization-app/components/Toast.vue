
<template>
  <!-- 
  Mensaje corto, informativo
  -->
  <v-card>
    <v-snackbar
      color="primary"
      v-if="message !== ''"
      v-model="show"
      :timeout="2000"
    >
      <p align="center">{{ message }}</p>
    </v-snackbar>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters({
      message: "getMessage",
    }),
    show: {
      get: function () {
        return this.$store ? this.$store.getters.showToast : false;
      },
      set: function (newValue) {
        this.$store.commit("openToast", false);
      },
    },
  },
  methods: {
    ...mapMutations(["openToast"]),
  },
};
</script>


