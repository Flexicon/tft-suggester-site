// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios')

module.exports = function(api) {
  api.loadSource(async actions => {
    const { data } = await axios.get('https://tft-suggester.herokuapp.com/champions')

    const collection = actions.addCollection({
      typeName: 'Champions',
    })

    for (const item of data) {
      collection.addNode({
        name: item.name,
        image: item.image,
      })
    }
  })

  api.loadSource(async actions => {
    const { data } = await axios.get('https://tft-suggester.herokuapp.com/comps')

    const collection = actions.addCollection({
      typeName: 'Comps',
    })

    for (const item of data) {
      collection.addNode({
        name: item.name,
        tier: item.tier,
        champions: item.champions,
      })
    }
  })
}
