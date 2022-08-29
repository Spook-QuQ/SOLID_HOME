<!-- 検索に入力する時なぜかめちゃくちゃ重い -->

<template lang="pug">
#item-list-root
  v-row(
    no-gutters
    v-if="!isOffPaging"
  )
    v-pagination(
      v-model="currentPageIndex"
      :length="paginationSize"
      color="rgb(80, 80, 80)"
      light
    )
    v-spacer
    v-text-field(
      filled dense rounded light
      :placeholder="searchboxPlaceholder"
      prepend-inner-icon="mdi-magnify"
      cols="5"
      hide-details
      v-model="searchKeyword"
      clearable
      @click:clear="searchKeyword = ''"
      clear-icon="mdi-close-circle"
    )
  transition-group(
    name='list-complete'
    mode="out-in"
  )
    v-col.item.list-complete-item(
      no-gutters
      lg="4"
      xl="4"
      md="4"
      sm="6"
      cols="12"
      :style="`transition-delay: ${ 0.02 * i }s`"
      v-for='(item, i) in filteredItems'
      :key='item.id'
    )
      v-card(
        light
        :to="`/${ postPathPrefix }/${ item.id }`"
      )
        v-img(
          :src="item.eyecatch"
          :aspect-ratio="4/3"
        )
          v-app-bar(
            flat
            color="transparent"
          )
            v-spacer
            v-btn(icon color="white"): v-icon mdi-exit-to-app
        div.pa-6
          v-card-text
            v-row.d-flex.justify-space-between
              time {{ new Date(item.createdAt).toLocaleString().split(' ')[0] }}
              v-chip(small @click.prevent="searchKeyword = item.categories[0]") {{ item.categories[0] }}
          v-card-title.px-0.pt-3.font-weight-bold {{ item.title }}
          v-card-text.pa-0.pb-2 {{ item.content.slice(0, 64) + '...' }}
  v-row.justify-center(
    no-gutters
    v-if="!isOffPaging"
  )
    pre {{ filteredItems }}
    v-pagination(
      v-model="currentPageIndex"
      :length="paginationSize"
      color="rgb(80, 80, 80)"
      light
    )
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
  ref,
  // toRef,
  toRefs,
  reactive,

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

  computed,
  // watch,
  // watchEffect,

  // provide,
  // inject,
  // readonly,

  // isReactive
} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    isOffPaging: {
      default: false,
      type: Boolean
    },
    items: {
      default: () => []
    },
    perPage: {
      default: 6,
    },
    searchboxPlaceholder: {
      default: '検索キーワード'
    },
    postPathPrefix: {
      default: '/'
    },
    transitionTime: {
      default: 'all 0.3s ease'
    }
  },
  setup (
    props,
    // attrs,
    // slots,
    // emit
  ) {
    const data = reactive({
      items: props.items,
      // perPage: props.perPage,
      currentPageIndex: 0 + 1,
      searchKeyword: '',
      // postPathPrefix: props.postPathPrefix,
      transitionTime: props.transitionTime,
      isOffPaging: props.isOffPaging
    })

    const paginationSize = computed(() => Math.ceil(data.items.length / props.perPage || 0))

    const searchboxPlaceholder = ref(props.searchboxPlaceholder)

    const matchKeyword = (keyword, item) => {
      if (!keyword) return true
      const regexp = new RegExp(keyword, 'g')
      return regexp.test(item.categories[0] || '')
        || regexp.test(item.content)
        || regexp.test(item.createdAt)
        || regexp.test(item.title)
    }

    const itemFilter = () => {
      return data.items.filter(item => matchKeyword(data.searchKeyword, item))
    }

    const filteredItems = computed(itemFilter)

    // const itemFilter = () => {
    //   if (data.searchKeyword) {
        // const regexp = new RegExp(data.searchKeyword, 'g')
    //     return (data.items || []).filter(item => {
    //       return regexp.test(item.categories[0] || '')
    //         || regexp.test(item.content)
    //         || regexp.test(item.createdAt)
    //         || regexp.test(item.title)
    //     })
    //   } else return (data.items || [])
    // }

    // const filteredItems = computed(itemFilter)

    // console.log(filteredItems)

    return {
      ...toRefs(data),
      searchboxPlaceholder,
      paginationSize,
      filteredItems,
      // matchKeyword,
    }
  }
})
</script>

<style lang="sass" scoped>
#item-list-root
  .item
    width: 100%
    .v-card
      width: 100%
  .list-complete-item
    display: inline-flex
    // margin-right: 10px

  .list-complete-enter, .list-complete-leave-to
    opacity: 0
    transform: translateY(30px)

  .list-complete-leave-active
    position: absolute
</style>
