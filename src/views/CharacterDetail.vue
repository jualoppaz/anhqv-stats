<template>
  <div id="character-detail">
   <div
      id="character-info">
      <el-card>
         <div slot="header" class="clearfix">
            <div
              id="title">
              {{characterInfoTitle}}
            </div>
         </div>
         <el-row>
            <el-col
              id="avatar"
              :xs="24"
              :sm="24"
              :md="6">
              <el-avatar :src="character.image_url" :size="avatarSize"/>
            </el-col>
            <el-col
              :xs="24"
              :sm="24"
              :md="{
                span: 14,
                offset: 2
              }">
              <el-row
                class="character-info-row">
                <el-col
                  :xs="{
                  span: 24
                  }"
                  :sm="{
                  span: 12
                  }"
                  :md="{
                  span: 8
                  }">
                  <p>Nombre</p>
                  <p v-if="character.name" class="bold">{{character.name}}</p>
                  <p v-else><i class="el-icon-minus"></i></p>
                </el-col>
                <el-col
                  :xs="{
                  span: 24
                  }"
                  :sm="{
                  span: 12
                  }"
                  :md="{
                  span: 8
                  }">
                  <p>Primer apellido</p>
                  <p v-if="character.surname" class="bold">{{character.surname}}</p>
                  <p v-else><i class="el-icon-minus"></i></p>
                </el-col>
                <el-col
                  :xs="{
                  span: 24
                  }"
                  :sm="{
                  span: 12
                  }"
                  :md="{
                  span: 8
                  }">
                  <p>Segundo apellido</p>
                  <p v-if="character.second_surname" class="bold">{{character.second_surname}}</p>
                  <p v-else><i class="el-icon-minus"></i></p>
                </el-col>
                <el-col
                  :xs="24"
                  :sm="12"
                  :md="8">
                  <p>Nombre corto</p>
                  <p v-if="character.shortname" class="bold">{{character.shortname}}</p>
                  <p v-else><i class="el-icon-minus"></i></p>
                </el-col>
                <el-col
                  :xs="24"
                  :sm="12"
                  :md="8">
                  <p>Apodo</p>
                  <p v-if="character.nickname" class="bold">{{character.nickname}}</p>
                  <p v-else><i class="el-icon-minus"></i></p>
                </el-col>
              </el-row>
            </el-col>
         </el-row>
      </el-card>
   </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import { Loading } from 'element-ui';

import utils from '../utils';

export default {
  name: 'CharacterDetail',
  components: {},
  data() {
    return {
      avatarSize: 250,
      characterInfoTitle: this.$t('VIEWS.CHARACTERS.DETAIL.INFO.TITLE'),
    };
  },
  created() {
    this.loadingInstance = Loading.service({
      target: utils.LOADING.QUERY_SELECTOR,
      background: 'rgba(0, 0, 0, 0.8)',
    });

    window.addEventListener('resize', this.handleResize);
    this.handleResize();

    this.$store.dispatch('characters/getBySlug', { slug: this.$route.params.slug })
      .finally(() => {
        this.loadingInstance.close();
      });
  },
  beforeDestroy() {
    this.loadingInstance.close();
    window.removeEventListener('resize', this.handleResize);
    this.$store.dispatch('characters/destroyCurrent');
  },
  computed: {
    ...mapState('characters', {
      character: 'current',
    }),
  },
  methods: {
    handleResize() {
      if (utils.isMobile()) {
        this.avatarSize = 100;
      } else {
        this.avatarSize = 250;
      }
    },
  },
};
</script>

<style lang="scss" scoped>

#character-detail {
  #character-info{
    #avatar {
      text-align: center;
    }

    #title{
      color: $color-text-blue;
      font-size: 20px;
    }

    .character-info-row{
      .bold {
        font-weight: bold;
      }
    }
  }
}
</style>
