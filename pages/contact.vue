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
  // mapState,
  // mapGetters,
  // mapMutations,
  // mapActions
} from 'vuex'
import {
  defineComponent,
  // h,
  // ref,
  // toRef,
  // toRefs,
  // reactive,

  // useFetch, // nuxt専用
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
  setup (
    // props,
    // attrs,
    // slots,
    // emit
  ) {
    return {}
  }
})
</script>

<style lang="sass" scoped>
#contact-root
  background: #E6E6E6
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
