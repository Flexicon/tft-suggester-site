<template>
  <div class="comp-item-cheatsheet">
    <div
      v-for="(champ, i) in championsWithItems"
      :key="`${champ.name}-${i}`"
      class="champ-cheatsheet"
    >
      <div class="champ-name-cheatsheet">
        <champion-avatar :champion="champ" no-items />
      </div>

      <div class="champ-item-cheatsheet">
        <div v-for="item in uniqueItemsForChampion(champ)" :key="item.name" class="composite-item">
          <div class="components">
            <img
              v-for="(component, i) in itemsFromCheatsheet[item.name.toLowerCase()].components"
              :key="`${champ.name}-${component.name}-${i}`"
              :src="component.image"
              :alt="component.name"
            />
          </div>
          <div class="arrow">
            <b-icon icon="arrow-right-thick" />
          </div>
          <img :src="item.image" :alt="item.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChampionAvatar from './ChampionAvatar'

export default {
  components: {
    ChampionAvatar,
  },
  props: {
    comp: {
      type: Object,
      required: true,
    },
    cheatsheet: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    championsWithItems() {
      return this.comp.champions.filter(c => c.items.length > 0)
    },
    itemsFromCheatsheet() {
      const champItemNames = this.championsWithItems
        .map(c => c.items.map(i => i.name.toLowerCase()))
        .flat()
      const isInSet = item => champItemNames.includes(item.name.toLowerCase())

      return this.cheatsheet.reduce((sheet, item) => {
        if (isInSet(item)) {
          sheet[item.name.toLowerCase()] = item
        }
        return sheet
      }, {})
    },
  },
  methods: {
    uniqueItemsForChampion(champ) {
      const notIn = (set, item) => !set.find(i => i.name === item.name)

      return champ.items.reduce((items, item) => {
        if (notIn(items, item)) {
          items.push(item)
        }
        return items
      }, [])
    },
  },
}
</script>

<style lang="scss" scoped>
$imgSize: 50px;

.comp-item-cheatsheet {
  margin-top: 1.5rem;
}

.champ-cheatsheet {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.champ-name-cheatsheet {
  width: $imgSize;
}

.composite-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.5rem;

  img {
    width: $imgSize;
    height: $imgSize;
    display: block;
    border-width: 2px;
    border-style: solid;
    border-radius: 2px;
    border-color: #666;
  }

  .components {
    display: flex;
    gap: 5px;
  }
}
</style>
