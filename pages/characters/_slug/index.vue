<template>
  <div id="character-detail">
    <div
      id="character-info"
    >
      <el-card>
        <div slot="header" class="clearfix">
          <div id="title">
            {{ characterInfoTitle }}
          </div>
        </div>
        <el-row>
          <el-col id="avatar" :xs="24" :sm="24" :md="6">
            <el-avatar :src="character.image_url" :size="avatarSize" />
          </el-col>
          <el-col :xs="24" :sm="24" :md="{ span: 14, offset: 2 }">
            <el-row class="character-info-row">
              <el-col :xs="24" :sm="12" :md="8">
                <p>
                  {{ nameLabel }}
                </p>
                <p v-if="character.name" class="bold">
                  {{ character.name }}
                </p>
                <p v-else>
                  <i class="el-icon-minus" />
                </p>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <p>
                  {{ surnameLabel }}
                </p>
                <p v-if="character.surname" class="bold">
                  {{ character.surname }}
                </p>
                <p v-else>
                  <i class="el-icon-minus" />
                </p>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <p>
                  {{ secondSurnameLabel }}
                </p>
                <p v-if="character.second_surname" class="bold">
                  {{ character.second_surname }}
                </p>
                <p v-else>
                  <i class="el-icon-minus" />
                </p>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <p>
                  {{ shortnameLabel }}
                </p>
                <p v-if="character.shortname" class="bold">
                  {{ character.shortname }}
                </p>
                <p v-else>
                  <i class="el-icon-minus" />
                </p>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <p>
                  {{ nicknameLabel }}
                </p>
                <p v-if="character.nickname" class="bold">
                  {{ character.nickname }}
                </p>
                <p v-else>
                  <i class="el-icon-minus" />
                </p>
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

import utils from '../../../utils';

export default {
  name: 'CharacterDetail',
  components: {},
  nuxtI18n: {
    paths: {
      es: '/personajes/:slug',
    },
  },
  async fetch() {
    if (process.browser) {
      this.loadingInstance = Loading.service({
        target: utils.LOADING.QUERY_SELECTOR,
        background: 'rgba(0, 0, 0, 0.8)',
      });
    }

    return this.$store.dispatch('characters/getBySlug', { slug: this.$route.params.slug })
      .finally(() => {
        this.loadingInstance.close();
      });
  },
  data() {
    return {
      avatarSize: 250,
      characterInfoTitle: this.$t('VIEWS.CHARACTERS.DETAIL.INFO.TITLE'),
      nameLabel: this.$t('VIEWS.CHARACTERS.DETAIL.INFO.NAME'),
      surnameLabel: this.$t('VIEWS.CHARACTERS.DETAIL.INFO.SURNAME'),
      secondSurnameLabel: this.$t('VIEWS.CHARACTERS.DETAIL.INFO.SECOND_SURNAME'),
      shortnameLabel: this.$t('VIEWS.CHARACTERS.DETAIL.INFO.SHORTNAME'),
      nicknameLabel: this.$t('VIEWS.CHARACTERS.DETAIL.INFO.NICKNAME'),
    };
  },
  computed: {
    ...mapState('characters', {
      character: 'current',
    }),
  },
  created() {
    if (process.browser) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    }
  },
  beforeDestroy() {
    if (this.loadingInstance) this.loadingInstance.close();
    window.removeEventListener('resize', this.handleResize);
    this.$store.dispatch('characters/destroyCurrent');
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
