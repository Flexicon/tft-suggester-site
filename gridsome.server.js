const axios = require('axios')

const BASE_API_URL = 'https://tft-suggester-api.nerfthis.xyz'

module.exports = function(api) {
  api.loadSource(async store => {
    const { data } = await axios.get(`${BASE_API_URL}/champions`)

    const collection = store.addCollection({
      typeName: 'Champions',
    })

    for (const { name, image, cost } of data) {
      collection.addNode({ name, image, cost })
    }
  })

  api.loadSource(async store => {
    const { data } = await axios.get(`${BASE_API_URL}/comps`)

    const collection = store.addCollection({
      typeName: 'Comps',
    })

    for (const { name, tier, playstyle, champions } of data) {
      collection.addNode({ name, tier, playstyle, champions })
    }
  })

  api.loadSource(async store => {
    const { data } = await axios.get(`${BASE_API_URL}/items`)

    const collection = store.addCollection({
      typeName: 'Items',
    })

    for (const { name, guid, id, color, loadoutsIcon } of data) {
      collection.addNode({ name, guid, cdragonID: id, color, loadoutsIcon })
    }
  })
}
