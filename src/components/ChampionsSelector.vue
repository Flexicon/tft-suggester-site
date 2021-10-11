<template>
  <div class="champions-selector">
    <b-field class="search-wrap">
      <b-input
        :placeholder="queryPlaceholder"
        type="search"
        icon="magnify"
        size="is-large"
        v-model="query"
      />
    </b-field>

    <champions-grid
      v-if="showGrid"
      :champions="filteredChampions"
      @select-champion="onSelect($event)"
    />

    <p v-if="!filteredChampions.length">
      No matching champions for <em>{{ query }}</em>
    </p>
  </div>
</template>

<script>
import ChampionsGrid from '~/components/ChampionsGrid'

export default {
  components: {
    ChampionsGrid,
  },
  props: {
    champions: {
      type: Array,
      required: true,
    },
    selected: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      query: '',
    }
  },
  methods: {
    onSelect(champion) {
      this.query = ''
      this.$emit('select-champion', champion)
    },
  },
  computed: {
    filteredChampions() {
      if (!this.query && !this.selected.length) {
        return this.champions
      }
      const query = this.query.toLowerCase()
      const selectedIds = this.selected.map(c => c.id)

      return this.champions.filter(
        ({ id, name }) => name.toLowerCase().includes(query) && !selectedIds.includes(id),
      )
    },
    showGrid() {
      return this.selected.length === 0 || this.query
    },
    queryPlaceholder() {
      return this.selected.length ? 'Add a champion...' : 'Pick a champion...'
    },
  },
}
</script>
