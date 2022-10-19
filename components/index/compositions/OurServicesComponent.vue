<template lang="pug">
div.our-service-root.pt-16
  .wrapper.pb-8
    .services-wrapper.mt-16
      SectionTitleComponent.ma-auto(
        title="Our Services"
        subtitle="事業内容"
      )
    v-row.content-wrapper.justify-center(no-gutters)
      v-col.service-wrapper(
        no-gutters
        v-for="(service, i) in servicesData"
        cols="5"
        :key="i"
      )
        .img-wrapper(@click="$router.push('/services/' + service.title)")
          v-img(
            :src="service.image"
            :aspect-ratio="5 / 4"
          )
        div.texts
          small {{ service.subtitle }}
          h3 {{ service.title }}
          NuxtLink.font-weight-bold.text-decoration-none(
            :to="'/services/' + service.title"
          ): small >> 詳しく見る
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
      servicesData: []
    })

    useFetch(async () => {
      const {
        reqCMS,
        axiosImageToBase64,
        textContentBlocksToText
      } = await import('~/module/index.js')

      const resData = await Promise.all(
        Object.values(process.env.content_ids.ourServices).map(
          (id, i) => new Promise(async (resolve, reject) => {
            return resolve(
              await reqCMS(
                'fixed-contents/' + id,
                {
                  fields: [
                    'id',
                    'title',
                    'subtitle',
                    'image'
                  ].join(',')
                }
              )
            )
          })
        )
      )

      await Promise.all(resData.map(async (service, i) => {
        resData[i].image = await axiosImageToBase64(service.image.url + '?w=1400')
        resData[i].link = '/service/'
          + service
              .subtitle
                .replace(' ', '_')
                .replace('　', '_')
                .replace('・', '_')
                .replace('•', '_')
                .toLowerCase()
      }))

      data.servicesData = resData
    }) // useFetch

    return data
  }
})
</script>

<style lang="sass" scoped>
  .our-service-root
    position: relative
    z-index: 1
    background: $subcolor
    .wrapper
      background: url("~/assets/slash_line.png")
      background-size: 30px
      max-width: 1248px
      margin: auto
      // .services-wrapper
      .content-wrapper
        margin: auto
        padding: 40px
        +mediaMax(1000px)
          flex-flow: column
          align-items: center
        .service-wrapper
          margin: 16px
          +mediaMax(1000px)
            max-width: 600px
          .img-wrapper
            width: 100%
            cursor: pointer
            // transition: 0.3s
            // &:hover
            //   opacity: 0.8
        .texts
          background: white
          color: black
          font-family: $font-family
          text-align: center
          padding: 16px
          small
            font-size: 11px
          h3
            font-size: 26px
    .view-more-button
      a
        background: $subcolor
        &:hover
          background: mix(lightgray, transparent)
</style>
