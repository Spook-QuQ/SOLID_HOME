<template lang="pug">
#sitemap-root
  ul.style-none
    li(v-for="route in data.routes"): NuxtLink(:to="route") {{ route }}
</template>

<script>
import { useFetch, reactive, defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    const data = reactive({
      routes: [
        "/",
        "/services/新築住宅",
        "/services/外構",
        "/services/リフォーム・リノベーション",
        "/services/造作建具・造作家具",
        "/faq",
        "/contact",
        "/news",
        "/about_us",
        "/privacy-policy",
        "/recruitment",
        "/works",
        "/news",
      ],
    });

    useFetch(async () => {
      const { reqCMS } = await import("~/module/index.js");

      const makePostsRoute = async () => {
        const { contents } = await reqCMS("news", {
          filters: [
            "categories[contains]お知らせ",
            "[or]",
            "categories[contains]ブログ",
            "[or]",
            "categories[contains]実績",
            "[or]",
            "categories[contains]事例",
          ].join(""),
          // richEditorFormat: 'object',
          limit: 10000,
          fields: [
            "id",
            // 'title',
            "createdAt",
            // 'content',
            // 'eyecatch',
            "categories",
          ].join(","),
        });

        return contents.map((content) => {
          const category = content.categories[0];
          return (
            (category == "お知らせ" || category == "ブログ"
              ? "/news/"
              : category == "実績" || category == "事例"
              ? "/works/"
              : new Error("couldn't detect the category of post")) + content.id
          );
        });
      };

      const routes = await makePostsRoute();
      data.routes = [...data.routes, ...routes];
    });

    return { data };
  },
});
</script>

<style lang="sass">
#sitemap-root
  ul
    li
      list-style: none
</style>