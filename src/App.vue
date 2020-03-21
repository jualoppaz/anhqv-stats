<template>
  <div id="app">
    <el-container id="layout">
      <Menu/>

      <el-container id="content">
        <el-header id="header">
          <img src="./assets/banner.gif">
        </el-header>

        <el-main id="main">
          <router-view></router-view>
        </el-main>
        <el-footer id="footer">
          Juan Manuel López Pazos
        </el-footer>
      </el-container>
    </el-container>
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
    #layout {
      height:100vh;

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

        #main {
          padding: 50px;
        }

        #footer{
          border-top: 1px solid #e6e6e6;
          text-align: center;
          padding: 20px;
        }
      }
    }
  }

  .el-menu--vertical {
    ul{
      &.el-menu--popup-right-start{
        li {
          padding: 0 !important;
          > a {
            color: #303133;
            display: block;
            text-decoration: none;
            padding: 0 20px;

            &.router-link-exact-active, &:focus{
              color: #409EFF;

              i {
                color: #409EFF;
              }
            }
          }
        }
      }
    }
  }
}
</style>
