<template lang="pug">
footer
  .wrapper
    .avobe
      div.head
        h2 SOLID HOME
        div.sns
          button(
            @click="openLinkBlank('https://twitter.com/solidhome2050')"
          ): img(src="~/assets/sns-icons/twitter.svg")
          button(
            @click="openLinkBlank('https://www.instagram.com/solidhome2050/')"
          ): img(src="~/assets/sns-icons/instagram.svg")
      hr
      div.info-wrapper
        div.info-content
          p
            small TEL
            span.tel 0125-75-2407
          p
            small ADDRESS
            span.address
              |〒079-0463
              |北海道滝川市江部乙町東10丁目13番5号
        div.button-for-contact
          button(@click="$router.push('/contact')")
            h4 Contact Form
            hr
            p 資料請求・お問い合わせはこちらのフォームよりお送りください!!
    .google-map
      iframe(
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6231.452730206632!2d141.93240121664311!3d43.62112336715636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f0c971429595741%3A0x6dcde0b8c5b93239!2z44ix56u55Lit57WE!5e0!3m2!1sja!2sjp!4v1659599002658!5m2!1sja!2sjp"
        width="100%"
        height="600px"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      )
    .bottom
      ul.footer-sitemap
        li(v-for="item in navItems.slice(0, 4)" :key="item.caption")
          NuxtLink(:to="`/${item.link}`") {{ item.caption }}
      ul.footer-sitemap
        li(v-for="item in navItems.slice(4, 8)" :key="item.caption")
          NuxtLink(:to="`/${item.link}`") {{ item.caption }}
  span.copy &copy; {{ new Date().getFullYear() }} SOLID HOME
  NuxtLink#hidden-htmlsitemap(to="/sitemap") .
</template>

<script>
export default {
  data: () => ({
    navItems: [
      {
        // name: 'Top',
        caption: 'トップ',
        link: ''
      },
      {
        // name: 'About Us',
        caption: '事業内容・会社概要',
        link: 'about_us'
      },
      {
        // name: 'News',
        caption: 'お知らせ・ブログ',
        link: 'news'
      },
      {
        // name: 'Works',
        caption: '実績・事例',
        link: 'works'
      },
      {
        // name: 'Recruitment',
        caption: '採用情報',
        link: 'recruitment'
      },
      {
        // name: 'FAQ',
        caption: 'よくある質問',
        link: 'faq'
      },
      {
        // name: 'Contact',
        caption: '問い合わせ・資料請求',
        link: 'contact'
      },
      {
        // name: 'Privacy-policy',
        caption: '個人情報保護方針',
        link: 'privacy-policy'
      },
    ]
  }),
  methods: {
    openLinkBlank (url) {
      if (!window) return
      window.open(url, '_blank');
    }
  }
}
</script>

<style lang="sass" scoped>
footer
  position: relative
  font-family: $font-family
  color: #919191
  background: black
  padding: 40px
  .wrapper
    max-width: 1248px
    margin: auto
    .avobe
      color: white
      margin: (20px + 4px) 0px 60px 0px
      div.head
        display: flex
        justify-content: space-between
        align-items: center
        h2
          font-size: 56px
          +mediaMax(650px)
            font-size: 40px
          +mediaMax(540px)
            font-size: 24px
        div.sns
          display: flex
          justify-content: flex-end
          +sns-button()
          button
            margin-top: 0px
      hr
        height: 8px
        background: white
        opacity: 0.2
        margin-top: 8px
        margin-bottom: 32px
        +mediaMax(806px)
          margin-top: 16px
      div.info-wrapper
        display: flex
        justify-content: space-between
        align-items: center
        flex-wrap: wrap
        +mediaMax(806px)
          flex-flow: column
          align-items: flex-start
        div.info-content
          p
            display: flex
            flex-wrap: wrap
            align-items: center
            +mediaMax(480px)
              flex-flow: column
              align-items: flex-start
            small
              font-size: 16px
              color: #919191
              display: inline-block
              width: 120px
              +mediaMax(480px)
                margin-bottom: 8px
            span.tel
              font-size: 40px
              font-weight: bold
              +mediaMax(480px)
                margin-top: -8px
            span.address
              white-space: break-spaces
              display: inline-block
    .google-map
      width: 100vw
      position: relative
      left: 50%
      transform: translateX(-50%)
    .bottom
      display: flex
      justify-content: center
      flex-wrap: wrap
      position: relative
      +slash_line_background(72px, -40px)
      padding-top: 160px
      +mediaMax(460px)
        justify-content: flex-start
      ul.footer-sitemap
        padding-left: 16px
        font-size: 14px
        li
          list-style-type: "◆"
          padding-left: 8px
          margin-bottom: 24px
          margin-right: 24px
          a
            text-decoration: none
            color: #919191

  span.copy
    display: flex
    justify-content: center
    padding-top: 80px
    padding-bottom: 80px
    font-size: 12px
  div.button-for-contact
    +mediaMax(806px)
      margin-top: 56px
    button
      +h4-button()
  div.to-about-us
    +mediaMax(806px)
    padding-top: 32px
    button
      +h4-button()
  #hidden-htmlsitemap
    position: relative
    left: -200%
    // opacity: 0
</style>
