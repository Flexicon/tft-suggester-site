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
      </div>
    </section>

    <!-- <section class="section">
      <div class="container">
        <comps-list :comps="comps" />
      </div>
    </section> -->
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
    }
  },
  created() {
    this.handleQueryParams()
  },
  methods: {
    onChampSelected(champion) {
      this.selected.push(champion)
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
