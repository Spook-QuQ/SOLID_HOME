<template lang="pug">
.slider-root
  v-container.wrapper.pa-0
    v-row.row.ma-0
      v-col.slider-images(cols="7")
        template(v-for="(slider, i) in sliderData")
          a(
            @click="sliderClickHandler(slider, i)"
            :style="sliderPositionCSS(i)"
            :class="visible ? 'active' : 'hidden'"
          )
            img(
              :src="slider.eyecatch"
              :class="currentSliderIndex !== i ? 'is-not-current' : ''"
            )
      v-col(cols="5").texts.d-flex.flex-column.align-center.justify-center
        v-row
          v-card(
            outlined
            color="transparent"
            v-if="currentSlider"
          ).card.px-4
            v-card-subtitle.subtitle.py-0 {{ new Date(currentSlider.createdAt).toLocaleString().split(' ')[0] }}
            v-card-title.title {{ currentSlider.title.length > 16 ? currentSlider.title.slice(0, 16) + '...' : currentSlider.title }}
            v-card-text.text {{ currentSlider.content }}
            v-card-actions.actions.pa-0
              v-btn.mx-4.my-0.mb-3(
                outlined
                small
                @click="sliderClickHandler(currentSlider, currentSliderIndex)"
                color="#8E9095"
              ) 詳細はコチラ
    v-row.slider-buttons-wrapper.ma-0.py-6
      v-spacer
      v-col.d-flex.slider-buttons.px-15(cols="5")
        button(
          v-for="(_, i) in sliderData"
          :class="currentSliderIndex === i ? 'active' : ''"
          @click="currentSliderIndex = i"
        )
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
  // ref,
  // toRef,
  toRefs,
  reactive,

  useFetch, // nuxt専用
  // useStatic, // nuxt専用
  // useAsync, // nuxt専用
  // useContext, // nuxt専用
  // useRoute,
  useRouter,
  // useMeta, // vue3では vue-meta パッケージが必要

  // wrapProperty, // nuxt専用
  // onGrobalSetup, // nuxt専用
  // reqRef, // nuxt専用
  // reqSsrRef, // nuxt専用
  // ssrRef, // nuxt専用
  // shallowSsrRef, // nuxt専用

  // onBeforeMount,
  onMounted,
  // onBeforeUpdate,
  // onUpdated,
  onBeforeUnmount,
  // onUnmounted,
  // onErrorCaptured,
  // onRenderTracked,
  // onRenderTriggered,
  // onActivated,
  // onDeactivated,

  computed,
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

    const router = useRouter()

    const data = reactive({
      sliderData: [],
      currentSliderIndex: 0,
      visible: false,
      // sliderInterval: null,
      // currentSlider: null
    })

    useFetch(async () => {
      const {
        reqCMS,
        axiosImageToBase64,
        textContentBlocksToText
      } = await import('~/module/index.js')

      const switchCategoryRoute = category => {
        switch (category) {
          case 'お知らせ': return 'news'
          case 'ブログ': return 'news'
          case '実績': return 'works'
          case '事例': return 'works'
          case 'スライダー専用': return 'slider'
          default: return null
        }
      }

      const createRoute = slider => {
        const routeCategory = switchCategoryRoute(slider.categories[0])
        if (routeCategory === 'slider') return { type: '_blank', url: slider.linkForSlider }
        else return routeCategory
          ? { url: `${routeCategory}/${slider.id}` }
          : { url: '/' }
      }

      const params = {
        filters: 'isSlider[equals]true',
        richEditorFormat: 'object' ,
        fields: [
          'id',
          'title',
          'createdAt',
          'content',
          'eyecatch',
          'categories',
          'linkForSlider'
        ].join(',')
      }
      const resData = await reqCMS('news', params)

      const { contents: sliderData } = typeof resData === 'object' ? resData : {}

      // 画像を取得してbase64に変換
      // richEditorFormatをobjectにしてaxios.getしているので
      // スライダー用に全ての文字を繋げてあげなければいけない
      // await Promise.all(
      //   sliderData.map((slider, i) => new Promise(async (resolve, reject) => {
      //     const routeCategory = switchCategoryRoute(sliderData[i].categories[0])
      //     sliderData[i].route = routeCategory
      //       ? { url: `${routeCategory}/${slider.id}` }
      //       : { url: '/' }
      //
      //     if (slider.content?.contents?.length) {
      //       sliderData[i].content = textContentBlocksToText(slider.content.contents)
      //     }
      //
      //     sliderData[i].eyecatch = await axiosImageToBase64(slider.eyecatch.url + '?w=2000')
      //
      //     resolve()
      //   }))
      // )

      await Promise.all(
        Object.values(sliderData).map((slider, i) => new Promise(async resolve => {
          const routeCategory = switchCategoryRoute(slider.categories[0])
          sliderData[i].route = routeCategory
            ? { url: `${ routeCategory }/${ slider.id }` }
            : { url: '/' }

          if (slider.content && slider.content.contents && slider.content.contents.length) {
            sliderData[i].content = textContentBlocksToText(slider.content.contents)
          }

          if (!slider.eyecatch) slider.eyecatch = (await import('~/assets/placeholder-image-icon-7.png')).default
          else sliderData[i].eyecatch = await axiosImageToBase64(slider.eyecatch.url + '?w=2000')

          resolve()
        }))
      )

      data.sliderData = sliderData

    }) // useFetch

    const sliderClickHandler = (slider, sliderIndex) => {
      if (sliderIndex === data.currentSliderIndex) {
        if (slider.route.type === '_blank') window.open(slider.route.url, slider.route.type)
        else router.push(slider.route.url)
      }
      else data.currentSliderIndex = sliderIndex
    }

    const indexArr = computed(() => {
      const numArr = [...Array((data.sliderData || []).length)].map((_, i) => i)
      ;[...Array(data.currentSliderIndex)].forEach(() => numArr.unshift(numArr.pop()))
      return numArr
    })

    const sliderPositionCSS = index => {
      const i = indexArr.value[index]

      const offsetSize = 8

      return `
        left: ${i * offsetSize}px;
        top: ${i * offsetSize}px;
        z-index: ${1000 - i};
        transition-delay: ${i * 0.03}s;
        opacity: ${ data.visible ? 1 - (0.3 * i) : 0 }
      `
    }

    const currentSlider = computed(() => {
      return data.sliderData[data.currentSliderIndex]
    })

    onMounted(() => {
      data.visible = true
      const si = setInterval(() => {
        data.currentSliderIndex = (data.currentSliderIndex + 1) % data.sliderData.length
      }, 7 * 1000)
      onBeforeUnmount(() => {
        data.visible = false
        clearInterval(si)
      })
    })

    return { ...toRefs(data), sliderClickHandler, sliderPositionCSS, currentSlider }
  }
})
</script>

