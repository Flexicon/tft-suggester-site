<template>
  <Layout>
    <section class="section">
      <div class="container">
        <h1>Items 🤫</h1>

        <p><em>Coming soon...</em></p>
      </div>
    </section>
  </Layout>
</template>

<script>
export default {
  meta: {
    title: 'Items',
  },
}
</script>

<page-query>
query ItemsData {
  allItems {
    edges {
      node {
        guid
        cdragonID
        id
        color {
          R
          G
          B
          A
        }
        loadoutsIcon
      }
    }
  }
}
</page-query>
