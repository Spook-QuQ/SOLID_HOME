<template lang="pug">
#news-page-root
  v-card.pa-8.article(
    light
    elevation="0"
    v-if="article"
  )
    v-row.justify-space-between.mb-4(no-gutters)
      time {{ new Date(article.publishedAt).toLocaleString().split(' ')[0] }}
      v-chip(small :to="`/news?keyword=${ article.categories[0] }`") {{ article.categories[0] }}
    v-card-title.pa-0.pb-8: h2 {{ article.title }}
    hr
    div.content.pt-8(v-html="article.content")
  PostListComponent(
    title="News"
    subtitle="お知らせ・ブログ"
    category="news"
    filters="categories[contains]お知らせ[or]categories[contains]ブログ"
    v-if="article"
    :listDisplaySize="9"
  )
  v-row.justify-center(v-else)
    v-progress-circular(color="grey darken-2" indeterminate)
</template>

<script>
import {
  defineComponent,
  reactive,

  useFetch,
  useContext,
  useMeta,
  onBeforeMount,
} from '@nuxtjs/composition-api'

export default defineComponent({
  head: () => ({
    title: ''
  }),
  setup () {
    const data = reactive({
      article: null
    })
    const { title } = useMeta()

    const context = useContext()
    useFetch(async () => {
      const {
        reqCMS,
        axiosImageToBase64,
        textContentBlocksToText
      } = await import('~/module/index.js')

      data.article = await reqCMS('news/' + context.params.value.id , {
        fields: [
          'id',
          'title',
          'publishedAt',
          'content',
          // 'eyecatch',
          'categories',
        ].join(',')
      })

      const regexp = /src="(.*?)"/g
      const matches = []

      let match

      while(match = regexp.exec(data.article.content)) {
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
      }, data.article.content)

      data.article.content = replacedContent

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
#news-page-root
  padding: 40px
  background: $subcolor
  +mediaMax(1000px)
    padding: 0px
  .article
    max-width: 1248px
    margin: 24px auto
    +mediaMax(600px)
      margin: 0px
      padding: 16px!important
    .content
      p
        +mediaMax(1000px)
          img
            width: 100%
</style>
