// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  appId: 'app-data',
  modules: ['@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],
  ssr: true,
  app: {
    rootAttrs: {
      class: 'app-wrapper',
      id: 'app',
    },
    buildAssetsDir: '/assets/',
    teleportAttrs: {
      id: 'teleport',
      class: 'teleport-wrapper',
    },
  },
  // use it is if SPA (ssr: false & SSG)
  // hooks: {
  //   "prerender:routes"({ routes }) {
  //     routes.clear();
  //   },
  // },
  css: ['~/app/assets/styles/tailwind.css'],
  spaLoadingTemplate: 'spa-loader.html',
  pinia: {
    storesDirs: ['./stores/pinia/*'],
  },
});
