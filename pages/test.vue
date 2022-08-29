<template lang="pug">
  .test-root
    #list-complete-demo.demo
      //- button(@click='shuffle') Shuffle
      //- button(@click='add') Add
      //- button(@click='remove') Remove
      transition-group(name='list-complete' tag='div')
        span.list-complete-item(v-for='item in items' :key='item')
          v-col: v-card
            v-card-title text
            v-card-text {{ item }}
    //- ItemListComponent(
    //-   :items="posts"
    //-   perPage="2"
    //-   postPathPrefix="news"
    //- )
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
  // props: {},
  setup (
    // props,
    // attrs,
    // slots,
    // emit
  ) {
    const dataReactive = reactive({
      posts: [],
      // currentPageIndex: 0,
      // listDisplaySize: 6,
      // searchKeyword: ''
    })

    useFetch(async () => {
      const {
        reqCMS,
        axiosImageToBase64,
        textContentBlocksToText
      } = await import('~/module/index.js')

      // new Date(currentSlider.createdAt).toLocaleString().split(' ')[0]

      const { contents } = await reqCMS('news', {
        filters: 'categories[contains]お知らせ[or]categories[contains]ブログ',
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
            dataReactive.posts[i].eyecatch = await axiosImageToBase64(post.eyecatch.url)
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

    return { ...toRefs(dataReactive)}
  }
})

// export default {
//   data() {
//     return {
//       items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
//       nextNum: 10
//     }
//   },
//   methods: {
//     randomIndex() {
//       return Math.floor(Math.random() * this.items.length)
//     },
//     add() {
//       this.items.splice(this.randomIndex(), 0, this.nextNum++)
//     },
//     remove() {
//       this.items.splice(this.randomIndex(), 1)
//     },
//     // shuffle() {
//     //   this.items = _.shuffle(this.items)
//     // }
//   }
// }
</script>

<style lang="sass" scoped>
.test-root
  background: white
.list-complete-item
  transition: all 0.8s ease
  display: inline-flex
  margin-right: 10px

.list-complete-enter, .list-complete-leave-to
  opacity: 0
  transform: translateY(30px)

.list-complete-leave-active
  position: absolute
</style>
