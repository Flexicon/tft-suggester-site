<template>
  <div class="champions-selected">
    <champion-avatar
      v-for="champion in champions"
      :key="champion.id"
      :champion="champion"
      @click="deselectChampion(champion)"
      cancellable
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
}
</style>
