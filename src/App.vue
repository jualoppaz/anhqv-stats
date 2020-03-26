<template>
  <div id="app">
    <el-container id="layout">
      <Menu/>
      <el-container id="content">
        <el-header>
          <Header/>
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
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Menu,
    Header,
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

        .el-header{
          width: 100%;
          padding: 0;
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
