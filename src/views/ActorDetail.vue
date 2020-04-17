<template>
  <div id="actor-detail">
   <div
      id="actor-info">
      <el-card>
         <div slot="header" class="clearfix">
            <div id="title">{{actorInfoTitle}}</div>
         </div>
         <el-row>
            <el-col id="avatar" :xs="24" :sm="24" :md="6">
              <el-avatar :src="actor.image_url" :size="avatarSize"/>
            </el-col>
            <el-col :xs="24" :sm="24" :md="{ span: 14, offset: 2 }">
              <el-row class="actor-info-row">
                <el-col :xs="24" :sm="12" :md="8">
                  <p>{{nameLabel}}</p>
                  <p v-if="actor.name" class="bold">{{actor.name}}</p>
                  <p v-else><i class="el-icon-minus"></i></p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8">
                  <p>{{surnameLabel}}</p>
                  <p v-if="actor.surname" class="bold">{{actor.surname}}</p>
                  <p v-else><i class="el-icon-minus"></i></p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8">
                  <p>{{secondSurnameLabel}}</p>
                  <p v-if="actor.second_surname" class="bold">{{actor.second_surname}}</p>
                  <p v-else><i class="el-icon-minus"></i></p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8">
                  <p>{{shortnameLabel}}</p>
                  <p v-if="actor.shortname" class="bold">{{actor.shortname}}</p>
                  <p v-else><i class="el-icon-minus"></i></p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8">
                  <p>{{birthdateLabel}}</p>
                  <p v-if="actor.parsed_birthdate" class="bold">{{actor.parsed_birthdate}}</p>
                  <p v-else><i class="el-icon-minus"></i></p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" v-if="actor.deathdate">
                  <p>{{deathdateLabel}}</p>
                  <p class="bold">{{actor.deathdate}}</p>
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
  name: 'ActorDetail',
  components: {},
  data() {
    return {
      avatarSize: 250,
      actorInfoTitle: this.$t('VIEWS.ACTORS.DETAIL.INFO.TITLE'),
      nameLabel: this.$t('VIEWS.ACTORS.DETAIL.INFO.NAME'),
      surnameLabel: this.$t('VIEWS.ACTORS.DETAIL.INFO.SURNAME'),
      secondSurnameLabel: this.$t('VIEWS.ACTORS.DETAIL.INFO.SECOND_SURNAME'),
      shortnameLabel: this.$t('VIEWS.ACTORS.DETAIL.INFO.SHORTNAME'),
      birthdateLabel: this.$t('VIEWS.ACTORS.DETAIL.INFO.BIRTHDATE'),
      deathdateLabel: this.$t('VIEWS.ACTORS.DETAIL.INFO.DEATHDATE'),
    };
  },
  created() {
    this.loadingInstance = Loading.service({
      target: utils.LOADING.QUERY_SELECTOR,
      background: 'rgba(0, 0, 0, 0.8)',
    });

    window.addEventListener('resize', this.handleResize);
    this.handleResize();

    this.$store.dispatch('actors/getBySlug', { slug: this.$route.params.slug })
      .finally(() => {
        this.loadingInstance.close();
      });
  },
  beforeDestroy() {
    this.loadingInstance.close();
    window.removeEventListener('resize', this.handleResize);
    this.$store.dispatch('actors/destroyCurrent');
  },
  computed: {
    ...mapState('actors', {
      actor: 'current',
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

#actor-detail {
  #actor-info{
    #avatar {
      text-align: center;
    }

    #title{
      color: $color-text-blue;
      font-size: 20px;
    }

    .actor-info-row{
      .bold {
        font-weight: bold;
      }
    }
  }
}
</style>
