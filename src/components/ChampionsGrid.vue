<template>
  <div class="champions-grid">
    <div
      class="champions-grid-item"
      v-for="champion in champions"
      :key="champion.id"
      @click="onChampionClicked(champion)"
    >
      <img :src="champion.image" :alt="champion.name" :title="champion.name" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    champions: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onChampionClicked(champion) {
      this.$emit('select-champion', champion)
    },
  },
}
</script>

<style lang="scss" scoped>
.champions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  margin-top: 2rem;

  @media (min-width: $tablet) {
    grid-template-columns: repeat(10, 1fr);
  }

  @media (min-width: $desktop) {
    grid-template-columns: repeat(12, 1fr);
  }

  @media (min-width: $widescreen) {
    grid-template-columns: repeat(14, 1fr);
  }
}

.champions-grid-item {
  &:hover {
    cursor: pointer;

    img {
      transform: scale(1.1);
    }
  }

  img {
    display: block;
    width: 100%;
    transition: transform 0.2s;
  }
}
</style>
