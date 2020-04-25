<template>
  <div class="comps-list">
    <div class="comps-list-item" v-for="comp in filteredComps" :key="comp.id">
      <div class="comps-list-item__name">
        <span class="tier" :class="`tier-${comp.tier.toLowerCase()}`">{{ comp.tier }}</span>
        <span class="name">{{ comp.name }}</span>
      </div>

      <div class="comps-list-item__champions">
        <champion-avatar
          v-for="(champ, i) in comp.champions"
          :key="`${champ.name}-${i}`"
          :champion="champ"
          :highlighted="isSelected(champ)"
          @click="onChampionClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ChampionAvatar from './ChampionAvatar'

const buildCompFilterFn = selectedNames => comp => {
  if (selectedNames.length === 0) return true
  const compNames = comp.champions.map(c => c.name)

  return selectedNames.some(name => compNames.includes(name))
}

const compSortFn = (a, b) => {
  if (a.tier === b.tier) {
    return 0
  } else if (a.tier === 'S') {
    return -1
  } else if (b.tier === 'S') {
    return 1
  }
  return a.tier < b.tier ? -1 : 1
}

export default {
  components: {
    ChampionAvatar,
  },
  props: {
    comps: {
      type: Array,
      required: true,
    },
    selected: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    selectedNames() {
      return this.selected.map(c => c.name)
    },
    filteredComps() {
      return this.comps.filter(buildCompFilterFn(this.selectedNames)).sort(compSortFn)
    },
  },
  methods: {
    onChampionClick(champion) {
      this.$emit('select-champion', champion)
    },
    isSelected(champion) {
      return this.selectedNames.includes(champion.name)
    },
  },
}
</script>

<style lang="scss" scoped>
.comps-list-item {
  display: grid;
  grid-template-columns: 50% auto;
  color: $white;
  background: $grey-dark;
  border-radius: 4px;
  padding: 10px 20px;
  margin-bottom: 1rem;
  box-shadow: 0 3px 5px 0 #888;
}

.comps-list-item__name {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .tier {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    padding: 4px 8px;
    border-radius: 6px;
    margin-right: 1.3rem;

    &.tier-s {
      color: $white-ter;
      background: $danger;
    }

    &.tier-a {
      color: $white-ter;
      background: $orange;
    }

    &.tier-b {
      color: $dark;
      background: $yellow;
    }

    &.tier-c {
      color: $dark;
      background: $green;
    }
  }
}

.comps-list-item__champions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;

  @media screen and (min-width: $tablet) {
    grid-template-columns: repeat(8, 1fr);
  }
}
</style>
