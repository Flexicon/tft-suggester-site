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
          :title="toggleCompsText"
          :class="{ active: showTop }"
          @click="showTop = !showTop"
        >
          <b-icon class="icon" icon="eye" size="is-small" />
          <span>{{ toggleCompsText }}</span>
        </b-button>

        <comps-list
          v-if="selected.length || showTop"
          :comps="comps"
          :cheatsheet="itemCheatsheet"
          :selected="selected"
          :top-limit="topLimit"
          @select-champion="onChampSelected($event)"
          @deselect-champion="onChampDeselected($event)"
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
      topLimit: 5,
      selected: [],
      showTop: false,
    }
  },
  mounted() {
    this.handleQueryParams()
  },
  methods: {
    onChampSelected(champion) {
      this.selected.push(champion)
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
    itemCheatsheet() {
      return this.$page.allItems.edges.map(({ node }) => node)
    },
    toggleCompsText() {
      return `${this.showTop ? 'Hide' : 'Show'} top ${this.topLimit}`
    },
  },
  watch: {
    '$route.query.selected'() {
      this.handleQueryParams()
    },
  },
}
</script>

<style lang="scss">
.toggle-all-btn {
  margin-bottom: 1rem;

  &.active .icon::after {
    content: ' ';
    display: block;
    background: #363636;
    width: 17px;
    height: 2px;
    position: absolute;
    border-radius: 10px;
    transform: rotate(-41deg);
  }
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
        cost
      }
    }
  },
  allComps(sortBy: "name", order: ASC) {
    edges {
      node {
        id
        name
        tier
        playstyle
        champions {
          name
          image
          cost
          items {
            name
            image
          }
        }
      }
    }
  }
  allItems {
    edges {
      node {
        name
        image
        components {
          name
          image
        }
      }
    }
  }
}
</page-query>
