<template lang="pug">
.test-root
  #list-complete-demo.demo
    transition-group(name='list-complete' tag='div')
      span.list-complete-item(v-for='item in items' :key='item')
        v-col: v-card
          v-card-title text
          v-card-text {{ item }}
</template>

<script>
import {
  defineComponent,
  toRefs,
  reactive,
  useFetch
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const dataReactive = reactive({
      posts: []
    })

    useFetch(async () => {
      const {
        reqCMS,
        axiosImageToBase64,
        textContentBlocksToText
      } = await import('~/module/index.js')

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

    }) // useFetch

    return { ...toRefs(dataReactive)}
  }
})
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
