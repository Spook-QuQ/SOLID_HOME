<template lang="pug">
  div.our-service-root.pt-16
    .wrapper.pb-16
      .services-wrapper.mt-16
        SectionTitleComponent.ma-auto(
          title="Our Services"
          subtitle="事業内容"
        )
      v-row.content-wrapper.justify-center(no-gutters)
        v-col.service-wrapper(
          no-gutters
          v-for="(service, i) in servicesData"
          cols="5"
          :key="i"
        )
          //- div.img(
          //-   :style="`background-image: url(${ service.image })`"
          //- )
            //- img(:src="service.image")
          .img-wrapper
            img(:src="service.image")
          div.texts
            small {{ service.subtitle }}
            h3 {{ service.title }}
      v-row.justify-center.mt-0.view-more-button
        ViewMoreButton(url="/works" text="実績・事例をもっと見る")
</template>

<script>
export default {
  props: ['servicesData']
}
</script>

<style lang="sass" scoped>
  .our-service-root
    position: relative
    z-index: 1
    background: $subcolor
    .wrapper
      background: url("~/assets/slash_line.png")
      background-size: 30px
      max-width: 1248px
      margin: auto
      // .services-wrapper
      .content-wrapper
        margin: auto
        padding: 40px
        +mediaMax(1000px)
          flex-flow: column
          align-items: center
        .service-wrapper
          margin: 16px
          +mediaMax(1000px)
            max-width: 600px
          // .img
          //   width: 100%
          //   aspect-ratio: 4 / 3
          //   // overflow: hidden
          //   background-size: cover
          //   // max-width: 420px
          //   // position: absolute
          //   // position: relative
          //   // img
          //   //   width: 100%
          //   //   position: relative
          //   //   left: 50%
          //   //   top: 50%
          //   //   transform: translate(-50%, -50%)
          .img-wrapper
            width: 100%
            aspect-ratio: 5 / 3
            overflow: hidden
            position: relative
            img
              width: 100%
              position: absolute
              transform: translate(-50%, -50%)
              left: 50%
              top: 50%
        .texts
          background: white
          color: black
          font-family: $font-family
          text-align: center
          padding: 16px
          small
            font-size: 11px
          h3
            font-size: 26px
    .view-more-button
      a
        background: $subcolor
        &:hover
          background: mix(lightgray, transparent)
</style>
