const path = require('path')

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/scss/_globals.scss'),
        path.resolve(__dirname, './src/components/*.vue'),
      ],
    })
}

module.exports = {
  siteName: 'TFT Suggester',
  siteUrl: 'https://tft-suggester.nerfthis.xyz/',
  pathPrefix: '/',
  plugins: [
    { use: '@flexicon/gridsome-source-git-meta' },
    { use: '@flexicon/gridsome-source-build-meta' },
  ],
  transformers: {
    remark: {
      // global remark options
      grayMatter: {
        excerpt: true,
      },
    },
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
  },
}
