<template lang="pug">
#works-page-root
  //- pre {{ article }}
  v-card.pa-8.article(
    light
    elevation="0"
    v-if="article"
  )
    v-row.justify-space-between.mb-4(no-gutters)
      time {{ new Date(article.createdAt).toLocaleString().split(' ')[0] }}
      v-chip(small :to="`/news?keyword=${ article.categories[0] }`") {{ article.categories[0] }}
    v-card-title.pa-0.pb-8: h2 {{ article.title }}
    hr
    div.content.pt-8(v-html="article.content")
    small 画像をクリックで拡大表示できます。
    v-row.images-wrapper(no-gutters)
      v-col.image-wrapper(
        v-for="(iamge, i) in article.images"
        no-gutters
        lg="4"
        xl="4"
        md="4"
        sm="6"
        cols="12"
      )
        v-img.image(
          :src="iamge.base64"
          @click="imageIndex = i"
          :aspect-ratio="1"
          contain
        )
        //- pre {{ article.images }}
  .image-modal(
    v-if="article && typeof imageIndex == 'number'"
    :class="imageIndex ? 'active' : ''"
  )
    v-img.image(
      :src="article.images[imageIndex].base64"
      contain
    )
      v-row.justify-space-between.pa-4.btns(no-gutters)
        v-btn(
          light
          fab
          small
          color="rgba(255, 255, 255, 0.8)"
          @click="0 < imageIndex ? imageIndex -= 1 : ''"
          :disabled="0 == imageIndex"
        ): v-icon mdi-chevron-left
        v-btn(
          light
          fab
          small
          color="rgba(255, 255, 255, 0.8)"
          @click="imageIndex < article.images.length - 1 ? imageIndex += 1 : ''"
          :disabled="article.images.length - 1 == imageIndex"
        ): v-icon mdi-chevron-right
    v-row.text.justify-space-between.align-center(no-gutters)
      v-col(
        md="11"
        sm="10"
        cols="9"
      )
        p.ma-0 {{ article.images[imageIndex].alt }}
      v-btn.pa-2(
        fab
        light
        color="rgba(255, 255, 255, 0.5)"
        elevation="4"
        @click="imageIndex = null"
      ) 閉じる
    //- v-row.justify-center.ma-4(no-gutters)
    //-   v-btn(
    //-     light
    //-     color="rgba(255, 255, 255, 0.5)"
    //-     elevation="4"
    //-     @click="imageIndex = null"
    //-     small
    //-   ) 閉じる
    //-   //- v-icon(small) mdi-window-close

  PostListComponent(
    v-if="article"
    title="Works"
    subtitle="実績・事例"
    category="works"
    filters="categories[contains]実績[or]categories[contains]事例"
  )
  v-row.justify-center(v-else)
    v-progress-circular(color="grey darken-2" indeterminate)
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
  useMeta,
  // wrapProperty, // nuxt専用
  // onGrobalSetup, // nuxt専用
  // reqRef, // nuxt専用
  // reqSsrRef, // nuxt専用
  // ssrRef, // nuxt専用
  // shallowSsrRef, // nuxt専用

  onBeforeMount,
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
      article: null,
      imageIndex: null
    })

    const context = useContext()
    const { title } = useMeta()

    useFetch(async () => {
      const {
        reqCMS,
        axiosImageToBase64,
        textContentBlocksToText
      } = await import('~/module/index.js')

      const article = await reqCMS('news/' + context.params.value.id , {
        // filters: 'categories[contains]実績[or]categories[contains]事例',
        richEditorFormat: 'object',
        fields: [
          'id',
          'title',
          'createdAt',
          'content',
          // 'eyecatch',
          'categories',
        ].join(',')
      })

      const textBlocksData = article.content && article.content.contents

      if (textBlocksData) {
        const textBlocks = textBlocksData.filter(block => block.type == 'textBlock')
        const imageBlocks = textBlocksData.filter(block => block.type == 'image')

        const jointedTexts = textBlocks.reduce((_textArr, _block) => {
          return _block.value.reduce((textArr, block) => {
            textArr.push(block.value)
            return textArr
          }, _textArr)
        }, [])

        while(jointedTexts.slice(-1) == '\n') jointedTexts.pop()

        // const replacedImagesAsBase64 = await Promise.all(
        //   imageBlocks.map(block => async () => {
        //     const { attributes: { alt } , value } = block
        //     return {
        //       alt,
        //       base64: await axiosImageToBase64(img.link)
        //     }
        //   })
        // )

        const replacedImagesAsBase64 = await Promise.all(
          imageBlocks.map(block => new Promise(async resolve => {
            const { attributes: { alt } , value } = block
            resolve({
              alt,
              base64: await axiosImageToBase64(value + '?w=1600')
            })
          }))
        )

        article.content = `<p>${ jointedTexts.join('') }</p>`
        article.images = replacedImagesAsBase64

        data.article = article
      }

      // head の title
      title.value = data.article.title

    }) // useFetch

    onBeforeMount(() => {
      if (data.article && data.article.title) title.value = data.article.title
    })

    return data
  }
})
</script>

<style lang="sass">
#works-page-root
  padding: 40px
  background: $subcolor
  .article
    max-width: 1248px
    margin: 24px auto
    .content
      p
        // margin-bottom: 0px!important
        white-space: pre-wrap
    .images-wrapper
      padding: 16px 0px
      margin: -4px
      .image-wrapper
        padding: 4px
        .image
          background: mix(white, mix(transparent, gray))
          transition: 0.2s
          &:hover
            transform: scale(0.95)
  .image-modal
    background: rgba(black, 0.8)
    // display: flex
    // flex-flow: column
    // justify-content: center
    // align-items: center
    position: fixed
    top: 0
    left: 0
    // top: -50%
    // left: -50%
    // transform: translate(50%, 50%)
    width: 100%
    height: 100%
    z-index: 1000000
    // +mediaMax(1248px)
    //   display: flex
    //   flex-flow: column
    //   justify-content: space-between
    .image
      width: 100%
      // height: 80vh
      max-width: 1000px
      margin: auto
      background: rgba(white, 0.7)
      aspect-ratio: 3 / 2
      .btns
        display: flex
        align-items: center
        width: 100%
        height: 100%
    .text
      width: 100%
      max-width: 1000px
      margin: auto
      padding-top: 16px
      text-align: justify
      +mediaMax(1248px)
        padding: 16px
</style>
