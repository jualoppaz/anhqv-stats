<template>
  <el-aside id="aside-menu">
    <div id="logo">
      <img src="../assets/banner.gif">
    </div>
    <el-menu :default-openeds="defaultOpeneds" :collapse="isCollapsed">
      <el-menu-item index="1">
        <router-link
          to="/">
          <i class="el-icon-s-home"></i>
          <span>{{homeItemText}}</span>
        </router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link :to="{ name: 'Characters' }">
          <i class="el-icon-user-solid"></i>
          <span>{{charactersItemText}}</span>
        </router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link :to="{ name: 'Actors' }">
          <i class="el-icon-star-on"></i>
          <span>{{actorsItemText}}</span>
        </router-link>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-video-camera-solid"></i>
          <span slot="title">{{seasonsItemText}}</span>
        </template>
        <el-menu-item index="4-1">
          <router-link :to="{ name: 'SeasonDetails', params: { season_number: 1 } }">
            <i class="el-icon-film"></i>{{firstSeasonItemText}}
          </router-link>
        </el-menu-item>
        <el-menu-item index="4-2">
          <router-link :to="{ name: 'SeasonDetails', params: { season_number: 2 } }">
            <i class="el-icon-film"></i>{{secondSeasonItemText}}
          </router-link>
        </el-menu-item>
        <el-menu-item index="4-3">
          <router-link :to="{ name: 'SeasonDetails', params: { season_number: 3 } }">
            <i class="el-icon-film"></i>{{thirdSeasonItemText}}
          </router-link>
        </el-menu-item>
        <el-menu-item index="4-4">
          <router-link :to="{ name: 'SeasonDetails', params: { season_number: 4 } }">
            <i class="el-icon-film"></i>{{fourthSeasonItemText}}
          </router-link>
        </el-menu-item>
        <el-menu-item index="4-5">
          <router-link :to="{ name: 'SeasonDetails', params: { season_number: 5 } }">
            <i class="el-icon-film"></i>{{fifthSeasonItemText}}
          </router-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>

import utils from '../utils';

export default {
  name: 'Menu',
  components: {},
  data() {
    return {
      isCollapsed: false,
      defaultOpeneds: ['4'],
      charactersItemText: this.$t('MENU.CHARACTERS.TEXT'),
      homeItemText: this.$t('MENU.HOME.TEXT'),
      actorsItemText: this.$t('MENU.ACTORS.TEXT'),
      seasonsItemText: this.$t('MENU.SEASONS.TEXT'),
      firstSeasonItemText: this.$t('MENU.SEASONS.FIRST_SEASON.TEXT'),
      secondSeasonItemText: this.$t('MENU.SEASONS.SECOND_SEASON.TEXT'),
      thirdSeasonItemText: this.$t('MENU.SEASONS.THIRD_SEASON.TEXT'),
      fourthSeasonItemText: this.$t('MENU.SEASONS.FOURTH_SEASON.TEXT'),
      fifthSeasonItemText: this.$t('MENU.SEASONS.FIFTH_SEASON.TEXT'),
    };
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      if (utils.isMobile()) {
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

  @media screen and (min-width: $tablet-min-width){
    width: 250px !important;
  }

  #logo {
    img {
      width: 100%;
    }
  }

  ul {
    border-right: 0;
    -moz-user-select: none;
    -webkit-user-select: none;

    li {
      &.el-menu-item{
        padding: 0 !important;

        > a {
          color: $color-text-black;
          display: block;
          text-decoration: none;
          padding: 0 20px;

          &.router-link-exact-active, &:focus{
            color: $color-text-blue;

            i {
              color: $color-text-blue;
            }
          }
        }
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
