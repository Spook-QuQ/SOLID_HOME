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
          NuxtLink(:to="`/works/` + work.id")
            .img-wrapper
              img(
                :src="work.eyecatch"
                :aspect-ratio="4 / 3"
              )
            .head
              time {{ new Date(work.createdAt).toLocaleString().split(' ')[0] }}
              h3 {{ work.title }}
            span {{ work.content }}
    div.text-center.mb-0.pt-4.pb-14.view-more-button
      ViewMoreButton(url="/works" text="実績・事例をもっと見る")
</template>

<script>
import {
  // mapState,
  // mapGetters,
  // mapMutations,
  // mapActions
} from 'vuex'
import {
  defineComponent,
  // h,
  ref,
  // toRef,
  toRefs,
  reactive,

  useFetch, // nuxt専用
  // useStatic, // nuxt専用
  // useAsync, // nuxt専用
  // useContext, // nuxt専用
  // useRoute,
  // useRouter,
  // useMeta, // vue3では vue-meta パッケージが必要

  // wrapProperty, // nuxt専用
  // onGrobalSetup, // nuxt専用
  // reqRef, // nuxt専用
  // reqSsrRef, // nuxt専用
  // ssrRef, // nuxt専用
  // shallowSsrRef, // nuxt専用

  // onBeforeMount,
  // onMounted,
  // onBeforeUpdate,
  // onUpdated,
  // onBeforeUnmount,
  // onUnmounted,
  // onErrorCaptured,
  // onRenderTracked,
  // onRenderTriggered,
  // onActivated,
  // onDeactivated,

  // computed,
  // watch,
  // watchEffect,

  // provide,
  // inject,
  // readonly,

  // isReactive
} from '@nuxtjs/composition-api'

export default defineComponent({
  // props: {},
  // head: () => ({}),
  setup (
    // props,
    // attrs,
    // slots,
    // emit
  ) {
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
          'createdAt',
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
        worksData[i].eyecatch = await axiosImageToBase64(work.eyecatch.url + '?w=1500')
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
      clearTimeout(data.timeout)
      data.timeout = setTimeout(() => data.timeout = null, 6 * 1000)

      if (bool) {
        if (data.currentSliderIndex < data.worksData.length - 1) data.currentSliderIndex += 1
      }
      else {
        if (data.currentSliderIndex > 0) data.currentSliderIndex -= 1
        // else
      }

      data.scrollPosition = generatePosition()
    }

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
        // +mediaMin(1000px)
        //   margin-left: 14vw
        margin: 40px
        margin-top: 0px
        +mediaMax(416px)
          margin: 0px
      .scroll-buttons
        max-width: 1248px
        margin: auto
        // margin-right: 40px
        // +mediaMin(1000px)
        // padding-top: 40px
        padding: 40px
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
          &:hover
            background: mix(mix(white, lightgray), transparent)
          a
            display: block
            position: relative
            overflow: hidden
            text-decoration: none
            .img-wrapper
              aspect-ratio: 4 / 3
              overflow: hidden
              img
                background-size: cover
                width: 100%
                position: relative
                left: 50%
                top: 50%
                transform: translate(-50%, -50%)
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
