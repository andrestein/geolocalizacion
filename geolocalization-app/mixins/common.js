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
    }
  }
}
