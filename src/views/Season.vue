<template>
  <div id="season">
    Capítulos de la temporada {{seasonNumber}}.
  </div>
</template>

<script>

export default {
  name: 'Season',
  components: {},
  created() {},
  computed: {
    seasonNumber() {
      return this.$route.params.season_number;
    },
  },
};
</script>

<style lang="scss">

</style>
