<template lang="pug">
#recruitment-root.pt-16.pb-8
  v-row.justify-center.mb-16(no-gutters)
    SectionTitleComponent(title="Recruitment" subtitle="採用情報")
  v-row.justify-center
    v-card(light).mb-12
      v-card-title 準備中
</template>

<script>
import {
  defineComponent,
} from '@nuxtjs/composition-api'

export default defineComponent({
  head: () => ({
    title: 'Recruitment'
  }),
  setup () {
    return {}
  }
})
</script>

<style lang="sass" scoped>
#recruitment-root
  background: $subcolor
</style>
