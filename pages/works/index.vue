<template lang="pug">
.works-root
  PostListComponent(
    title="Works"
    subtitle="実績・事例"
    category="works"
    filters="categories[contains]実績[or]categories[contains]事例"
    isOffText
    :listDisplaySize="9"
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
    title: 'Works'
  }),
  setup () {
    const { title, meta } = useMeta()
    title.value = 'Works'
    onMounted(() => {
      meta.value = makeOgp({
        siteName: process.env.siteTitle,
        pageTitle: 'Works',
        description: process.env.siteDescription,
        isTypeArticle: true,
        pageUrl: `${process.env.hostname}/works`,
        imageUrl: `${process.env.hostname}/${process.env.ogpImage}`,
      })
    })

    return {}
  }
})
</script>

<style lang="sass" scoped>
  // .works-root
</style>
