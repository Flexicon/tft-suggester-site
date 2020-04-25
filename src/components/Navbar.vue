<template>
  <b-navbar type="is-dark" fixed-top>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        {{ $static.metadata.siteName }}
      </b-navbar-item>
    </template>

    <template #start>
      <!-- <b-navbar-item tag="router-link" active-class="is-active" :to="{ path: '/' }">
        Comps
      </b-navbar-item> -->
    </template>
  </b-navbar>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
