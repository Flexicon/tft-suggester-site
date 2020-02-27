<template>
  <div>
    <Navbar />

    <div class="content">
      <transition name="fade" appear>
        <main>
          <slot />
        </main>
      </transition>

      <the-footer />
    </div>
  </div>
</template>

<script>
import TheFooter from '~/components/TheFooter'
import Navbar from '~/components/Navbar'

export default {
  components: {
    TheFooter,
    Navbar,
  },
}
</script>

<style>
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter {
  opacity: 0;
}
</style>

<style lang="scss" scoped>
.content {
  display: flex;
  min-height: calc(100vh - 3.25rem);
  flex-direction: column;

  main {
    flex: 1 1 auto;
  }
}
</style>