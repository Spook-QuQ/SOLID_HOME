<template lang="pug">
#recruitment-root.pt-16.pb-8
  v-row.justify-center.mb-16(no-gutters)
    SectionTitleComponent(title="Recruitment" subtitle="採用情報")
  v-row.justify-center(v-if="article")
    v-card(light).mb-12
      //- v-card-title {{ article && article.content }}
      //- v-card-text.text {{ article && article.content }}
      v-card-text.text(v-html="article && article.content")
  v-row.justify-center(v-else)
    v-progress-circular.ma-16(color="grey darken-2" indeterminate)
</template>

<script>
import {
  defineComponent,
  useFetch,
  reactive,
  onMounted,
  useMeta
} from '@nuxtjs/composition-api'

import makeOgp from '~/module/makeOgp.js'

export default defineComponent({
  head: () => ({
    title: 'Recruitment'
  }),
  setup () {
    const data = reactive({
      article: null
    })

    useFetch(async () => {
      const {
        reqCMS,
        axiosImageToBase64,
        textContentBlocksToText
      } = await import('~/module/index.js')

      data.article = await reqCMS('fixed-contents/' + process.env.content_ids.recruit , {
        fields: [
          // 'id',
          // 'title',
          // 'publishedAt',
          'content',
          // 'eyecatch',
          // 'categories',
        ].join(',')
      })
    })

    const { title, meta } = useMeta()
    title.value = '採用情報'

    onMounted(() => {
      meta.value = makeOgp({
        siteName: process.env.siteTitle,
        pageTitle: '採用情報',
        description: process.env.siteDescription,
        isTypeArticle: true,
        pageUrl: `${process.env.hostname}/recruitment`,
        imageUrl: `${process.env.hostname}/${process.env.ogpImage}`,
      })
    })

    return data
  }
})
</script>

<style lang="sass">
#recruitment-root
  background: $subcolor
  .text
    max-width: 1248px
    color: black
    // font-size: 16px
    padding: 24px
    // white-space: pre-wrap
    hr
      $margin-y-size: 40px
      margin-top: $margin-y-size
      margin-bottom: $margin-y-size
      margin-left: -24px
      margin-right: -24px
    h3
      margin-bottom: 16px
      // display: inline-block
      &.job-title
        border-left: solid 8px lightgray
        padding-left: 8px
    h4
      margin-top: 40px
      margin-bottom: 16px
    p
      margin-bottom: 8px
</style>
