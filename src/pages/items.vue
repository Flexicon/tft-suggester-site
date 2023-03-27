<template>
  <Layout>
    <section class="section">
      <div class="container">
        <ItemsCheatsheet :items="items" />
      </div>
    </section>
  </Layout>
</template>

<script>
import ItemsCheatsheet from '~/components/ItemsCheatsheet.vue'

export default {
  meta: {
    title: 'Items',
  },
  components: {
    ItemsCheatsheet,
  },
  computed: {
    items() {
      return this.$page.allItems.edges.map(e => e.node).sort((a, b) => (a.name > b.name ? 1 : -1))
    },
  },
}
</script>

<page-query>
query ItemsData {
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