<style lang="sass" scoped>
div
  .slider-root
    position: relative
    // background: orange !important
    background: black !important
    // overflow-x: hidden
    padding-bottom: 16px
    .wrapper
      max-width: 1248px
      .row
        +mediaMax(1000px)
          flex-flow: column
        position: relative
        .slider-images
          aspect-ratio: 5 / 3
          position: relative
          // cols="7"の max-width 削除
          +mediaMax(1000px)
            max-width: initial !important
          a
            display: block
            overflow: hidden
            position: absolute
            height: 100%
            width: 100%
            transition: 0.3s
            &.hidden
              opacity: 0
              transform: translateX(-16%)
            &.active
              opacity: 1
            img
              background-size: cover
              width: 100%
              position: absolute
              left: 50%
              top: 50%
              transform: translate(-50%, -50%)
              // box-shadow: 4px 4px 4px black
              &.is-not-current
                +mediaMax(1000px)
                  display: none
        .texts
          position: relative
          padding: 40px
          // cols="5"の max-width 削除
          +mediaMax(1000px)
            max-width: initial !important
            padding: 24px
          div
            .card
              z-index: 500
              display: flex
              flex-flow: column
              justify-content: center
              align-items: flex-start
              +mediaMax(1000px)
                // min-height: 232px !important
                min-height: 264px!important
                // padding: 0px 0px 16px 0px !important
                // margin-top: -8px
                padding: 0!important
              .subtitle
                color: #8E9095
                +mediaMax(1000px)
                  margin: 0 auto
              .title
                font-family: $font-family !important
                font-size: 24px !important
                font-weight: bold
                +mediaMax(1260px)
                  font-size: 18px !important
                +mediaMax(1000px)
                  font-size: 20px !important
                  margin: 0px auto
                  padding: 8px
                  +mediaMax(400px)
                    font-size: 16px !important
              .text
                font-size: 12px !important
                color: #8E9095
                +mediaMax(1000px)
                  padding: 0px !important
                  padding-bottom: 8px!important
              .actions
                +mediaMax(1000px)
                  margin: 0 auto
          &:after
            z-index: 400
            display: block
            content: ""
            background: #333
            // height: 288px
            height: 288px
            width: 160vw
            position: absolute
            left: 100vw
            transform: translateX(-100%)
            +mediaMax(1000px)
              display: none
          &:before
            z-index: 300
            display: block
            content: ""
            background: $subcolor
            outline: solid 80px $subcolor
            width: 160vw
            position: absolute
            left: 100vw
            bottom: 0px
            transform: translateX(-100%)
            +mediaMax(1000px)
              display: none
      .slider-buttons-wrapper
        position: relative
        z-index: 600
        // background: $subcolor
        margin-top: -72px !important
        +mediaMax(1230px)
          margin-top: -5vw !important
        +mediaMax(1000px)
          align-items: center
          // margin-top: -48px !important
          // padding-top: 0px !important
          padding: 16px!important
        .spacer
          +mediaMax(1000px)
            display: none
        .slider-buttons
          opacity: 0.7
          +mediaMax(1000px)
            display: flex
            justify-content: center
            width: 100%
          button
            display: block
            border-radius: 100%
            $size: 16px
            // width: $size
            // height: $size
            padding: $size / 2
            margin-right: 16px
            background: white
            border: solid 1px dimgray
            +mediaMax(1000px)
              margin-right: 8px
              margin-left: 8px
            &.active
              background: black
              border-color: black
              +mediaMax(1000px)
                border-color: mix(dimgray, gray)
  // hr.background-of-the-buttons
  //     z-index: -500
  //     content: ""
  //     background: $subcolor
  //     display: block
  //     height: 120px
  //     width: 100%
  //     margin-top: -40px
  //     // position: absolute
</style>
