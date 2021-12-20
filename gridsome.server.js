const axios = require('axios')

module.exports = function(api) {
  api.loadSource(async store => {
    const { data } = await axios.get('https://tft-suggester.herokuapp.com/champions')

    const collection = store.addCollection({
      typeName: 'Champions',
    })

    for (const { name, image, cost } of data) {
      collection.addNode({ name, image, cost })
    }
  })

  api.loadSource(async store => {
    const { data } = await axios.get('https://tft-suggester.herokuapp.com/comps')

    const collection = store.addCollection({
      typeName: 'Comps',
    })

    for (const { name, tier, playstyle, champions } of data) {
      collection.addNode({ name, tier, playstyle, champions })
    }
  })

  api.loadSource(async store => {
    const { data } = await axios.get('https://tft-suggester.herokuapp.com/items')

    const collection = store.addCollection({
      typeName: 'Items',
    })

    for (const { name, guid, id, color, loadoutsIcon } of data) {
      collection.addNode({ name, guid, cdragonID: id, color, loadoutsIcon })
    }
  })
}
