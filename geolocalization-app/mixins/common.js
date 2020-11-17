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
      let data = Object.assign({},currentData);
      Object.keys(data).forEach((key) => {
        if (!Number.isNaN(data[key]) && this.$moment(data[key])._isValid) {
          data[key] = this.$moment(data[key]).format("DD/MM/YYYY");
        }
      });
      return data
    },
  }
}
