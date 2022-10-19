<template lang="pug">
NuxtLink.view-more-button-root(:to="url")
  p.mb-2: v-btn(icon): v-icon mdi-dots-horizontal
  p.mb-0: small {{ text }}
</template>

<script>
export default {
  props: ['url', 'text']
}
</script>

<style lang="sass" scoped>
  .view-more-button-root
    display: inline-block
    text-align: center
    padding: 4px
    font-weight: bold
    text-decoration: none
    .v-btn
      background: mix(lightgray, black)
      span
        text-decoration: none
    p
      small
        // text-decoration: underline
        color: blue
    &:hover
      background: rgba(black, 0.1)
</style>
