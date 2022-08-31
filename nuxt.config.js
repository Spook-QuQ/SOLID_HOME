import colors from 'vuetify/es5/util/colors'

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
        2: process.env.our_services_id_02,
        3: process.env.our_services_id_03,
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
      privacyPolicy: process.env.privacy_policy

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
    ['@nuxtjs/google-fonts',
      {
        families: { Roboto: true },
        display: 'block',
        download: true,
        inject: true
      }
    ]
  ],

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
  }
}
