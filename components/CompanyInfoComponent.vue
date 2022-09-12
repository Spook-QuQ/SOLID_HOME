<template lang="pug">
v-col#company-info-wrapper.pt-0(cols="12" no-gutters)
  v-row.justify-center.ma-16.header-wrapper(no-gutters)
    SectionTitleComponent(title="Company Info" subtitle="会社概要")
  v-row(no-gutters)
    p.info-wrapper(
      v-if="comapnyInfo"
      v-html="comapnyInfo.content"
    )
</template>

<script>
import {
  defineComponent,
  reactive,
  useFetch
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const data = reactive({
      comapnyInfo: null
    })

    useFetch(async () => {
      const { reqCMS } = await import('~/module/index.js')
      data.comapnyInfo = await reqCMS('fixed-contents/' + process.env.content_ids.company_info)
    })

    return data
  }
})
</script>

<style lang="sass">
#company-info-wrapper
  .header-wrapper
    $mx: 16px
    margin-left: $mx!important
    margin-right: $mx!important
    +mediaMax(416px)
      margin-left: 0px!important
      margin-right: 0px!important
  .info-wrapper
    max-width: 1248px
    margin: 0 auto
    padding-bottom: 64px
    $px: 8px
    padding-left: $px
    padding-right: $px
    table
      white-space: break-spaces
      tbody
        tr
          vertical-align: text-bottom
          th
            text-align: left!important
            padding-bottom: 8px
          td
            padding-left: 24px
</style>
