<template lang="pug">
  .works-root
    PostListComponent(
      title="Works"
      subtitle="実績・事例"
      category="works"
      filters="categories[contains]実績[or]categories[contains]事例"
      isOffText
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
  // .works-root
</style>
