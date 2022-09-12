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
} from '@nuxtjs/composition-api'

export default defineComponent({
  head: () => ({
    title: 'News'
  }),
  setup () {
    return {}
  }
})
</script>

<style lang="sass" scoped>
  // .news-root
</style>
