<template lang="pug">
  .modern-style-root
    v-row.wrapper.flex-column.flex-md-row.flex-lg-row.flex-xl-row(no-gutters)
      v-col(
        xs="12"
        sm="12"
        md="4"
        no-gutters
      )
        h3.title Modern Style
        .image-wrapper
          v-img(
            :src="images[0]"
            :aspect-ratio="4 / 3"
          )
        .image-wrapper
          v-img(
            :src="images[1]"
            :aspect-ratio="4 / 3"
          )
      v-col(
        xs="12"
        sm="12"
        md="8"
      )
        .image-wrapper
          v-img(
            :src="images[2]"
            :aspect-ratio="4 / 3"
          )
        p.text {{ text }}
    v-row.justify-center.py-6
      ViewMoreButton(url="/works?keyword=モダン" text="Modern Styleを詳しく見る")
</template>

<script>
import axios from 'axios'
import {
  defineComponent,
  ref,
  useFetch,
  reactive
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup (props) {
    const dataReactive = reactive({
      images: [],
      text: null
    })

    useFetch(async () => {
      const {
        reqCMS,
        axiosImageToBase64,
        textContentBlocksToText
      } = await import('~/module/index.js')

      const ids = process.env.content_ids.buildingStyles.modern

      const imagesData = await Promise.all(Object.values(ids.images).map(async image_id => {
        const { image } = await reqCMS('fixed-contents/' + image_id, { fields: 'image' })
        return image
      })).then(async imageLinks => {
        return await Promise.all(imageLinks.map(async ({ url })=> {
          return await axiosImageToBase64(url + '?w=1600')
        }))
      })
      dataReactive.images = imagesData

      const { content } = await reqCMS('fixed-contents/' + ids.text, { fields: 'content' })
      dataReactive.text = content
    })

    return dataReactive
  }
})
</script>

<style lang="sass" scoped>
  .modern-style-root
    color: mix(black, dimgray)
    $margin-size: 16px
    .wrapper
      background: mix(mix(white, lightgray), white)
      h3.title
        color: mix(gray, black)
        font-weight: bolder
        font-size: 60px!important
        margin: $margin-size
        padding-bottom: 24px
        border-bottom: solid 1px mix(dimgray, black)
        // なんでも良い、設定されている値を消したい
        line-height: 1
      .image-wrapper
        margin: $margin-size
      p.text
        padding: $margin-size
            line-height: 24px
</style>
