import { mapMutations } from 'vuex'
const WIDTH = 992

export default {
  created() {
    this.resizeHandler()
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    ...mapMutations(['COLLAPSE_SIDEBAR', 'TOGGLE_SIDEBAR']),
    isMobile() {
      const rect = document.body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        isMobile && this.COLLAPSE_SIDEBAR()
      }
    }
  }
}
