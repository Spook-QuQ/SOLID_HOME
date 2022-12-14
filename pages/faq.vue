<template lang="pug">
.faq-root.pt-16
  .wrapper
    SectionTitleComponent.mb-16(title="FAQ" subtitle="よくある質問")
    transition(appear)
      v-expansion-panels.expantion-panels.pt-0(
        light
        focusable
        :accordion="false"
        v-if="faqs.length"
      )
        v-expansion-panel(
          v-for="(faq, i) in faqs"
          no-gutters
          :key="i"
        )
          v-expansion-panel-header.title
            span
              span.head Q.
              |{{ faq.title }}
          v-expansion-panel-content
            p.text
              span
                span.head A.
                |{{ faq.content }}
      v-row.justify-center(v-else)
        v-progress-circular.ma-16(color="grey darken-2" indeterminate)
</template>

<script>
import {
  defineComponent,
  ref,
  reactive,
  useFetch,
  useMeta,
  onMounted
} from '@nuxtjs/composition-api'

import makeOgp from '~/module/makeOgp.js'

export default defineComponent({
  head: () => ({
    title: 'FAQ'
  }),
  setup () {
    const dataReactive = reactive({
      faqs: [],
    })

    useFetch(async () => {
      const { reqCMS } = await import('~/module/index.js')

      const { contents: faqs } = await reqCMS('fixed-contents/', {
        filters: 'categories[contains]Q&A',
        fields: [
          'title',
          'content'
        ].join(',')
      })

      dataReactive.faqs = faqs
    }) // useFetch

    const { title, meta } = useMeta()
    title.value = 'FAQ'

    onMounted(() => {
      meta.value = makeOgp({
        siteName: process.env.siteTitle,
        pageTitle: 'FAQ',
        description: process.env.siteDescription,
        isTypeArticle: true,
        pageUrl: `${process.env.hostname}/faq`,
        imageUrl: `${process.env.hostname}/${process.env.ogpImage}`,
      })
    })

    return dataReactive
  }
})
</script>

<style lang="sass" scoped>
  .faq-root
    background: $subcolor
    .wrapper
      max-width: 1248px
      margin: auto
      display: flex
      justify-content: center
      flex-flow: column
      align-items: center
      .expantion-panels
        +fade-transition()
        padding: 40px
        padding-bottom: 80px
        +mediaMax(460px)
          padding: 0px
      .head
        font-size: 24px
        margin-right: 8px
        opacity: 0.3
        font-weight: bold
      .title
        font-size: 24px
        font-weight: bold
        color: mix(black, dimgray)
        padding: 24px
      .text
        font-size: 16px
        color: mix(black, dimgray)
        padding: 24px 0px
        padding-bottom: 16px
        margin: 0px
        line-height: 28px
</style>
