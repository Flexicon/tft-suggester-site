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

  head.script.push({
    src: '//gc.zgo.at/count.js',
    'data-goatcounter': 'https://tft-suggester.goatcounter.com/count',
    async: true,
    body: true,
  })

  Vue.use(Buefy)
  Vue.component('Layout', DefaultLayout)
}
