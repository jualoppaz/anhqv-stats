<template>
  <el-container id="app">
    <Menu/>

    <el-container>
      <el-header id="header">
        <img src="./assets/banner.gif">
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        Juan Manuel López Pazos
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>

import Menu from './components/Menu.vue';

export default {
  name: 'App',
  components: {
    Menu,
  },
};
</script>

<style lang="scss">

body{
  margin: 0;

  #app {
    #header{
      width: 100%;
      height: 200px !important;
      text-align: center;
      padding: 0;

      img {
        max-height: 100%;
      }
    }
  }
}
</style>
