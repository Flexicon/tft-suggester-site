<template>
  <div class="comps-list">
    <div class="comps-list-item" v-for="comp in filteredComps" :key="comp.id">
      <div class="comps-list-item__name">
        <span class="tier" :class="`tier-${comp.tier.toLowerCase()}`">{{ comp.tier }}</span>
        <div class="name-wrapper togglable" @click="onToggleOpen(comp)">
          <span class="name">
            <span>
              {{ comp.name }}
            </span>
            <b-icon v-if="!isOpen(comp)" class="open-toggle-icon" icon="chevron-down" />
            <b-icon v-else class="open-toggle-icon" icon="chevron-up" />
          </span>
          <b-tag class="playstyle" type="is-dark" v-if="comp.playstyle">
            {{ comp.playstyle }}
          </b-tag>
        </div>
      </div>

      <div class="comps-list-item__champions">
        <champion-avatar
          v-for="(champ, i) in comp.champions"
          :key="`${champ.name}-${i}`"
          :champion="champ"
          :selected="isSelected(champ)"
          @click="onChampionClick"
        />
      </div>

      <div v-if="isOpen(comp)">
        <comp-item-cheatsheet :comp="comp" :cheatsheet="cheatsheet" />
      </div>
    </div>
  </div>
</template>

<script>
import ChampionAvatar from './ChampionAvatar'
import CompItemCheatsheet from './CompItemCheatsheet'

const buildCompFilterFn = selectedNames => comp => {
  const compNames = comp.champions.map(c => c.name)

  return selectedNames.some(name => compNames.includes(name))
}

const countMatchesInComp = (comp, selectedNames) =>
  comp.champions.filter(c => selectedNames.includes(c.name)).length

const buildCompSortFn = selectedNames => (a, b) => {
  const aSelected = countMatchesInComp(a, selectedNames)
  const bSelected = countMatchesInComp(b, selectedNames)

  if (aSelected !== bSelected) {
    return aSelected > bSelected ? -1 : 1
  }

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
    CompItemCheatsheet,
  },
  props: {
    topLimit: {
      type: Number,
      required: true,
    },
    comps: {
      type: Array,
      required: true,
    },
    selected: {
      type: Array,
      default: () => [],
    },
    cheatsheet: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      openCompMap: {},
    }
  },
  computed: {
    selectedNames() {
      return this.selected.map(c => c.name)
    },
    sortedComps() {
      return this.comps.sort(buildCompSortFn(this.selectedNames))
    },
    filteredComps() {
      return this.selected.length
        ? this.sortedComps.filter(buildCompFilterFn(this.selectedNames))
        : this.sortedComps.slice(0, this.topLimit)
    },
  },
  methods: {
    onChampionClick(champion) {
      this.$emit(this.isSelected(champion) ? 'deselect-champion' : 'select-champion', champion)
    },
    isSelected(champion) {
      return this.selectedNames.includes(champion.name)
    },
    championsWithItems(comp) {
      return comp.champions.filter(c => c.items.length > 0)
    },
    onToggleOpen(comp) {
      this.openCompMap = { ...this.openCompMap, [comp.name]: !this.openCompMap[comp.name] }
    },
    isOpen(comp) {
      return !!this.openCompMap[comp.name]
    },
  },
}
</script>

<style lang="scss" scoped>
.comps-list-item {
  display: grid;
  grid-template-columns: 1fr;
  color: $white;
  background: $grey-dark;
  border-radius: 4px;
  padding: 10px 20px;
  margin-bottom: 1rem;
  box-shadow: 0 3px 5px 0 #888;

  @media screen and (min-width: $tablet) {
    grid-template-columns: 40% 60%;
  }

  @media screen and (min-width: $desktop) {
    grid-template-columns: 50% auto;
  }
}

.comps-list-item__name {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0.8rem;

  @media screen and (min-width: $tablet) {
    margin-bottom: 0;
  }

  .name-wrapper {
    .name {
      display: flex;
    }

    &.togglable {
      cursor: pointer;

      &:hover {
        color: #ccc;
      }
    }
  }

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
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;

  @media screen and (min-width: $large-mobile) {
    grid-template-columns: repeat(8, 1fr);
  }
}
</style>
