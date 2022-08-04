<template lang="pug">
header
  div.wrapper
    section
      h1: a SOLID HOME
      nav
        ul
          li(v-for="item in navItems")
            NuxtLink(:to="`/${item.link}`")
              h2 {{ item.name }}
              p {{ item.caption }}
    div.sns
      button: img(src="~/assets/sns-icons/twitter.svg")
      button: img(src="~/assets/sns-icons/instagram.svg")
</template>

<script>
export default {
  data: () => ({
    navItems: [
      {
        name: 'Top',
        caption: 'トップ',
        link: ''
      },
      {
        name: 'About Us',
        caption: '会社概要・事業内容',
        link: 'about-us'
      },
      {
        name: 'News',
        caption: 'お知らせ・ブログ',
        link: 'news'
      },
      {
        name: 'Works',
        caption: '実績・事例',
        link: 'works'
      },
      {
        name: 'Recruitment',
        caption: '採用情報',
        link: 'recruitment'
      },
      {
        name: 'FAQ',
        caption: 'よくある質問',
        link: 'faq'
      },
      {
        name: 'Contact',
        caption: '問い合わせ・資料請求',
        link: 'contact'
      },
    ]
  })
}
</script>

<style scoped lang="sass">
  =hoverAnim ()
    transition: 0.3s
    background: black
    &:hover
      box-shadow: 0px -10px 0px white
      transform: translateY(10px)
  // =hoverAnimOfSNSButtons ()
  //   transition: 0.3s
  //   border-radius: 100%
  //   &:hover
  //     box-shadow: 0px 4px 0px dimgray
  //     transform: translate(-4px, -4px)
  header
    +slash_line_background()
    display: block
    // display: flex
    // flex-flow: column
    // align-items: center
    height: 240px
    background: black
    padding: 40px
    div.wrapper
      position: relative
      z-index: 3
      margin: auto
      max-width: 1248px
      section
        display: flex
        align-items: center
        justify-content: space-between
        border-bottom: 8px solid white
        flex-wrap: wrap
        background: black
        h1
          display: flex
          align-items: center
          height: 96px
          font-size: 56px
          $padding-x: 16px
          padding-left: $padding-x
          padding-right: $padding-x
          // $margin-y: -4px
          // margin-top: $margin-y
          // margin-top: $margin-y
          font-family: $font-family
          +hoverAnim()
          a
            color: white
        nav
          ul
            display: flex
            padding-left: 0px
            li
              list-style: none
              border-left: solid 1px white
              +hoverAnim()
              a
                display: flex
                flex-flow: column
                justify-content: center
                height: 96px
                $padding-x: 16px
                padding-left: $padding-x
                padding-right: $padding-x
                color: white
                text-align: center
                text-decoration: none
                font-family: $font-family
                h2
                  font-size: 16px
                p
                  font-size: 8px
                  margin-bottom: 0px
      div.sns
        display: flex
        justify-content: flex-end
        button
          border-radius: 100%
          overflow: hidden
          max-width: 40px
          max-height: 40px
          // max-width: 39px
          // border-radius: 100%
          // overflow: hidden
          // display: flex
          // align-items: center
          // border: solid 1px white
          $margin-size: 16px
          margin-left: $margin-size
          margin-top: $margin-size
          &:hover
            outline: 4px solid dimgray
            transition: 0.1s
          img
            width: 100%
            // background: white


</style>
