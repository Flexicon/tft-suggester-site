const axios = require('axios')

const BASE_API_URL = 'https://tft-suggester-api.nerfthis.xyz'

module.exports = function(api) {
  // Load Champions
  // ==========================================================================
  api.loadSource(async store => {
    const { data } = await axios.get(`${BASE_API_URL}/champions`)

    const collection = store.addCollection({
      typeName: 'Champions',
    })

    for (const { name, image, cost } of data) {
      collection.addNode({ name, image, cost })
    }
  })

  // Load Comps
  // ==========================================================================
  api.loadSource(async store => {
    const { data } = await axios.get(`${BASE_API_URL}/comps`)

    const collection = store.addCollection({
      typeName: 'Comps',
    })

    for (let { name, tier, playstyle, champions, item_recommendations } of data) {
      const itemsByChamp = item_recommendations.reduce(
        (map, ir) => ({ ...map, [ir.champion]: ir.items }),
        {},
      )
      champions = champions.map(c => ({ ...c, items: itemsByChamp[c.name] || [] }))

      collection.addNode({ name, tier, playstyle, champions })
    }
  })

  // Load Items
  // ==========================================================================
  api.loadSource(async store => {
    const { data } = await axios.get(`${BASE_API_URL}/items`)

    const collection = store.addCollection({
      typeName: 'Items',
    })

    for (const { name, image, components } of data) {
      collection.addNode({ name, image, components })
    }
  })
}
