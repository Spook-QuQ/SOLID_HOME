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
  div.cookie-agreement(v-if="!cookieAgreement")
    v-col(cols="8"): p このウェブサイトでは、Cookieなどのデータを保管することで、アナリティクスやターゲティング、パーソナライゼーションなど、サイトの重要な機能を可能にしています。 このウェブサイトに留まることで、当該システムの使用に同意したものとみなされます。
    v-col(cols="4"): button(@click="closeCookieAgreement") 分かりました
</template>

<script>
export default {
  name: 'DefaultLayout',
  data: () => ({
    observer: null,
    cookieAgreement: false
  }),
  methods: {
    scrollToTop () {
      if (window) window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },
    closeCookieAgreement () {
      this.cookieAgreement = true
      if (localStorage) {
        localStorage.cookieAgreement = 'close'
      }
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

    if (localStorage) {
      if (localStorage.cookieAgreement === 'close') this.cookieAgreement = true
    }
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
    div.cookie-agreement
      display: flex
      justify-content: center
      align-items: center
      position: fixed
      width: 100%
      bottom: 0px
      background: lightgray
      color: mix(black, dimgray)
      padding: 8px
      box-shadow: 0px 16px 20px 8px black
      p
        margin-bottom: 0px
        font-size: 14px
      button
        border: 4px solid rgba(dimgray, 0.3)
        padding: 16px
        font-weight: bold
        color: rgba(dimgray, 0.8)
        font-size: 14px
</style>
