<template lang="pug">
.banner-root.py-16
  v-slide-group(
    show-arrows
    center-active
    light
    ref="sliders"
  )
    v-slide-item(
      v-for="banner in bannerData"
      :key="banner.id"
      v-slot="{ active, toggle }"
    )
      a.banner(
        @click="active ? openUrlWithBlank(banner.link) : toggle()"
      )
        img(:src="banner.image")
</template>


<script>
import {
  defineComponent,
  ref,
  toRefs,
  reactive,
  useFetch,
  onMounted,
  onBeforeUnmount,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const data = reactive({
      bannerData: [],
      sliderLength: 1000,
      currentSliderIndex: ''
    })

    useFetch(async () => {
      const {
        reqCMS,
        axiosImageToBase64
      } = await import('~/module/index.js')

      const resData = await reqCMS('banners', {
        richEditorFormat: 'object' ,
        fields: [
          'id',
          'image',
          'link'
        ].join(',')
      })

      data.bannerData = await Promise.all(
        resData.contents.map(async banner => {
          banner.image = await axiosImageToBase64(banner.image.url)
          return banner
        })
      )


    }) // useFetch

    // DOMをrefしたい場合
    const sliders = ref(null) // null として、変数名をref=""の名前と一致させる

    const nextSlider = () => {
      if (!sliders) return clearInterval(this.si)
      data.currentSliderIndex = (data.currentSliderIndex + 1) % (data.sliderLength - 1)
      sliders.value.$children[data.currentSliderIndex].$el.click()
    }

    onMounted(() => {
      data.sliderLength = sliders.value.$children.length
      const si = setInterval(nextSlider, 7 * 1000)
      onBeforeUnmount(() => clearInterval(si))
    })

    return {
      ...toRefs(data),
      openUrlWithBlank (url) {
        window.open(url, '_blank')
      },
      sliders // ここに含めないとref=""が書かれたDOMを取得できない
    }
  }
})
</script>

<style lang="sass" scoped>
.banner-root
  background: $subcolor
  .v-slide-group
    background: transparent
    a.banner
      width: 380px
      padding: 8px
      +mediaMax(500px)
        width: 240px
      +mediaMax(360px)
        width: 180px
      img
        width: 100%

</style>
