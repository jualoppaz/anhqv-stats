<template>
  <div id="app">
    <el-container>
      <Menu/>

      <el-container id="content">
        <el-header id="header">
          <img src="./assets/banner.gif">
        </el-header>

        <el-main id="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-footer id="footer">
      Juan Manuel López Pazos
    </el-footer>
  </div>
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
    #content {
      border-left: 1px solid #e6e6e6;

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

    #footer{
      border-top: 1px solid #e6e6e6;
      text-align: center;
      padding: 20px;
    }
  }
}
</style>
