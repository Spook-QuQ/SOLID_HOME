<template lang="pug">
  .banner-root.py-16
    v-slide-group(
      show-arrows
      center-active
      light
      ref="sliders"
    )
      v-slide-item(
        v-for="banner in bannerData"
        :key="banner.id"
        v-slot="{ active, toggle }"
      )
        a.banner(
          @click="active ? openUrlWithBlank(banner.link) : toggle()"
        )
          img(:src="banner.image")
</template>

<script>
export default {
  props: ['bannerData'],
  data: () => ({
    currentSliderIndex: 0,
    sliderLength: 1000,
    si: null
  }),
  methods: {
    openUrlWithBlank (url) {
      window.open(url, '_blank')
    },
    nextSlider () {
      this.currentSliderIndex = (this.currentSliderIndex + 1) % (this.sliderLength - 1)
      this.$refs.sliders.$children[this.currentSliderIndex].$el.click()
    }
  },
  mounted () {
    this.sliderLength = this.$refs.sliders.$children.length
    this.si = setInterval(this.nextSlider, 7 * 1000)
  },
  unmount () {
    clearInterval(this.si)
  }
}
</script>

<style lang="sass" scoped>
.banner-root
  background: $subcolor
  .v-slide-group
    background: transparent
    a.banner
      width: 380px
      // user-select: none
      // -webkit-user-drag: none
      // -webkit-touch-callout: none
      padding: 8px
      +mediaMax(500px)
        width: 240px
      +mediaMax(360px)
        width: 180px
      img
        width: 100%

</style>
