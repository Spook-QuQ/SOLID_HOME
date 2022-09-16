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
       v-row.banner-slider(
        no-gutters
        ref="slider"
        :style="`transform: translateX(${ scrollPosition }px)`"
      )
        v-col.slider(
          no-gutters
          v-for="work in worksData"
          cols="12"
          md="4"
          lg="4"
          xl="4"
        )
          NuxtLink(:to="`/works/` + work.id")
            .img-wrapper
              v-img(
                :src="work.eyecatch"
                :aspect-ratio="4 / 3"
              )
                v-row.pa-2(no-gutters)
                  v-spacer
                  v-btn(icon color="white"): v-icon mdi-exit-to-app
            //- .head
            //-   time {{ new Date(work.publishedAt).toLocaleString().split(' ')[0] }}
            //-   h3 {{ work.title }}
            //- span {{ work.content }}
    div.text-center.mb-0.pt-8.pb-14.view-more-button
      ViewMoreButton(url="/works" text="実績・事例をもっと見る")
</template>

<script>
import {
  defineComponent,
  ref,
  toRefs,
  reactive,
  useFetch,
  onMounted,
  onBeforeUnmount
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const data = reactive({
      worksData: [],
      currentSliderIndex: 0,
      si: null,
      timeout: null,
      scrollPosition: 0
    })

    useFetch(async () => {
      const {
        reqCMS,
        axiosImageToBase64,
        textContentBlocksToText
      } = await import('~/module/index.js')

      const resData = await reqCMS('news', {
        filters: 'categories[contains]実績[or]categories[contains]事例',
        richEditorFormat: 'object' ,
        fields: [
          'id',
          'title',
          'publishedAt',
          'content',
          'eyecatch',
          'categories'
        ].join(',')
      })

      const worksData = await Promise.all(
        resData.contents.map((works, i) => new Promise(async (resolve, reject) => {
          if (works.content && works.content.contents && works.content.contents.length) {
            works.content = textContentBlocksToText(works.content.contents)
            resolve(works)
          }
        }))
      )

      await Promise.all(worksData.map((work, i) => new Promise(async (resolve, reject) => {
        if (!work.eyecatch) work.eyecatch = (await import('~/assets/placeholder-image-icon-7.png')).default
        else worksData[i].eyecatch = await axiosImageToBase64(work.eyecatch.url + '?w=1500')
        resolve()
      })))

      data.worksData = worksData
    })

    const slider = ref(null)

    const generatePosition = () => {
      if (!slider.value) return
      if (!slider.value.children.length) return
      const offsetWidth = slider.value.children[0].offsetWidth
      const marginRight = 40
      return (offsetWidth + marginRight) * data.currentSliderIndex * -1
    }

    const scrollSliderAction = bool => { // trueで右へ、aflseで左へ

      // ボタンでスライダーを動かした時のクールタイム
      clearTimeout(data.timeout)
      data.timeout = setTimeout(() => data.timeout = null, 6 * 1000)

      if (bool) {
        if (data.currentSliderIndex < data.worksData.length - 1) data.currentSliderIndex += 1
      }
      else {
        if (data.currentSliderIndex > 0) data.currentSliderIndex -= 1
      }

      data.scrollPosition = generatePosition()
    }

    onMounted(() => {
      const si = setInterval(() => {
        if (data.timeout) return // ボタンでスライダーを動かした時のクールタイム
        if (data.currentSliderIndex < data.worksData.length - 1) data.currentSliderIndex += 1
        else data.currentSliderIndex = 0
        data.scrollPosition = generatePosition()
      }, 7 * 1000)
      onBeforeUnmount(() => {
        clearInterval(si)
      })
    })

    return { ...toRefs(data), scrollSliderAction, slider }
  }
})
</script>

<style lang="sass" scoped>
  .works-root
    z-index: 1
    background: $subcolor
    .head-wrapper
      padding-top: 40px
      .section-title
        margin: 40px
        margin-top: 0px
        +mediaMax(416px)
          margin: 0px
      .scroll-buttons
        max-width: 1248px
        margin: auto
        padding: 40px
        .v-btn
          &.disabled
            opacity: 0.3
    .banner-slider-wrapper
      position: relative
      // +mediaMax(1000px)
      //   margin-right: -50vw
      &::before
        content: ""
        display: block
        background: white
        position: absolute
        width: 100% * (3 / 4)
        height: 120%
        left: 0px
        top: 30%
        +mediaMax(1000px)
          width: 100%
      .banner-slider
        // display: flex
        flex-flow: nowrap
        transition: .3s
        // margin-right: -480px
        margin-left: 40px
        +mediaMax(1000px)
          margin-left: 40px
        +mediaMax(680px)
          margin-left: 0px
        // +mediaMax(416px)
        //   margin-left: 0px
        .slider
          margin-right: 40px
          max-width: 640px
          // +mediaMax(760px)
          //   width: 80vw
          // +mediaMax(416px)
          //   width: 100vw
          //   padding: 8px
          &:hover
            background: mix(mix(white, lightgray), transparent)
          a
            display: block
            position: relative
            overflow: hidden
            text-decoration: none
            // .img-wrapper
            // .head
            //   margin-top: 16px
            //   time
            //     color: #8E9095
            //   h3
            //     color: mix(dimgray, black)
            //     // color: black
            //     margin-top: 16px
            //     font-size: 24px
            //     font-family: $font-family
            //     +mediaMax(700px)
            //       font-size: 20px
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
