<template lang="pug">
header
  div.wrapper
    section
      h1: NuxtLink(to="/") SOLID HOME
      nav(:class="{ 'drawer-active': drawerActive }")
        ul
          li(
            v-for="item in navItems"
            @click="drawerActive = false"
          )
            NuxtLink(
              :to="`/${item.link}`"
            )
              h2 {{ item.name }}
              p {{ item.caption }}
      v-btn.drawer-button(
        small
        outlined
        :class="drawerActive ? 'active' : ''"
        @click="drawerActive = !drawerActive"
      ) {{ !drawerActive ? 'MENU' : 'CLOSE' }}
      div.background-for-drawer(
        :class="drawerActive ? 'active' : ''"
        @click="drawerActive = !drawerActive"
      )
    div.sns
      button(
        @click="openLinkBlank('https://twitter.com/solidhome2050')"
      ): img(src="~/assets/sns-icons/twitter.svg")
      button(
        @click="openLinkBlank('https://www.instagram.com/solidhome2050/')"
      ): img(src="~/assets/sns-icons/instagram.svg")
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
        caption: '事業内容・会社概要',
        link: 'about_us'
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
    ],
    drawerActive: false
  }),
  methods: {
    openLinkBlank (url) {
      if (!window) return
      window.open(url, '_blank');
    }
  }
}
</script>

<style scoped lang="sass">
  =hoverAnim ()
    transition: 0.3s
    background: black
    &:hover
      box-shadow: 0px -10px 0px white
      transform: translateY(8px)
      +mediaMax(1250px)
        box-shadow: 10px 4px 0px white
        transform: translateX(-10px)
  header
    +slash_line_background()
    display: block
    height: 240px
    background: black
    padding: 40px
    z-index: 10000
    div.wrapper
      position: relative
      z-index: 3 * 1000
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
          font-family: $font-family
          +mediaMax(1250px)
            padding-left: $padding-x * 2
            padding-right: $padding-x * 2
          +mediaMax(650px)
            font-size: 40px
          +mediaMax(540px)
            font-size: 24px
          +mediaMax(420px)
            font-size: 16px
            padding-left: $padding-x
            padding-right: $padding-x
          a
            color: white
            text-decoration: none
            transition: 0.3s
            &:hover
              color: gray
        nav
          z-index: 100 * 1000
          +mediaMax(1250px)
            position: fixed
            right: 0%
            top: 50%
            transform: translate(100%, -50%)
            transition: 0.3s
            opacity: 0
          &.drawer-active
            transform: translate(0%, -50%)
            opacity: 1
          ul
            display: flex
            padding-left: 0px
            +mediaMax(1250px)
              flex-flow: column
              flex-wrap: wrap
            li
              list-style: none
              border-left: solid 1px white
              +hoverAnim()
              +mediaMax(1250px)
                margin: 8px 0px
                border: solid 1px dimgray
                border-radius: 4px
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
                // cursor: pointer!important
                transition: 0.3s
                &:hover
                  color: gray
                +mediaMax(1250px)
                  height: auto
                  padding: 16px
                h2
                  font-size: 16px
                  +mediaMax(1250px)
                    font-size: 16px
                p
                  font-size: 8px
                  margin-bottom: 0px
                  +mediaMax(1250px)
                    padding-top: 4px
        .drawer-button
          z-index: 100 * 1000
          transition: 0.3s
          margin-right: 40px
          +mediaMin(1250px)
            display: none
          &.active
            margin-right: 120px
            margin-left: -120px
            position: fixed
            top: 74px
            right: 40px
            transform: translateY(11px)
            border-color: dimgray
          +mediaMax(420px)
            font-size: 16px
            font-size: 10px
            margin-right: 16px
        div.background-for-drawer
          z-index: 50 * 1000
          background: transparent
          display: block
          height: 100%
          width: 100%
          position: fixed
          left: 100%
          top: 0
          transition: 0.3s
          &.active
            left: 0%
            background: rgba(black, 0.9)
      div.sns
        display: flex
        justify-content: flex-end
        +sns-button()
</style>
