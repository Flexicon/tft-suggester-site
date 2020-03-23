<template>
  <footer class="footer">
    <div class="has-text-centered has-text-grey-light">
      <small>
        &copy; {{ year }} TFT Suggester. Made by <a href="https://flexicondev.com/">Mike</a>. All
        Rights Reserved.
        <br />
        This site is not affiliated with Riot Games.
        <br />
        TFT Suggester was created under Riot Games' "Legal Jibber Jabber" policy using assets owned
        by Riot Games. Riot Games does not endorse or sponsor this project.
        <br />
        Last update: {{ buildTime }}
        <br />
        <span class="version">{{ versionHash }}</span>
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
  computed: {
    versionHash() {
      return this.$static.metadata.gitInfo.commitHash
    },
    buildTime() {
      return this.$static.metadata.buildTime
    },
  },
}
</script>

<static-query>
query {
  metadata {
    buildTime
    gitInfo {
      commitHash
    }
  }
}
</static-query>

<style lang="scss" scoped>
footer {
  a {
    color: $grey;

    &:hover {
      text-decoration: underline;
    }
  }

  .version {
    display: inline-block;
    opacity: 0.5;
    margin-top: 10px;
  }
}
</style>
