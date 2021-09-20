<template>
  <b-tooltip :label="`${champion.name} - ${champion.cost}g`" type="is-light">
    <div
      class="champion-avatar"
      :class="{ highlighted, [`c${champion.cost}`]: true }"
      @click="$emit('click', champion)"
    >
      <b-icon v-if="cancellable" class="close-icon" icon="close" size="is-small" />
      <img :src="champion.image" :alt="champion.name" :title="champion.name" />
    </div>
  </b-tooltip>
</template>

<script>
export default {
  props: {
    champion: {
      type: Object,
      required: true,
      validator: (c) => c.image && c.name,
    },
    cancellable: Boolean,
    highlighted: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.champion-avatar {
  position: relative;
  cursor: pointer;
  border-width: 2px;
  border-style: solid;
  border-radius: 3px;

  &:not(.highlighted):hover {
    img {
      transform: scale(1.1);
    }

    .close-icon {
      transform: scale(1.25);
    }
  }

  img {
    display: block;
    width: 100%;
    max-width: 100px;
    transition: transform 0.2s;
    border-radius: 1px;
  }

  .close-icon {
    color: $danger;
    position: absolute;
    top: -4px;
    right: -4px;
    background: $dark;
    border-radius: 100%;
    transition: transform 0.2s;
    z-index: 10;
  }

  &.highlighted {
    background-color: $yellow;
    padding: 1px;
  }

  /* Cost styles */
  &.c1 {
    border-color: #213042;
  }

  &.c2 {
    border-color: #156831;
  }

  &.c3 {
    border-color: #12407c;
  }

  &.c4 {
    border-color: #893088;
  }

  &.c5 {
    border-color: #b89d27;
  }
}
</style>