<template>
  <div id="footer">
    {{copyrightText}} <a href="https://www.juanmanuellopezpazos.es" target="_blank">{{authorText}}</a>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      copyrightText: 'Copyright ©2020',
      authorText: '👨‍💻 Juan Manuel López Pazos',
    };
  },
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
