const axios = require('axios')

module.exports = function(api) {
  api.loadSource(async store => {
    const { data } = await axios.get('https://tft-suggester.herokuapp.com/champions')

    const collection = store.addCollection({
      typeName: 'Champions',
    })

    for (const { name, image } of data) {
      collection.addNode({ name, image })
    }
  })

  api.loadSource(async store => {
    const { data } = await axios.get('https://tft-suggester.herokuapp.com/comps')

    const collection = store.addCollection({
      typeName: 'Comps',
    })

    for (const { name, tier, champions } of data) {
      collection.addNode({ name, tier, champions })
    }
  })
}
