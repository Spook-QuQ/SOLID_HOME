<template lang="pug">
.privacy-policy-root
  .wrapper.py-16
    v-card.card(
      light
      outlined
    ).pa-16.mb-16
      v-card-title.d-flex.justify-center.mb-14
        h2 {{ title }}
      v-card-text.text {{ text }}
</template>

<script>
import {
  defineComponent,
  ref,
  toRefs,
  useFetch,
  reactive,
  computed,
  // isReactive
} from '@nuxtjs/composition-api'

export default defineComponent ({
  head: () => ({
    title: '個人情報保護方針'
  }),
  setup () {
    const dataReactive = reactive({
      title: '',
      text: ''
    })

    useFetch(async () => {
      const {
        reqCMS,
        // axiosImageToBase64,
        // textContentBlocksToText
      } = await import('~/module/index.js')

      const { title, content } = await reqCMS('fixed-contents/' + process.env.content_ids.privacyPolicy, {
        // richEditorFormat: 'object',
        fields: [
          // 'id',
          'title',
          // 'createdAt',
          'content',
          // 'eyecatch',
          // 'categories',
        ].join(',')
      })

      dataReactive.title = title
      dataReactive.text = content
    })


  return dataReactive
  }
})
</script>

<style lang="sass" scoped>
  .privacy-policy-root
    background: #E6E6E6
    .wrapper
      // background: white
      max-width: 1248px
      margin: 0 auto
      .card
        // background: white
        .text
          margin: 0 auto
          white-space: break-spaces
          font-size: 16px
          line-height: 24px
          max-width: 900px
          color: mix(black, dimgray)
</style>
