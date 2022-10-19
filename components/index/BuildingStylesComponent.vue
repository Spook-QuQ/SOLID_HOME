<template lang="pug">
.building-style-root.pt-16
  .head.mt-16
    small
      span SOLID HOME
      |の
    p.mt-8
      span
      |2つの建築スタイル
  indexBuildingStylesModernComponent.my-16
  indexBuildingStylesCuteComponent.my-16
</template>

<script>
export default {
}
</script>

<style lang="sass" scoped>
  .building-style-root
    background: white
    $padding-size: 40px
    padding-left: $padding-size
    padding-right: $padding-size
    +mediaMax(960px)
      $padding-size: 0px
      padding-left: $padding-size
      padding-right: $padding-size
    .head
      font-family: $font-family
      font-weight: bold
      max-width: 1248px
      margin: auto
      +mediaMax(960px)
        padding: 0px 16px
      small
        font-size: 48px
        color: mix(black, dimgray)
        +mediaMax(616px)
          font-size: 40px
        +mediaMax(510px)
          font-size: 32px
        span
          color: white
          background: black
          padding: 16px 4px
      p
        position: relative
        display: flex
        align-items: center
        font-size: 80px
        color: mix(black, dimgray)
        +mediaMax(1040px)
          font-size: 60px
        +mediaMax(616px)
          font-size: 50px
        +mediaMax(510px)
          font-size: 40px
        span
          display: inline-block
          width: 160px
          height: 7px
          background: #CCCCCC
          margin-right: 40px
          +mediaMax(860px)
            display: none
        // &::after
        //   position: absolute
        //   content: ""
        //   width: 240px
        //   height: 64px
        //   background: mix(dimgray, white)
        //   right: 0px
        //   bottom: 0px
</style>
