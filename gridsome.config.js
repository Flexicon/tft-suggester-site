const path = require('path')

const commitHash = require('child_process')
  .execSync('git rev-parse HEAD')
  .toString()
  .trim()

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
    {
      use: 'gridsome-plugin-sentry',
      options: {
        dsn: 'https://d9ac2f93bb4f42c185d0c650f0522db5@o1098058.ingest.sentry.io/4505387223941120',
        release: 'tft-suggester@' + commitHash,
        logErrors: process.env.NODE_ENV === 'development',
        environment: process.env.NODE_ENV,
        tracesSampleRate: 0.25,
      },
    },
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
