<template>
  <div id="season">
    Capítulos de la temporada {{seasonNumber}}.
  </div>
</template>

<script>

export default {
  name: 'Season',
  props: ['seasonNumber'],
  components: {},
  created() {},
};
</script>

<style lang="scss">

#season {

}
</style>
