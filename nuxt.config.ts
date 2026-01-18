// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/mdc',
    // '@nuxthub/core', // TEMPORARY DISABLE - causing useUpload error
    'nuxt-auth-utils',
    'nuxt-charts'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  mdc: {
    headings: {
      anchorLinks: false
    },
    highlight: {
      // noApiRoute: true
      shikiEngine: 'javascript'
    }
  },

  experimental: {
    viewTransition: true
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    experimental: {
      openAPI: true
    }
  },

  // SQLite disabled for Vercel
  hub: {
    // db: 'sqlite',   // DISABLED - Vercel not support SQLite
    // blob: true      // DISABLED
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
