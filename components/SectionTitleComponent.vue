<template lang="pug">
div.section-title-root
  h2 {{ title }}
  small {{ subtitle }}
</template>

<script>
export default {
  props: ['title', 'subtitle']
}
</script>

<style lang="sass" scoped>
  .section-title-root
    background: $section-title-background-color
    display: block
    font-family: $font-family
    padding: 16px 16px
    text-align: center
    // max-width: 320px
    width: 320px
    +mediaMax(416px)
      width: 100%
    h2
      font-size: 32px
    small
      font-size: 16px
</style>
