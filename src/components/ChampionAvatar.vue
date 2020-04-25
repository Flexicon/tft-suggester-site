<template>
  <div class="champion-avatar" @click="$emit('click', champion)">
    <b-icon v-if="cancellable" class="close-icon" icon="close" size="is-small" />
    <img :src="champion.image" :alt="champion.name" :title="champion.name" />
  </div>
</template>

<script>
export default {
  props: {
    champion: {
      type: Object,
      required: true,
      validator: c => c.image && c.name,
    },
    cancellable: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.champion-avatar {
  position: relative;

  &:hover {
    cursor: pointer;

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
}
</style>