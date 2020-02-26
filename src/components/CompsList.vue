<template>
  <div class="comps-list">
    <div class="comps-list-item" v-for="comp in comps" :key="comp.id">
      {{ comp.name }} - {{ comp.champions.map(c => c.name).join(', ') }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comps: {
      type: Array,
      required: true,
    },
  },
}
</script>
