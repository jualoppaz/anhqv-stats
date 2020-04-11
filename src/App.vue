<template>
  <div id="app">
    <el-container id="layout">
      <Menu/>
      <el-container id="content">
        <el-header>
          <Header/>
        </el-header>

        <el-main id="main">
          <div id="adsense">
            <Adsense
              data-ad-client="ca-pub-2309187828170787"
              data-ad-slot="4044329554"
              data-ad-format="fluid"
              data-full-width-responsive="true">
            </Adsense>
          </div>
          <router-view :key="$route.fullPath"></router-view>
        </el-main>

        <el-footer>
          <Footer/>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import VueAdBlockDetect from 'vue-adblock-detect';
import Menu from './components/Menu.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Menu,
    Header,
    Footer,
  },
  mixins: [VueAdBlockDetect],
  beforeMount() {
    this.detectAdBlock().then((response) => {
      if (response) {
        this.$alert(this.$t('COMMON.ADBLOCK.TEXT'), this.$t('COMMON.ADBLOCK.TITLE'), {
          showConfirmButton: false,
          showClose: false,
        });
      }
    });
  },
};
</script>

<style lang="scss">

body{
  margin: 0;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;

  #app {
    #layout {
      height:100vh;

      #content {
        border-left: 1px solid #e6e6e6;

        .el-header{
          width: 100%;
          padding: 0;
          border-bottom: 1px solid $color-border-gray;
        }

        #main {

          @media screen and (min-width: $tablet-min-width){
            padding: 50px;
          }
        }

        .el-footer{
          padding: 0;
          height: 80px !important;

          @media screen and (min-width: $tablet-min-width){
            height: 60px !important;
          }
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
