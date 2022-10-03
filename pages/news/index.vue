<template lang="pug">
.news-root
  PostListComponent(
    title="News"
    subtitle="お知らせ・ブログ"
    category="news"
    filters="categories[contains]お知らせ[or]categories[contains]ブログ"
  )
</template>

<script>
import {
  defineComponent,
  onMounted,
  useMeta
} from '@nuxtjs/composition-api'

import makeOgp from '~/module/makeOgp.js'

export default defineComponent({
  head: () => ({
    title: 'News'
  }),
  setup () {
    const { title, meta } = useMeta()
    title.value = 'News'

    onMounted(() => {
      meta.value = makeOgp({
        siteName: process.env.siteTitle,
        pageTitle: 'News',
        description: process.env.siteDescription,
        isTypeArticle: true,
        pageUrl: `${process.env.hostname}/news`,
        imageUrl: `${process.env.hostname}/${process.env.ogpImage}`,
      })
    })
    return {}
  }
})
</script>

<style lang="sass" scoped>
  // .news-root
</style>
