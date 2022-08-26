<template lang="pug">
  .faq-root
    pre {{ faqs }}
</template>

<script>
import {
  defineComponent,
  // h,
  ref,
  // toRef,
  // toRefs,
  reactive,

  useFetch, // nuxt専用

  // computed,
} from '@nuxtjs/composition-api'
export default defineComponent({
  // props: {}
  setup (
    // props,
    // attrs,
    // slots,
    // emit
  ) {
    const dataReactive = reactive({
      faqs: []
    })

    useFetch(async () => {
      const {
        reqCMS,
        // axiosImageToBase64,
        // textContentBlocksToText
      } = await import('~/module/index.js')

      const faqs = await reqCMS('fixed-contents/', {
        filters: 'categories[contains]Q&A',
        fields: [
          'title',
          'content'
        ].join(',')
      })

      dataReactive.faqs = faqs
    })

    return dataReactive
  }
})
</script>

<style lang="sass" scoped>
  .faq-root
</style>
