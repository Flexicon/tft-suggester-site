<template>
  <Layout>
    <section class="section">
      <div class="container">
        <champions-selector
          :champions="champions"
          :selected="selected"
          @select-champion="onChampSelected($event)"
        />

        <champions-selected :champions="selected" @deselect="onChampDeselected($event)" />

        <b-button
          v-if="!selected.length"
          class="toggle-all-btn"
          @click="showTop = !showTop"
          icon-left="eye"
        >
          Toggle all
        </b-button>

        <comps-list
          v-if="selected.length || showTop"
          :comps="comps"
          :selected="selected"
          @select-champion="onChampSelectedFromComp($event)"
        />
      </div>
    </section>
  </Layout>
</template>

<script>
import ChampionsSelector from '~/components/ChampionsSelector'
import ChampionsSelected from '~/components/ChampionsSelected'
import CompsList from '~/components/CompsList'

export default {
  metaInfo: {
    title: 'Comps',
  },
  components: {
    ChampionsSelector,
    ChampionsSelected,
    CompsList,
  },
  data() {
    return {
      selected: [],
      showTop: false,
    }
  },
  created() {
    this.handleQueryParams()
  },
  methods: {
    onChampSelected(champion) {
      this.selected.push(champion)
      this.showTop = false
      this.updateQueryParams()
    },
    onChampSelectedFromComp(champion) {
      this.selected = [champion]
      this.showTop = false
      this.updateQueryParams()
    },
    onChampDeselected(champion) {
      this.selected = this.selected.filter(({ name }) => champion.name !== name)
      this.updateQueryParams()
    },
    updateQueryParams() {
      this.$router.push({
        query: { selected: this.selected.map(c => c.name).join(',') || undefined },
      })
    },
    handleQueryParams() {
      const selectedNames = (this.$route.query.selected || '').split(',')
      this.selected = this.champions.filter(({ name }) => selectedNames.includes(name))
    },
  },
  computed: {
    champions() {
      return this.$page.allChampions.edges.map(({ node }) => node)
    },
    comps() {
      return this.$page.allComps.edges.map(({ node }) => node)
    },
  },
}
</script>

<style lang="scss" scoped>
.toggle-all-btn {
  margin-bottom: 1rem;
}
</style>

<page-query>
query IndexData {
  allChampions(sortBy: "name", order: ASC) {
    edges {
      node {
        id
        name
        image
      }
    }
  },
  allComps(sortBy: "name", order: ASC) {
    edges {
      node {
        id
        name
        tier
        champions {
          name
          image
        }
      }
    }
  }
}
</page-query>
