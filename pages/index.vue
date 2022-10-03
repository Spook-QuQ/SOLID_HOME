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
  import {
  defineComponent,
  // ref,
  // reactive,
  // useFetch,
  useMeta,
  onMounted
} from '@nuxtjs/composition-api'
import axios from 'axios'

import makeOgp from '~/module/makeOgp.js'

export default defineComponent({
  name: 'IndexPage',
  head: () => ({
    title: 'Top'
  }),
  setup () {
    const { title, meta } = useMeta()
    title.value = 'Top'

    onMounted(() => {
      meta.value = makeOgp({
        siteName: process.env.siteTitle,
        pageTitle: 'Top',
        description: process.env.siteDescription,
        isTypeArticle: true,
        pageUrl: `${process.env.hostname}`,
        imageUrl: `${process.env.hostname}/${process.env.ogpImage}`,
      })
    })
  }
})
</script>

<style lang="sass" scoped>
  .root
    background: white
    width: 100%
</style>
