<template lang="pug">
div
  //- indexMainSliderComponent(:sliderData="sliderData")
  //- indexBannerSliderComponent(:bannerData="bannerData")
  //- indexWorksComponent(:worksData="worksData")
  //- indexOurServicesComponent(:servicesData="servicesData")
  //- indexBuildingStylesComponent
  NewsComponent
  //-
  //- indexBuildingStyleComponent(:buildingStyleData="")
  //- v-container.root.pa-0(fluid)
  //-   v-row(justify='center' align='center')
  //-     v-col(cols='12' sm='8' md='6')
        //- v-card.logo.py-4.d-flex.justify-center
        //-   NuxtLogo
        //-   VuetifyLogo
        //- v-card
        //-   v-card-title.headline
        //-     | Welcome to the Vuetify + Nuxt.js template
        //-   v-card-text
        //-     p
        //-       | Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications.
        //-     p
        //-       | For more information on Vuetify, check out the
        //-       a(href='https://vuetifyjs.com' target='_blank' rel='noopener noreferrer')
        //-         | documentation
        //-       | .
        //-     p
        //-       | If you have questions, please join the official
        //-       a(href='https://chat.vuetifyjs.com/' target='_blank' rel='noopener noreferrer' title='chat')
        //-         | discord
        //-       | .
        //-     p
        //-       | Find a bug? Report it on the github
        //-       a(href='https://github.com/vuetifyjs/vuetify/issues' target='_blank' rel='noopener noreferrer' title='contribute')
        //-         | issue board
        //-       | .
        //-     p
        //-       | Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.
        //-     .text-xs-right
        //-       em
        //-         small &mdash; John Leider
        //-     hr.my-3
        //-     a(href='https://nuxtjs.org/' target='_blank' rel='noopener noreferrer')
        //-       | Nuxt Documentation
        //-     br
        //-     a(href='https://github.com/nuxt/nuxt.js' target='_blank' rel='noopener noreferrer')
        //-       | Nuxt GitHub
        //-   v-card-actions
        //-     v-spacer
        //-       v-btn(color='primary' nuxt='' to='/inspire')
        //-         | Continue
</template>

<script>
import axios from 'axios'

// import module from '~/module/index.js'

export default {
  name: 'IndexPage',
  // scrollBehavior (to) {
  //   console.log(to);
  //   return {
  //     x: 0,
  //     y: 0,
  //     behavior: 'smooth'
  //   }
  // },
  async asyncData () {

    const {
      reqCMS,
      axiosImageToBase64,
      textContentBlocksToText
    } = await import('~/module/index.js')

    // const reqCMS = async (route, params) => {
    //   const { data } = await axios.get(process.env.microCMS.url + route, {
    //     headers: { 'X-MICROCMS-API-KEY': process.env.microCMS.api_key },
    //     params
    //   })
    //   return data
    // }

    const getSliderData = async () => {
      const params = {
        filters: 'isSlider[equals]true',
        richEditorFormat: 'object' ,
        fields: [
          'id',
          'title',
          'createdAt',
          'content',
          'eyecatch',
          'categories',
          'linkForSlider'
        ].join(',')
      }
      const data = await reqCMS('news', params)

      const { contents: sliderData } = typeof data === 'object' ? data : {}

      // 画像を取得してbase64にしている
      await Promise.all(
        sliderData.map((slider, i) => new Promise(async (resolve, reject) => {
          sliderData[i].eyecatch = await axiosImageToBase64(slider.eyecatch.url)
          resolve()
        }))
      )

      // richEditorFormatをobjectにしてaxios.getしているので
      // スライダー用に全ての文字を繋げてあげなければいけない
      await Promise.all(
        sliderData.map((slider, i) => new Promise(async (resolve, reject) => {
          if (slider.content?.contents?.length) {
            sliderData[i].content = textContentBlocksToText(slider.content.contents)
            resolve()
          }
        }))
      )

      return sliderData
    }

    const getBannerData = async () => {
      const { data } = await axios.get(process.env.microCMS.url + 'banners', {
        headers: { 'X-MICROCMS-API-KEY': process.env.microCMS.api_key },
        params: {
          // filters: 'isSlider[equals]true',
          richEditorFormat: 'object' ,
          fields: [
            'id',
            'image',
            'link'
          ].join(',')
        }
      })

      const bannerData = await Promise.all(
        data.contents.map(async banner => {
          banner.image = await axiosImageToBase64(banner.image.url)
          return banner
        })
      )

      return bannerData
    }

    const getWorksData = async () => {
      const { data } = await axios.get(process.env.microCMS.url + 'news', {
        headers: { 'X-MICROCMS-API-KEY': process.env.microCMS.api_key },
        params: {
          filters: 'categories[contains]実績[or]categories[contains]事例',
          richEditorFormat: 'object' ,
          fields: [
            'id',
            'title',
            'createdAt',
            'content',
            'eyecatch',
            'categories'
          ].join(',')
        }
      })
      // data.contents.forEach(content => console.log(content.categories))

      const worksData = await Promise.all(
        data.contents.map((works, i) => new Promise(async (resolve, reject) => {
          if (works.content?.contents?.length) {
            works.content = textContentBlocksToText(works.content.contents)
            resolve(works)
          }
        }))
      )

      await Promise.all(worksData.map((work, i) => new Promise(async (resolve, reject) => {
        worksData[i].eyecatch = await axiosImageToBase64(work.eyecatch.url)
        resolve()
      })))

      return worksData
    }

    const getServicesData = async () => {
      const parms = {
        filters: 'categories[contains]実績[or]categories[contains]事例',
        richEditorFormat: 'object' ,
        fields: [
          'id',
          'title',
          'createdAt',
          'content',
          'eyecatch',
          'categories'
        ].join(',')
      }

      const data = await Promise.all(
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

      await Promise.all(data.map(async (service, i) => {
        data[i].image = await axiosImageToBase64(service.image.url)
      }))

      return data
    }

    return {
      // sliderData: await getSliderData(),
      // sliderData: [],
      // bannerData: await getBannerData(),
      // bannerData: [],
      // worksData: await getWorksData(),
      // worksData: [],
      // servicesData: await getServicesData()
      // servicesData: []
    }

  },
  methods: {
  },
  // mounted () {
  //   console.log(this.sliderData);
  // }
}
</script>

<style lang="sass" scoped>
  .root
    background: white
    width: 100%
</style>
