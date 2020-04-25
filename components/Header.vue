<template>
  <div id="header">
    <h1>ANHQV STATS</h1>
  </div>
</template>

<script>

export default {
  name: 'Header',
};
</script>

<style lang="scss" scoped>
#header{
  height: 100%;

  h1 {
    margin: 0;
    line-height: 60px;
    padding: 0 20px;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
