<template lang="pug">
div
  indexCompositionsMainSliderComponent
  indexCompositionsBannerSliderComponent
  indexCompositionsWorksSliderComponent
  indexCompositionsOurServicesComponent
  indexBuildingStylesComponent
  PostListComponent(
    title="News"
    subtitle="お知らせ・ブログ"
    category="news"
    filters="categories[contains]お知らせ[or]categories[contains]ブログ"
    isOffPaging
  )
</template>

<script>
import axios from 'axios'

export default {
  name: 'IndexPage',
  head: () => ({
    title: 'Top'
  })
}
</script>

<style lang="sass" scoped>
  .root
    background: white
    width: 100%
</style>
