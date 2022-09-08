<template lang="pug">
#service-page-root
  .wrapper(v-if="content")
    v-card.service(light flat tile)
      //- pre {{ service }}
      v-img.texts-wrapper(
        v-if="mainImage"
        :src="mainImage"
        :aspect-ratio="4/3"
      )
        .texts
          v-card-text.pb-0: small {{ subtitle }}
          v-card-title.pt-0 {{ title }}
      v-card-text {{ content }}
      hr
      v-card-text.content(v-html="service_page_content")
  v-row.justify-center(v-else)
    v-progress-circular.ma-16(color="grey darken-2" indeterminate)
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
  // toRefs,
  reactive,

  useFetch, // nuxt専用
  // useStatic, // nuxt専用
  // useAsync, // nuxt専用
  useContext, // nuxt専用
  useMeta, // nuxt専用
  // useRoute,
  // wrapProperty, // nuxt専用
  // onGrobalSetup, // nuxt専用
  // reqRef, // nuxt専用
  // reqSsrRef, // nuxt専用
  // ssrRef, // nuxt専用
  // shallowSsrRef, // nuxt専用

  onBeforeMount,
  onMounted,
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
  head: () => ({
    title: ''
  }),
  setup (
    // props,
    // attrs,
    // slots,
    // emit
  ) {
    const data = reactive({
      // service: null
      title: null,
      subtitle: null,
      content: null,
      mainImage: null,
      service_page_content: null
    })
    const { title } = useMeta()
    const context = useContext()

    useFetch(async () => {
      const {
        reqCMS,
        axiosImageToBase64,
        // textContentBlocksToText
      } = await import('~/module/index.js')

      const { contents: [ service ] } = await reqCMS('fixed-contents' , {
        filters: 'title[equals]' + context.params.value.title,
        // richEditorFormat: 'object',
        fields: [
          'title',
          'subtitle',
          'image',
          'content',
          'service_page_content'
        ].join(',')
      })

      // console.log(service);

      // data.service = service

      data.mainImage = await axiosImageToBase64(service.image.url)

      // 本文の画像をbase64へ
      const imgToBase64inTextContent = async () => {
        const regexp = /src="(.*?)"/g
        const matches = []

        let match

        while(match = regexp.exec(service.service_page_content)) {
          const [src, link] = match
          matches.push({ src, link })
        }

        const imgData = await Promise.all(matches.map(img => new Promise(async (resolve, reject) => {
          resolve({
            link: img.link,
            data: await axiosImageToBase64(img.link)
          })
        })))

        const replacedContent = imgData.reduce((v, img) => {
          return v.replace(img.link, img.data)
        }, service.service_page_content)

        return replacedContent
      }

      data.service_page_content = await imgToBase64inTextContent()

      // data.service = service
      data.title = service.title
      data.subtitle = service.subtitle
      data.content = service.content
    })

    onBeforeMount(() => {
      title.value = context.params.value.title
    })

    return data
  }
})
</script>

<style lang="sass">
#service-page-root
  background: $subcolor
  .wrapper
    max-width: 1248px
    margin: auto
    .texts-wrapper
      padding: 40px
      .texts
        display: inline-flex
        flex-flow: column
        text-align: center
        align-items: center
        background: rgba(0, 0, 0, 0.8)
        color: white
        font-family: $font-family
    .service
      .content
        padding: 56px 16px
        p
          color: black
          font-size: 1rem
          line-height: 1.5rem
          +mediaMax(1000px)
            img
              width: 100%
        h1, h2, h3, h4, h5, h6
          display: inline
          line-height: 40px
          border-left: solid 4px mix(lightgray, white)
          padding-left: 16px
          color: mix(black, dimgray)
        h1
          position: relative
          z-index: 1
          background: linear-gradient(transparent 50%, rgba(black, 0.05) 0)
          // &::before
          //   content: ''
          //   display: block
          //   width: 100%
          //   height: 16px
          //   background: mix(mix(lightgray, white), transparent)
          //   position: absolute
          //   bottom: -40%
          //   z-index: -1
</style>
