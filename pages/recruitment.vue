<template lang="pug">
#recruitment-root.pt-16.pb-8
  v-row.justify-center.mb-16(no-gutters)
    SectionTitleComponent(title="Recruitment" subtitle="採用情報")
  v-row.justify-center
    v-card(light).mb-12
      v-card-title 準備中
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
  // props: {},
  head: () => ({
    title: 'Recruitment'
  }),
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
#recruitment-root
  background: #E6E6E6
</style>
