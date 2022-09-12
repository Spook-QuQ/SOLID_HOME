<template lang="pug">
  #about-us-root(v-if="main")
    //- pre {{ main }}
    v-row.wrapper(no-gutters)
      v-img.d-flex.align-center(
        :src="main.image"
        :aspect-ratio="5/3"
      )
        v-card(
          outlined
        ).head-card
          SectionTitleComponent.section-title(
            title="About Us"
            subtitle="私たちについて"
          )
          v-card-title.title {{ main.title }}
          v-card-text.text {{ main.content }}
    .services-wrapper.py-16
      v-row.wrapper.d-flex(v-if="servicesData.length" no-gutters)
          template(
            v-for="(_, i) in 2"
          )
            v-col.d-flex.flex-column.align-center(
              v-if="servicesData.length"
              cols="12"
              md="6"
            )
              template(
                v-for="(service, _i) in servicesData.slice(i * 2, (i * 2) + 2)"
              )
                //- pre {{ i }} {{ _i }}
                SectionTitleComponent.ma-16(
                  title="Our Service"
                  subtitle="事業内容"
                  v-if="i === 0 && _i === 0"
                )
                v-card(
                  light
                  tile
                  color="transparent"
                  elevation="0"
                )
                  v-img(
                    :src="servicesData[i * 2 + _i].image"
                    :aspect-ratio="4/3"
                    :class="i === 0 ? 'left': 'right'"
                    @click="$router.push('/services/' + service.title)"
                  )
                  .texts
                    small {{ service.subtitle }}
                    h3.mt-0 {{ service.title }}
                    p {{ service.content }}
                    NuxtLink.font-weight-bold.text-decoration-none(
                      :to="'/services/' + service.title"
                    ): small >> 詳しく見る
    v-row.svg-illust-wrapper
      v-img.illust(
        :src="svg_illust"
      )
    v-row(no-gutters)
      companyInfoComponent
  v-row.justify-center(v-else)
    v-progress-circular.ma-16(color="grey darken-2" indeterminate)
</template>

<script>
import svg_illust from '~/assets/about-us-illust.svg'

import {
  // mapState,
  // mapGetters,
  // mapMutations,
  // mapActions
} from 'vuex'
import {
  defineComponent,
  // h,
  ref,
  // toRef,
  toRefs,
  reactive,

  useFetch, // nuxt専用
  // useStatic, // nuxt専用
  // useAsync, // nuxt専用
  // useContext, // nuxt専用
  // wrapProperty, // nuxt専用
  // onGrobalSetup, // nuxt専用
  // reqRef, // nuxt専用
  // reqSsrRef, // nuxt専用
  // ssrRef, // nuxt専用
  // shallowSsrRef, // nuxt専用

  // onBeforeMount,
  // onMounted,
  // onBeforeUpdate,
  // onUpdated,
  // onBeforeUnmount,
  // onUnmounted,
  // onErrorCaptured,
  // onRenderTracked,
  // onRenderTriggered,
  // onActivated,
  // onDeactivated,

  // computed,
  // watch,
  // watchEffect,

  // provide,
  // inject,
  // readonly,

  // isReactive
} from '@nuxtjs/composition-api'

export default defineComponent({
  // props: {}
  head: () => ({
    title: 'About Us'
  }),
  setup (
    // props,
    // attrs,
    // slots,
    // emit
  ) {
    const dataReactive = reactive({
      main: null,
      servicesData: []
    })

    useFetch(async () => {
      const {
        reqCMS,
        axiosImageToBase64,
        // textContentBlocksToText
      } = await import('~/module/index.js')

      const { image, title, content } = await reqCMS('fixed-contents/' + process.env.content_ids.about_us_main_image + '?w=2000')
      const base63 = await axiosImageToBase64(image.url)
      dataReactive.main = { title, content, image: base63 }

      const getServicesData = async () => {

        const data = await Promise.all(
          Object.values(process.env.content_ids.ourServices).map(
            (id, i) => new Promise(async (resolve, reject) => {
              return resolve(
                await reqCMS(
                  'fixed-contents/' + id,
                  {
                    fields: [
                      // 'id',
                      'title',
                      'subtitle',
                      'image',
                      'content'
                    ].join(',')
                  }
                )
              )
            })
          )
        )

        await Promise.all(data.map(async (service, i) => {
          data[i].image = await axiosImageToBase64(service.image.url)
          data[i].link = '/service/' + service
                                        .subtitle
                                          .replace(' ', '_')
                                          .replace('　', '_')
                                          .replace('・', '_')
                                          .replace('•', '_')
                                          .toLowerCase()
        }))

        return data
      }

      dataReactive.servicesData = await getServicesData()
    })
    return { ...toRefs(dataReactive), svg_illust }
  }
})
</script>

<style lang="sass" scoped>
  #about-us-root
    .wrapper
      max-width: 1248px
      margin: auto
      .head-card
        padding: 40px
        // .section-title
        //   margin: 0px 16px
        //   +mediaMax(959px)
        //     margin: auto
        +mediaMin(1030px)
          width: 100% / 3 * 2
          margin: auto
      .v-card
        // padding: 40px
        background: rgba(0, 0, 0, 0.8)
        // +mediaMax(959px)
        display: flex
        justify-content: center
        align-items: center
        flex-flow: column
        .title
          font-weight: bold
          font-size: 56px!important
          line-height: normal
          font-family: $font-family!important
          +mediaMax(660px)
            font-size: 40px!important
          +mediaMax(540px)
            font-size: 36px!important
        .text
          font-size: 16px
          line-height: normal
          +mediaMax(959px)
            text-align: center!important
    .services-wrapper
      width: 100%
      background: $subcolor
      .v-card
        margin: 40px
        display: block!important
        .v-image
          $offsetSize: 24px
          cursor: pointer
          transition: 0.3s
          &:hover
            opacity: 0.8
          &.left
            transform: translateX($offsetSize)
            +mediaMax(959px)
              transform: translateX(0px)
          &.right
            transform: translateX(-$offsetSize)
            +mediaMax(959px)
              transform: translateX(0px)
        .texts
          background: white
          padding: 24px
          padding-top: 68px
          margin-top: -40px
          text-align: center
          small
            font-size: 16px
            // line-height: normal
            font-family: $font-family!important
          h3
            font-size: 32px
            margin-top: 8px
            margin-bottom: 11px
            font-family: $font-family
          p
            font-size: 16px
            text-align: justify
    .svg-illust-wrapper
      background: $subcolor
      padding: 40px
      +mediaMax(640px)
        padding-top: 0px
      .illust
        opacity: 0.7
        max-width: 1248px
        width: 100%
        margin: auto
</style>


<!-- 959 -->
