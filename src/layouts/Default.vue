<template>
  <div>
    <Navbar />
    <transition name="fade" appear>
      <main>
        <slot />
      </main>
    </transition>
  </div>
</template>

<script>
import Navbar from "~/components/Navbar";

export default {
  components: {
    Navbar
  }
};
</script>

<style>
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter {
  opacity: 0;
}
</style>