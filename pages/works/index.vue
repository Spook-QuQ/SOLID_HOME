<template lang="pug">
  .news-root
    PostListComponent(
      title="Works"
      subtitle="実績・事例"
      category="works"
      filters="categories[contains]実績[or]categories[contains]事例"
    )
</template>

<script>
import {
  defineComponent
} from '@nuxtjs/composition-api'

export default defineComponent({
  head: () => ({
    title: 'Works'
  }),
  setup () {
    return {}
  }
})
</script>

<style lang="sass" scoped>
  // .news-root
</style>
