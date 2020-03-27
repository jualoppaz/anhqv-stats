<template>
  <div id="footer">
    Copyright © 2020 <a href="https://www.juanmanuellopezpazos.es" target="_blank"> 👨‍💻 Juan Manuel López Pazos</a>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss" scoped>
#footer{
  border-top: 1px solid $color-border-gray;
  text-align: center;

  line-height: 59px;
  margin: 0;

  a {
    text-decoration: none;
    color: $color-text-black;

    &:hover{
      color: $color-text-blue;
    }
  }
}
</style>
