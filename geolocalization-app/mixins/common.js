import { mapGetters, mapMutations } from 'vuex'

export const common = {
  watch: {},
  computed: {
    ...mapGetters(['getCookie'])
  },
  methods: {
    ...mapMutations(['messageError', 'messageToast', 'setCookie', 'setData']),
    getOptions() {
      let header = this.$store.getters.getHeader
      return { headers: header }
    }
  }
}
