import { mapGetters, mapMutations } from 'vuex'

export const common = {
  watch: {},
  computed: {
    ...mapGetters(['getCookie'])
  },
  methods: {
    ...mapMutations(['messageError', 'messageToast', 'setCookie', 'setData']),
    /**
     * Header para envio en las peticiones.
     */
    getOptions() {
      let header = this.$store.getters.getHeader
      return { headers: header }
    },
    /**
     * Aplica un formato a la fecha
     */
    formatDate(currentData) {
      Object.keys(currentData).forEach((key) => {
        if (!Number.isNaN(currentData[key]) && this.$moment(currentData[key])._isValid) {
          currentData[key] = this.$moment(currentData[key]).format("DD/MM/YYYY");
        }
      });
    },
  }
}
