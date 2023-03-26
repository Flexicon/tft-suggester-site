<template>
  <b-navbar type="is-dark">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        {{ $static.metadata.siteName }}
      </b-navbar-item>
    </template>

    <template #start>
      <template v-for="item of navItems">
        <b-navbar-item
          v-if="!item.hidden"
          :key="item.name"
          :to="item.to"
          tag="router-link"
          active-class="is-active"
          exact
        >
          {{ item.name }}
        </b-navbar-item>
      </template>
    </template>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      navItems: [
        {
          name: 'Comps',
          to: { path: '/' },
        },
        {
          name: 'Items',
          to: { path: '/items' },
        },
      ],
    }
  },
}
</script>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
