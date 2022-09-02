<template lang="pug">
  .cute-style-root
    v-row.wrapper.flex-column.flex-md-row-reverse.flex-lg-row-reverse.flex-xl-row-reverse(
      no-gutters
    )
      v-col(
        xs="12"
        sm="12"
        md="4"
        no-gutters
      )
        h3.title Cute Style
        .image-wrapper
          //- img(
          //-   :src="images[0]"
          //- )
          v-img(
            :src="images[0]"
            :aspect-ratio="4 / 3"
          )
        .image-wrapper
          //- img(
          //-   :src="images[1]"
          //- )
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
          //- img(
          //-   :src="images[2]"
          //- )
          v-img(
            :src="images[2]"
            :aspect-ratio="4 / 3"
          )
        p.text {{ text }}
    v-row.justify-center.py-6
      ViewMoreButton(url="/works?keyword=キュート" text="Cute Styleを詳しく見る")
</template>

<script>
// import module from '~/module/index.js'
import axios from 'axios'
import {
  defineComponent,
  ref,
  useFetch,
  reactive,
  // isReactive
} from '@nuxtjs/composition-api'

// export default {
//   props: ['modernStyleData']
// }

export default defineComponent({
  // props: {
  //   modernStyleData: {
  //     default: () => {}
  //   }
  // },
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

      const ids = process.env.content_ids.buildingStyles.cute

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

    // console.log(isReactive(dataReactive.images))

    return dataReactive
  }
})
</script>

<style lang="sass" scoped>
  .cute-style-root
    color: mix(black, dimgray)
    $margin-size: 16px
    margin-bottom: 12px!important
    .wrapper
      // +mediaMax(800px)
      //   flex-flow: column
      background: mix(mix(pink, white), white)
      h3.title
        color: mix(gray, black)
        font-weight: bolder
        font-size: 60px!important
        font-family: cursive!important
        margin: $margin-size
        padding-bottom: 24px
        border-bottom: solid 1px mix(dimgray, black)
        // なんでも良い、設定されている値を消したい
        line-height: 1
      .image-wrapper
        // aspect-ratio: 4 / 3
        // overflow: hidden
        margin: $margin-size
        // position: relative
        // img
        //   width: 100%
        //   position: absolute
        //   transform: translate(-50%, -50%)
        //   top: 50%
        //   left: 50%
      p.text
        padding: $margin-size
            line-height: 24px
</style>
