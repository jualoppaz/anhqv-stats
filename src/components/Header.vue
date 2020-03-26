<template>
  <div id="header">
    <h1>{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    title() {
      return this.$route.meta.title && this.$route.meta.title(this.$route).toUpperCase();
    },
  },
};
</script>

<style lang="scss" scoped>
#header{
  height: 100%;
  border-bottom: 1px solid $color-border-gray;

  h1 {
    margin: 0;
    line-height: 60px;
    padding: 0 20px;
  }
}
</style>
