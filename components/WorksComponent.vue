<template lang="pug">
  .news-root.pt-16.pb-8
    v-row.justify-center.mb-16(no-gutters)
      SectionTitleComponent(title="Works" subtitle="実績・事例")
    v-row.wrapper.justify-space-between.pa-3.pb-8(
      v-if="!isOffPaging"
    )
      v-pagination(
        v-model="currentPageIndex"
        :length="pageLength"
        color="rgb(80, 80, 80)"
        light
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
    transition-group(
      tag="v-row"
      mode="out-in"
    ).wrapper.posts-wrapper.pb-5
      v-col(v-if="!displayItems.length" key="progress-circular")
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
        :style="`transition-delay: ${ 0.02 * i }s`"
      )
        v-card(
          light
          :to="'/works/' + post.id"
        )
          //- NuxtLink(:to="'/news/' + post.id")
          v-img(
            :src="post.eyecatch"
            :aspect-ratio="4/3"
          )
            v-app-bar(
              flat
              color="transparent"
            )
              v-spacer
              v-btn(icon color="white"): v-icon mdi-exit-to-app
          //- .image-wrapper
          //-   img(:src="post.eyecatch")
          div.pa-6
            v-card-text
              v-row.d-flex.justify-space-between
                time {{ new Date(post.createdAt).toLocaleString().split(' ')[0] }}
                v-chip(small @click.prevent="searchKeyword = post.categories[0]") {{ post.categories[0] }}
            v-card-title.px-0.pt-3.font-weight-bold {{ post.title }}
            v-card-text.pa-0.pb-2 {{ post.content.slice(0, 64) + '...' }}
    v-row.pb-16.justify-center(
      v-if="!isOffPaging"
    )
      v-pagination(
        v-model="currentPageIndex"
        :length="pageLength"
        color="rgb(80, 80, 80)"
        light
      )
    v-row.justify-center.py-4
      ViewMoreButton(
        v-if="isOffPaging"
        url="/news" text="お知らせ・ブログをもっと見る"
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
  // isReactive
} from '@nuxtjs/composition-api'

export default defineComponent ({
  props: {
    isOffPaging: {
      default: false,
      type: Boolean
    }
  },
  setup (props) {
    const dataReactive = reactive({
      posts: [],
      currentPageIndex: 0,
      listDisplaySize: 6,
      searchKeyword: ''
    })

    useFetch(async () => {
      const {
        reqCMS,
        axiosImageToBase64,
        textContentBlocksToText
      } = await import('~/module/index.js')

      // new Date(currentSlider.createdAt).toLocaleString().split(' ')[0]

      const { contents } = await reqCMS('news', {
        filters: 'categories[contains]実績[or]categories[contains]事例',
        richEditorFormat: 'object',
        fields: [
          'id',
          'title',
          'createdAt',
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
            dataReactive.posts[i].eyecatch = await axiosImageToBase64(post.eyecatch.url + '?w=1000')
            resolve()
          }
        ))
      )

      // dataReactive.posts = [...dataReactive.posts, ...dataReactive.posts].map(post => {
      //   const obj = Object.assign({}, post)
      //   obj.id += '---' + Math.floor(Math.random() * 100)
      //   return obj
      // }) // テスト

    })

    dataReactive.currentPageIndex = 1

    const filteredPosts = computed(() => {
      if (dataReactive.searchKeyword) {
        const regexp = new RegExp(dataReactive.searchKeyword, 'g')
        return (dataReactive.posts || []).filter(post => {
          return regexp.test(post.categories[0] || '')
            || regexp.test(post.content)
            || regexp.test(post.createdAt)
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

    // 元のreactiveの値を変更した際に、toRefsで出したrefの値も変更されている
    // リアクティブ性は子要素（？）まで伝達されている様子
    return { ...toRefs(dataReactive), pageLength, displayItems }
  }
})
</script>

<style lang="sass" scoped>
.news-root
  background: #E6E6E6
  .wrapper
    max-width: 1248px
    margin: auto
    // position: relative
  .posts-wrapper
    // display: block
    position: relative
    .post
      // transition: 0.4s
      +fade-transition()
</style>
