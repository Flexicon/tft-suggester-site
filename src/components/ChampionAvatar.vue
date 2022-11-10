<template>
  <b-tooltip
    :label="`${champion.name} - ${champion.cost}g`"
    :active="mainTooltipActive"
    type="is-light"
  >
    <div
      class="champion-avatar"
      :class="{ selected, [`c${champion.cost}`]: true }"
      @click="$emit('click', champion)"
    >
      <b-icon v-if="cancellable" class="close-icon" icon="close" size="is-small" />
      <b-icon v-if="selected" class="selected-icon" icon="check" size="is-small" />
      <img class="avatar-image" :src="champion.image" :alt="champion.name" :title="champion.name" />

      <div class="item-images">
        <b-tooltip
          v-for="(item, i) in champion.items"
          :key="`${item.name}-${i}`"
          :label="`${item.name}`"
          type="is-light"
        >
          <img
            :src="item.image"
            :alt="item.name"
            @mouseover="mainTooltipActive = false"
            @mouseout="mainTooltipActive = true"
            @click.stop
          />
        </b-tooltip>
      </div>
    </div>
  </b-tooltip>
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
    selected: Boolean,
  },
  data() {
    return {
      mainTooltipActive: true,
    }
  },
}
</script>

<style lang="scss" scoped>
.champion-avatar {
  position: relative;
  cursor: pointer;
  border-width: 3px;
  border-style: solid;
  border-radius: 3px;

  &:not(.selected):hover {
    .image {
      transform: scale(1.1);
    }

    .close-icon {
      transform: scale(1.25);
    }
  }

  .avatar-image {
    display: block;
    width: 100%;
    max-width: 100px;
    height: 100%;
    transition: transform 0.2s;
    border-radius: 1px;
  }

  .item-images {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    display: flex;
    justify-content: space-around;

    img {
      width: 18px;
      border-width: 1px;
      border-style: solid;
      border-radius: 2px;
      border-color: #666;
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
    z-index: 10;
  }

  .selected-icon {
    color: $green;
    position: absolute;
    top: -4px;
    right: -4px;
    background: $dark;
    border-radius: 100%;
    z-index: 10;
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

  &.c6 {
    border-color: #BBBBBB;
  }

  &.c7 {
    border-color: #ffffff;
  }

  &.c8 {
    border-color: #eab8ff;
  }
}
</style>
