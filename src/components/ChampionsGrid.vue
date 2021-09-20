<template>
  <div class="champions-grid">
    <champion-avatar
      v-for="champion in champions"
      :key="champion.id"
      :champion="champion"
      @click="onChampionClicked"
    />
  </div>
</template>

<script>
import ChampionAvatar from './ChampionAvatar'

export default {
  components: {
    ChampionAvatar,
  },
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
  grid-gap: 4px;
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
</style>
