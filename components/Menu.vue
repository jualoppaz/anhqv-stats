<template>
  <el-aside id="aside-menu">
    <div id="logo">
      <img src="../assets/banner.gif">
    </div>
    <el-menu :default-openeds="defaultOpeneds" :collapse="isCollapsed">
      <el-menu-item index="1">
        <nuxt-link
          exact
          to="/"
        >
          <i class="el-icon-s-home" />
          <span>{{ homeItemText }}</span>
        </nuxt-link>
      </el-menu-item>
      <el-menu-item index="2">
        <nuxt-link :to="{ name: `characters___${$i18n.locale}` }">
          <i class="el-icon-user-solid" />
          <span>{{ charactersItemText }}</span>
        </nuxt-link>
      </el-menu-item>
      <el-menu-item index="3">
        <nuxt-link :to="{ name: `actors___${$i18n.locale}` }">
          <i class="el-icon-star-on" />
          <span>{{ actorsItemText }}</span>
        </nuxt-link>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-video-camera-solid" />
          <span slot="title">{{ seasonsItemText }}</span>
        </template>
        <el-menu-item index="4-1">
          <nuxt-link :to="{ name: `seasons___${$i18n.locale}`, params: { season_number: 1 } }">
            <i class="el-icon-film" />{{ firstSeasonItemText }}
          </nuxt-link>
        </el-menu-item>
        <el-menu-item index="4-2">
          <nuxt-link :to="{ name: `seasons___${$i18n.locale}`, params: { season_number: 2 } }">
            <i class="el-icon-film" />{{ secondSeasonItemText }}
          </nuxt-link>
        </el-menu-item>
        <el-menu-item index="4-3">
          <nuxt-link :to="{ name: `seasons___${$i18n.locale}`, params: { season_number: 3 } }">
            <i class="el-icon-film" />{{ thirdSeasonItemText }}
          </nuxt-link>
        </el-menu-item>
        <el-menu-item index="4-4">
          <nuxt-link :to="{ name: `seasons___${$i18n.locale}`, params: { season_number: 4 } }">
            <i class="el-icon-film" />{{ fourthSeasonItemText }}
          </nuxt-link>
        </el-menu-item>
        <el-menu-item index="4-5">
          <nuxt-link :to="{ name: `seasons___${$i18n.locale}`, params: { season_number: 5 } }">
            <i class="el-icon-film" />{{ fifthSeasonItemText }}
          </nuxt-link>
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
  mounted() {
    // eslint-disable-next-line nuxt/no-globals-in-created
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

          &.nuxt-link-active, &:focus{
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
