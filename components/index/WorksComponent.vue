<template lang="pug">
  .works-root
    .head-wrapper
      SectionTitleComponent.section-title(
        title="Works"
        subtitle="実績・事例"
      )
      p.scroll-buttons.text-right
        v-btn.mr-2(
          icon
          outlined
          color="black"
          @click="scrollSliderAction(false)"
          :class="currentSliderIndex == 0 ? 'disabled' : ''"
        ): v-icon mdi-chevron-left
        v-btn(
          icon
          outlined
          color="black"
          @click="scrollSliderAction(true)"
          :class="currentSliderIndex == worksData.length - 1 ? 'disabled' : ''"
        ): v-icon mdi-chevron-right
    .banner-slider-wrapper
      .banner-slider(
        ref="slider"
        :style="`transform: translateX(${ scrollPosition }px)`"
      )
        .slider(v-for="work in worksData")
          a
            .img-wrapper
              img(:src="work.eyecatch")
            .head
              time {{ new Date(work.createdAt).toLocaleString().split(' ')[0] }}
              h3 {{ work.title }}
            span {{ work.content }}
    div.text-center.mb-0.pt-4.pb-14.view-more-button
      ViewMoreButton(url="/works" text="実績・事例をもっと見る")
</template>

<script>
export default {
  props: ['worksData'],
  data: () => ({
    currentSliderIndex: 0,
    si: null,
    timeout: null,
    scrollPosition: 0
  }),
  methods: {
    generatePosition() {
      if (!this.$refs.slider) return
      if (!this.$refs.slider.children.length) return
      const offsetWidth = this.$refs.slider.children[0].offsetWidth
      const marginRight = 40
      return (offsetWidth + marginRight) * this.currentSliderIndex * -1
    },
    scrollSliderAction (bool) { // trueで右へ、aflseで左へ
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => this.timeout = null, 6 * 1000)

      if (bool) {
        if (this.currentSliderIndex < this.worksData.length - 1) this.currentSliderIndex += 1
      }
      else {
        if (this.currentSliderIndex > 0) this.currentSliderIndex -= 1
        // else
      }

      this.scrollPosition = this.generatePosition()
    }
  },
  mounted () {
    if (!this.worksData || !this.worksData.length) return
    this.scrollPosition = this.generatePosition()
    this.si = setInterval(() => {
      if (this.timeout) return
      this.currentSliderIndex = (this.currentSliderIndex + 1) % this.worksData.length
      this.scrollPosition = this.generatePosition()
    }, 7 * 1000)
  },
  beforeUnmount () {

  }
}
</script>

<style lang="sass" scoped>
  .works-root
    z-index: 1
    background: $subcolor
    .head-wrapper
      padding: 40px
      .section-title
        // +mediaMin(1000px)
        //   margin-left: 14vw
      .scroll-buttons
        max-width: 1248px
        margin: auto
        // margin-right: 40px
        // +mediaMin(1000px)
        padding-top: 40px
        .v-btn
          &.disabled
            opacity: 0.3
    .banner-slider-wrapper
      // overflow: hidden
      position: relative
      // +mediaMin(1000px)
      //   margin-left: 18vw
      //   margin-right: -100vw
      position: relative
      +mediaMax(1000px)
        margin-right: -50vw
      &::before
        content: ""
        display: block
        background: white
        // background: red
        position: absolute
        width: 100% * (3 / 4)
        height: 100%
        left: 0px
        top: 30%
        +mediaMax(1000px)
          width: 100%
      .banner-slider
        display: flex
        flex-flow: nowrap
        transition: .3s
        margin-right: -480px
        margin-left: 480px
        +mediaMax(1000px)
          margin-left: 40px
        .slider
          margin-right: 40px
          max-width: 440px
          a
            display: block
            position: relative
            overflow: hidden
            .img-wrapper
              aspect-ratio: 5 / 3
              img
                background-size: cover
                width: 100%
                // position: absolute
                // left: 50%
                // top: 50%
                // transform: translate(-50%, -50%)
            .head
              margin-top: 16px
              time
                color: #8E9095
              h3
                color: mix(dimgray, black)
                // color: black
                margin-top: 16px
                font-size: 24px
                font-family: $font-family
                +mediaMax(700px)
                  font-size: 20px
            span
              display: block
              margin-top: 16px
              color: #8E9095
              +mediaMax(700px)
                font-size: 15px
  .view-more-button
    position: relative
    z-index: 10
</style>
