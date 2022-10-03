<template lang="pug">
#contact-root
  .wrapper.py-16
    v-row.justify-center(no-gutters)
      SectionTitleComponent(title="Contact" subtitle="お問い合わせ・資料請求")
    v-row(no-gutters)
      v-col.text-center.tell-wrapper.my-16(no-gutters)
        small お電話でのお問い合わせはこちら
        p.pt-2.mb-0
          span TEL
          a(href="tel:0125752407") 0125-75-2407
    hr
    v-row
      v-col.text-center.tell-wrapper.my-16.pt-8(no-gutters)
        small フォームでのご相談・お問い合わせはこちら
        div.form-wrapper.mt-4
          iframe(
            src="https://docs.google.com/forms/d/e/1FAIpQLSfK_mtvZQLWBB9sM87E1UJ-aL7I7wyGScYDad0dmu-WL30oLA/viewform?embedded=true"
            width="100%"
            height="1760"
            frameborder="0" marginheight="0" marginwidth="0"
          ) 読み込んでいます…
</template>

<script>
import {
  defineComponent,
  useMeta,
  onMounted
} from '@nuxtjs/composition-api'

import makeOgp from '~/module/makeOgp.js'

export default defineComponent({
  head: () => ({
    title: 'Contact'
  }),
  setup () {
    const { title, meta } = useMeta()
    title.value = 'Contact'

    onMounted(() => {
      meta.value = makeOgp({
        siteName: process.env.siteTitle,
        pageTitle: 'Contact',
        description: process.env.siteDescription,
        isTypeArticle: true,
        pageUrl: `${process.env.hostname}/contact`,
        imageUrl: `${process.env.hostname}/${process.env.ogpImage}`,
      })
    })
    return {}
  }
})
</script>

<style lang="sass" scoped>
#contact-root
  background: $subcolor
  .wrapper
    max-width: 1248px
    margin: auto
    .tell-wrapper
      color: mix(black, dimgray)
      font-weight: bold
      small
        font-size: 16px
      p
        font-family: $font-family
        font-size: 40px
        span
          font-size: 16px
          margin-right: 4px
        a
          text-decoration: none
</style>
