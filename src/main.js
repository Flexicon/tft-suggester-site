// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Buefy from 'buefy'

import DefaultLayout from '~/layouts/Default.vue'
import '~/assets/scss/styles.scss'

export default function(Vue, { router, head, isClient }) {
  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css',
  })

  Vue.use(Buefy)
  Vue.component('Layout', DefaultLayout)
}
