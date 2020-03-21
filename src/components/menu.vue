<template>
  <el-aside id="aside-menu">
    <el-menu :default-openeds="defaultOpeneds" :collapse="isCollapsed">
      <el-menu-item index="1">
        <router-link
          to="/">
          <i class="el-icon-s-home"></i>
          <span>{{homeItemText}}</span>
        </router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/characters">
          <i class="el-icon-user-solid"></i>
          <span>{{charactersItemText}}</span>
        </router-link>
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-video-camera-solid"></i><span slot="title">Temporadas</span>
        </template>
        <el-menu-item index="3-1">
          <router-link to="/seasons/1">
            <i class="el-icon-film"></i>1ª Temporada
          </router-link>
        </el-menu-item>
        <el-menu-item index="3-2">
          <router-link to="/seasons/2">
            <i class="el-icon-film"></i>2ª Temporada
          </router-link>
        </el-menu-item>
        <el-menu-item index="3-3">
          <router-link to="/seasons/3">
            <i class="el-icon-film"></i>3ª Temporada
          </router-link>
        </el-menu-item>
        <el-menu-item index="3-4">
          <router-link to="/seasons/4">
            <i class="el-icon-film"></i>4ª Temporada
          </router-link>
        </el-menu-item>
        <el-menu-item index="3-5">
          <router-link to="/seasons/5">
            <i class="el-icon-film"></i>5ª Temporada
          </router-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>

export default {
  name: 'Menu',
  components: {},
  data() {
    return {
      isCollapsed: false,
      defaultOpeneds: ['3'],
    };
  },
  created() {
    this.charactersItemText = this.$t('MENU.CHARACTERS.TEXT');
    this.homeItemText = this.$t('MENU.HOME.TEXT');
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      if (window.innerWidth < 768) {
        this.isCollapsed = true;
      } else {
        this.isCollapsed = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>

#aside-menu {
  width: 64px !important;

  @media screen and (min-width: 768px){
    width: 250px !important;
  }

  ul {
    border-right: 0;
    -moz-user-select: none;
    -webkit-user-select: none;

    li {
      &.el-menu-item{
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

      ::v-deep div.el-submenu__title {
        //padding: 0 !important;
      }

      &.el-submenu {
        ul {
          li {
            &.el-menu-item {
              padding: 0 !important;

              a {
                padding: 0 45px !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>
