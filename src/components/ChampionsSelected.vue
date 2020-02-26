<template>
  <div class="champions-selected">
    <div
      class="champions-selected-item"
      v-for="champion in champions"
      :key="champion.id"
      @click="deselectChampion(champion)"
    >
      <b-icon class="close-icon" icon="close" size="is-small" />
      <img :src="champion.image" :alt="champion.name" :title="champion.name" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    champions: {
      type: Array,
      required: true,
    },
  },
  methods: {
    deselectChampion(champion) {
      this.$emit('deselect', champion)
    },
  },
}
</script>

<style lang="scss" scoped>
.champions-selected {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 5px;
  padding: 1rem 0.25rem;

  @media screen and (min-width: $tablet) {
    grid-template-columns: repeat(16, 1fr);
    grid-gap: 8px;
  }

  @media screen and (min-width: $desktop) {
    grid-template-columns: repeat(20, 1fr);
  }

  &-item {
    position: relative;

    &:hover {
      cursor: pointer;

      .close-icon {
        transform: scale(1.2);
      }
    }

    .close-icon {
      color: $danger;
      position: absolute;
      top: -4px;
      right: -4px;
      background: $dark;
      border-radius: 100%;
      transition: transform 0.2s;
    }

    img {
      display: block;
      width: 100%;
    }
  }
}
</style>
