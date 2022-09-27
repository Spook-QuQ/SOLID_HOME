<template lang="pug">
#recruitment-root.pt-16.pb-8
  v-row.justify-center.mb-16(no-gutters)
    SectionTitleComponent(title="Recruitment" subtitle="採用情報")
  v-row.justify-center(v-if="article")
    v-card(light).mb-12
      //- v-card-title {{ article && article.content }}
      v-card-text.text {{ article && article.content }}
  v-row.justify-center(v-else)
    v-progress-circular.ma-16(color="grey darken-2" indeterminate)
</template>

<script>
import {
  defineComponent,
  useFetch,
  reactive,
} from '@nuxtjs/composition-api'

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

    return data
  }
})
</script>

<style lang="sass" scoped>
#recruitment-root
  background: $subcolor
  .text
    max-width: 1248px
    color: black
    font-size: 16px
    padding: 24px
    white-space: pre-wrap
</style>
