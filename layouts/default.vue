<template lang="pug">
v-app.root
  HeaderComponent(ref="")
  v-main
    Nuxt
  FooterComponent(ref="footer")
  button.scroll-to-top(
    ref="scroll_to_top"
    @click="scrollToTop"
  )
    span Scroll To Top
    v-icon mdi-arrow-up
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      observer: null
    }
  },
  methods: {
    scrollToTop () {
      if (window) window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  },
  mounted () {
    // 参考：https://sbfl.net/blog/2017/07/04/javascript-intersection-observer/
    const footer = this.$refs.footer.$el
    const scrollToTopButton = this.$refs.scroll_to_top
    this.observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (footer == entry.target) {
          if (entry.isIntersecting) scrollToTopButton.style.transform = 'translateX(0%)'
          else scrollToTopButton.style.transform = 'translateX(200%)'
        }
      }
    })
    this.observer.observe(footer)
  },
  unmounted () {
    this.observer.disconnect()
  }
}
</script>

<style scoped lang="sass">
  .root
    overflow: hidden
    button.scroll-to-top
      transition: .3s
      padding: 16px
      background: black
      position: fixed
      z-index: 9999
      right: 16px
      bottom: 16px
      outline: solid 1px mix(black, dimgray)
      font-weight: bold
      font-family: $font-family
</style>
