<template lang="pug">
  .list-root.pt-16.pb-8
    v-row.justify-center.mb-16(no-gutters)
      SectionTitleComponent(:title="title" :subtitle="subtitle")
    v-row.wrapper.controlls.justify-space-between.pa-3.pb-8(
      v-if="!isOffPaging"
    )
      v-pagination.pagination(
        v-model="currentPageIndex"
        :length="pageLength"
        color="rgb(80, 80, 80)"
        light
        ref="firstPagination"
      )
      v-spacer
      v-text-field(
        filled dense rounded light
        placeholder="キーワード （ 例：リフォーム ）"
        prepend-inner-icon="mdi-magnify"
        cols="5"
        hide-details
        v-model="searchKeyword"
        clearable
        @click:clear="searchKeyword = ''"
        clear-icon="mdi-close-circle"
      )
    .wrapper.row.posts-wrapper.pb-5
      v-col(
        v-if="!posts.length" key="progress-circular"
      )
        v-row.justify-center
          v-progress-circular(color="grey darken-2" indeterminate)
      v-col.post(
        v-for="(post, i) in displayItems"
        lg="4"
        xl="4"
        md="4"
        sm="6"
        cols="12"
        :key="post.id"
      )
        //- :style="`transition-delay: ${ 0.02 * i }s`"
        v-card(
          light
          :to="`/${ category }/${ post.id }`"
        )
          v-img(
            :src="post.eyecatch"
            :aspect-ratio="imageAspectRatio"
          )
            v-row.pa-2(no-gutters)
              v-spacer
              v-btn(icon color="white"): v-icon mdi-exit-to-app
          div.pa-6(v-if="!isOffText")
            v-card-text
              v-row.d-flex.justify-space-between
                time {{ new Date(post.publishedAt).toLocaleString().split(' ')[0] }}
                v-chip(small @click.prevent="searchKeyword = post.categories[0]") {{ post.categories[0] }}
            v-card-title.px-0.pt-3.font-weight-bold {{ post.title }}
            v-card-text.pa-0.pb-2 {{ post.content.slice(0, 64) + '...' }}
    //- v-row.pb-16.justify-center(
    //-   v-if="!isOffPaging"
    //- )
    //-   v-pagination(
    //-     v-model="currentPageIndex"
    //-     :length="pageLength"
    //-     color="rgb(80, 80, 80)"
    //-     light
    //-   )
    v-row.justify-center.py-4
      ViewMoreButton(
        v-if="isOffPaging"
        :url="`/${ category }`"
        :text="subtitle + 'をもっと見る'"
      )
</template>

<script>
import {
  defineComponent,
  ref,
  toRefs,
  useFetch,
  reactive,
  computed,
  useRoute
} from '@nuxtjs/composition-api'

export default defineComponent ({
  props: {
    isOffPaging: {
      default: false,
      type: Boolean
    },
    isOffText: {
      default: false,
      type: Boolean
    },
    imageAspectRatio: {
      default: 4 / 3,
      type: Number
    },
    title: {
      default: 'タイトル',
      type: String
    },
    subtitle: {
      default: 'サブタイトル',
      type: String
    },
    category: {
      default: 'category',
      type: String
    },
    listDisplaySize: {
      default: 6,
      type: Number
    },
    filters: {
      default: '',
      type: String
    }
  },
  setup (props) {
    const dataReactive = reactive({
      posts: [],
      currentPageIndex: 0,
      listDisplaySize: props.listDisplaySize,
      searchKeyword: ''
    })

    // const firstPagination = ref(null)

    const route = useRoute()
    if (route.value.query.keyword) dataReactive.searchKeyword = route.value.query.keyword

    useFetch(async () => {
      const {
        reqCMS,
        axiosImageToBase64,
        textContentBlocksToText
      } = await import('~/module/index.js')

      const { contents } = await reqCMS('news', {
        filters: props.filters,
        richEditorFormat: 'object',
        limit: 1000,
        fields: [
          'id',
          'title',
          'publishedAt',
          'content',
          'eyecatch',
          'categories',
        ].join(',')
      })

      dataReactive.posts = contents.map(post => {
        post.content = textContentBlocksToText(post.content.contents)
        return post
      })

      await Promise.all(dataReactive.posts.map(
        (post, i) => new Promise(
          async resolve => {
            if (!post.eyecatch) post.eyecatch = (await import('~/assets/placeholder-image-icon-7.png')).default
            else dataReactive.posts[i].eyecatch = await axiosImageToBase64(post.eyecatch.url + '?w=700')
            resolve()
          }
        ))
      )

    }) // useFetch

    dataReactive.currentPageIndex = 1

    const filteredPosts = computed(() => {
      if (dataReactive.searchKeyword) {
        const regexp = new RegExp(dataReactive.searchKeyword, 'g')
        return (dataReactive.posts || []).filter(post => {
          return regexp.test(post.categories[0] || '')
            || regexp.test(post.content)
            || regexp.test(post.publishedAt)
            || regexp.test(post.title)
        })
      } else return (dataReactive.posts || [])
    })

    const pageLength = computed(() => {
      return Math.ceil(filteredPosts.value.length / dataReactive.listDisplaySize)
    })

    const displayItems = computed(() => {
      const sliceStartPosition = dataReactive.listDisplaySize * (dataReactive.currentPageIndex - 1)
      return (filteredPosts.value || []).slice(sliceStartPosition, sliceStartPosition + dataReactive.listDisplaySize)
    })

    // const jumpToFirstPagination = () => {
    //   console.log(firstPagination)
    // }

    // 元のreactiveの値を変更した際に、toRefsで出したrefの値も変更されている
    // リアクティブ性は子要素（？）まで伝達されている？
    return { ...toRefs(dataReactive), pageLength, displayItems /* , firstPagination, jumpToFirstPagination */ }
  }
})
</script>

<style lang="sass" scoped>
.list-root
  background: $subcolor
  .wrapper
    max-width: 1248px
    margin: auto
    &.controlls
      +mediaMax(760px)
        flex-direction: column-reverse
        .spacer
          display: none
        .pagination
          margin-top: 24px!important
  .posts-wrapper
    position: relative
    // .post
      // +fade-transition()
</style>
