import colors from 'vuetify/es5/util/colors'

// copied from module.index then changed the env which is original here
import axios from 'axios'
const _reqCMS = async (route, params) => {
  const { data } = await axios.get(process.env.microCMS_url + route, {
    headers: { 'X-MICROCMS-API-KEY': process.env.microCMS_api_key },
    params
  })
  return data
}

const makePostsRote = async () => {

  const { contents } = await _reqCMS('news', {
    filters: [
      'categories[contains]お知らせ',
      '[or]',
      'categories[contains]ブログ',
      '[or]',
      'categories[contains]実績',
      '[or]',
      'categories[contains]事例'
    ].join(''),
    // richEditorFormat: 'object',
    fields: [
      'id',
      // 'title',
      'createdAt',
      // 'content',
      // 'eyecatch',
      'categories',
    ].join(',')
  })
  return contents.map(content => {
    const category = content.categories[0]
    return {
      url:
        (category == 'お知らせ' || category == 'ブログ' ? '/news/' :
        category == '実績' || category == '事例' ? '/works/' : new Error("couldn't detect the category of post"))
        + content.id
      ,
      lastmod: content.createdAt
    }
  })
}

export default {
  env: {
    microCMS: {
      api_key: process.env.microCMS_api_key,
      url: process.env.microCMS_url
    },
    content_ids: {
      about_us_main_image: process.env.about_us_main,
      ourServices: {
        1: process.env.our_services_id_01,
        2: process.env.our_services_id_03,
        3: process.env.our_services_id_02,
        4: process.env.our_services_id_04
      },
      company_info: process.env.company_info,
      buildingStyles: {
        modern: {
          images: {
            1: process.env.modern_image_01,
            2: process.env.modern_image_02,
            3: process.env.modern_image_03,
            4: process.env.modern_image_04
          },
          text: process.env.modern_text
        },
        cute: {
          images: {
            1: process.env.cute_image_01,
            2: process.env.cute_image_02,
            3: process.env.cute_image_03,
            4: process.env.cute_image_04
          },
          text: process.env.cute_text
        }
      },
      privacyPolicy: process.env.privacy_policy,
      recruit: process.env.recruit
    }
  },
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - SOLID_HOME',
    title: 'SOLID_HOME',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon_io/favicon-32x32.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@mdi/font/css/materialdesignicons.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/composition-api/module',
    '@nuxtjs/vuetify',
    '@nuxtjs/sitemap',
    ['@nuxtjs/google-fonts',
      {
        families: { Roboto: true },
        display: 'block',
        download: true,
        inject: true
      }
    ],
    '@nuxtjs/google-analytics'
  ],

  sitemap: {
    hostname: 'https://solidhome2050.com',
    // hostname: 'http://localhost:3000',
    exclude: [
      '/test'
    ],
    routes: async () => makePostsRote()
  },

  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID,
  },

  publicRuntimeConfig: { // ブラウザで常に使えるようにしておくため
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.sass'],
    // defaultAssets: { // いらんかった
    //   {
    //     // font: {
    //     //   family: 'Roboto'
    //     // },
    //     icons: 'mdi'
    //   }
    // },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    },

  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  generate: {
    interval: 100
  },

  router: {
    base: '/SOLID_HOME/'
  }
}
