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
  onMounted,
  useMeta
} from '@nuxtjs/composition-api'

import makeOgp from '~/module/makeOgp.js'

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
      const { reqCMS } = await import('~/module/index.js')

      const { title, content } = await reqCMS('fixed-contents/' + process.env.content_ids.privacyPolicy, {
        fields: [
          'title',
          'content',
        ].join(',')
      })

      dataReactive.title = title
      dataReactive.text = content
    })


    const { title, meta } = useMeta()
    title.value = '個人情報保護方針'

    onMounted(() => {
      meta.value = makeOgp({
        siteName: process.env.siteTitle,
        pageTitle: '個人情報保護方針',
        description: process.env.siteDescription,
        isTypeArticle: true,
        pageUrl: `${process.env.hostname}/privacy-policy`,
        imageUrl: `${process.env.hostname}/${process.env.ogpImage}`,
      })
    })


  return dataReactive
  }
})
</script>

<style lang="sass" scoped>
  .privacy-policy-root
    background: $subcolor
    .wrapper
      max-width: 1248px
      margin: 0 auto
      .card
        .text
          margin: 0 auto
          white-space: break-spaces
          font-size: 16px
          line-height: 24px
          max-width: 900px
          color: mix(black, dimgray)
</style>
