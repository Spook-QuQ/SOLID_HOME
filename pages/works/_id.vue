<template lang="pug">
#news-page-root
  //- pre {{ article }}
  v-card.pa-8.article(
    light
    elevation="0"
    v-if="article"
  )
    v-row.justify-space-between.mb-4(no-gutters)
      time {{ new Date(article.createdAt).toLocaleString().split(' ')[0] }}
      v-chip(small :to="`/news?keyword=${ article.categories[0] }`") {{ article.categories[0] }}
    v-card-title.pa-0.pb-8: h2 {{ article.title }}
    hr
    div.content.pt-8(v-html="article.content")
  WorksComponent(v-if="article")
  v-row.justify-center(v-else)
    v-progress-circular(color="grey darken-2" indeterminate)
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
  reactive,

  useFetch, // nuxt専用
  // useStatic, // nuxt専用
  // useAsync, // nuxt専用
  useContext, // nuxt専用
  useMeta,
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
  head: {
    title: ''
  },
  setup (
    // props,
    // attrs,
    // slots,
    // emit
  ) {
    const data = reactive({
      article: null
    })
    const context = useContext()
    const { title } = useMeta()

    useFetch(async () => {
      const {
        reqCMS,
        axiosImageToBase64,
        textContentBlocksToText
      } = await import('~/module/index.js')

      data.article = await reqCMS('news/' + context.params.value.id , {
        // filters: 'categories[contains]実績[or]categories[contains]事例',
        // richEditorFormat: 'object',
        fields: [
          'id',
          'title',
          'createdAt',
          'content',
          // 'eyecatch',
          'categories',
        ].join(',')
      })

      // prev, next はうまくいかなかった。
      // const nextArticle = await reqCMS('works/' + context.params.value.id , {
      //   // richEditorFormat: 'object',
      //   limit: 1,
      //   orders: 'createdAt',
      //   // filters: 'categories[contains]お知らせ[or]categories[contains]ブログ[and]createdAt[greater_than]' + data.article.createdAt,
      //   filters: [
      //     'id[not_equals]' + data.article.id,
      //     '[and]',
      //     'categories[contains]お知らせ',
      //     '[and]',
      //     'createdAt[greater_than]' + data.article.createdAt,
      //     '[or]', // ===========================================================
      //     'id[not_equals]' + data.article.id,
      //     '[and]',
      //     'categories[contains]ブログ',
      //     '[and]',
      //     'createdAt[greater_than]' + data.article.createdAt
      //   ].join(''),
      //   fields: [
      //     'id',
      //     'title',
      //     'createdAt',
      //     // 'content',
      //     // 'eyecatch',
      //     // 'categories',
      //   ].join(',')
      // })
      // const prevArticle = await reqCMS('works/' + context.params.value.id , {
      //   // richEditorFormat: 'object',
      //   limit: 1,
      //   orders: '-createdAt',
      //   // filters: 'categories[contains]お知らせ[or]categories[contains]ブログ[and]createdAt[greater_than]' + data.article.createdAt,
      //   filters: [
      //     'id[not_equals]' + data.article.id,
      //     '[and]',
      //     'categories[contains]お知らせ',
      //     '[and]',
      //     'createdAt[less_than]' + data.article.createdAt,
      //     '[or]', // ===========================================================
      //     'id[not_equals]' + data.article.id,
      //     '[and]',
      //     'categories[contains]ブログ',
      //     '[and]',
      //     'createdAt[less_than]' + data.article.createdAt
      //   ].join(''),
      //   fields: [
      //     'id',
      //     'title',
      //     'createdAt',
      //     // 'content',
      //     // 'eyecatch',
      //     // 'categories',
      //   ].join(',')
      // })

      const regexp = /src="(.*?)"/g
      const matches = []

      let match

      while(match = regexp.exec(data.article.content)) {
        const [src, link] = match
        matches.push({ src, link })
      }

      const imgData = await Promise.all(matches.map(img => new Promise(async (resolve, reject) => {
        resolve({
          link: img.link,
          data: await axiosImageToBase64(img.link)
        })
      })))

      const replacedContent = imgData.reduce((v, img) => {
        return v.replace(img.link, img.data)
      }, data.article.content)

      data.article.content = replacedContent

      // head の title
      title.value = data.article.title

    })

    return data
  }
})
</script>

<style lang="sass" scoped>
#news-page-root
  padding: 40px
  background: #E6E6E6
  .article
    max-width: 1248px
    margin: 24px auto
    // .content
    //   p
        // margin-bottom: 0px!important
</style>
