<template>
  <footer class="footer">
    <div class="has-text-centered has-text-grey-light">
      <small>
        &copy; {{ year }} made by <a href="https://flexicondev.com/">Mike</a>. All Rights Reserved.
        <br />
        This site is not affiliated with Riot Games.
      </small>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      year: '',
    }
  },
  mounted() {
    this.year = new Date().getFullYear()
  },
}
</script>

<style lang="scss" scoped>
footer {
  a {
    color: $grey;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
