<template>
  <el-aside id="aside-menu">
    <el-menu :default-openeds="defaultOpeneds">
      <el-menu-item index="1">
        <router-link
          to="/">
          <i class="el-icon-s-home"></i> {{homeItemText}}
        </router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/characters">
          <i class="el-icon-user-solid"></i> {{charactersItemText}}
        </router-link>
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-video-camera-solid"></i>Temporadas</template>
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
      defaultOpeneds: ['3'],
    };
  },
  created() {
    this.charactersItemText = this.$t('MENU.CHARACTERS.TEXT');
    this.homeItemText = this.$t('MENU.HOME.TEXT');
  },
};
</script>

<style lang="scss">

#aside-menu {
  width: 200px;

  ul {
    border-right: 0;
    -moz-user-select: none;
    -webkit-user-select: none;

    li {
      > a {
        color: #303133;

        &.router-link-exact-active, &:focus{
          color: #409EFF;

          i {
            color: #409EFF;
          }
        }
        display: block;
        //color: #303133;
        text-decoration: none;
      }
    }
  }
}
</style>
