<template>
  <div class="items-cheatsheet">
    <h1>Items Cheatsheet</h1>

    <div class="sheet">
      <div v-for="item in normalItems" :key="item.name">
        <img class="final" :src="item.image" :alt="item.name">
        <div class="components">
          <img v-for="c in item.components" :key="c.name" class="component" :src="c.image" :alt="c.name">
        </div>
      </div>
    </div>

    <h1>Spatula Items</h1>

    <div class="sheet">
      <div v-for="item in spatItems" :key="item.name">
        <img class="final" :src="item.image" :alt="item.name">
        <div class="components">
          <img v-for="(c, i) in item.components" :key="`${item.name}-${c.name}-${i}`" class="component" :src="c.image"
            :alt="c.name">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    normalItems() {
      return this.items.filter(item => item.components.every(c => c.name !== 'Spatula'));
    },
    spatItems() {
      return this.items.filter(item => item.components.some(c => c.name === 'Spatula'));
    },
  },
}
</script>

<style lang="scss" scoped>
.items-cheatsheet {
  margin: 0 auto;
  width: 600px;
  max-width: 100%;
}

.sheet {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;

  @media (min-width: $large-mobile) {
    grid-template-columns: repeat(6, 1fr);
  }


  img {
    width: 100%;
    display: block;
    border-width: 2px;
    border-style: solid;
    border-radius: 2px;
    border-color: #666;
  }

  .components {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.3rem;

    margin: -1.2rem -.3rem 0;
  }
}
</style>
