<template>
  <div id="character-detail">
    <div class="banner">
      <h1>{{ title }}</h1>
    </div>
    <div class="wrapper">
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

    this.$store.commit('configs/setCurrentTitle', this.$t('VIEWS.CHARACTERS.DETAIL.TITLE', { character: '' }));

    return Promise.all([
      this.$store.dispatch('seo-configs/getSeoConfigBySlug', {
        slug: `character-${this.$route.params.slug}`,
      }),
      this.$store.dispatch('characters/getBySlug', {
        slug: this.$route.params.slug,
      }),
    ])
      .then(() => {
        this.$store.commit('configs/setCurrentTitle', this.$t('VIEWS.CHARACTERS.DETAIL.TITLE', { character: this.character.shortname }));
      })
      .finally(() => {
        if (this.loadingInstance) this.loadingInstance.close();
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
    ...mapState('configs', {
      title: 'currentTitle',
    }),
    ...mapState('seo-configs', {
      seoConfig: 'currentSeoConfig',
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
  head() {
    const obj = {
      meta: [],
      link: [],
    };

    const { seoConfig } = this;

    if (seoConfig.title) obj.title = seoConfig.title;
    // Standard metas
    if (seoConfig.description) {
      obj.meta.push({
        hid: 'description',
        name: 'description',
        content: seoConfig.description,
      });
    }
    if (seoConfig.canonical_url) {
      obj.link.push({
        rel: 'canonical',
        href: seoConfig.canonical_url,
      });
    }

    // Open Graph metas
    if (seoConfig.og_title) {
      obj.meta.push({
        hid: 'og:title',
        property: 'og:title',
        content: seoConfig.og_title,
      });
    }
    if (seoConfig.og_type) {
      obj.meta.push({
        hid: 'og:type',
        property: 'og:type',
        content: seoConfig.og_type,
      });
    }
    if (seoConfig.og_image) {
      obj.meta.push({
        hid: 'og:image',
        property: 'og:image',
        content: seoConfig.og_image,
      });
    }
    if (seoConfig.og_url) {
      obj.meta.push({
        hid: 'og:url',
        property: 'og:url',
        content: seoConfig.og_url,
      });
    }
    if (seoConfig.og_description) {
      obj.meta.push({
        hid: 'og:description',
        property: 'og:description',
        content: seoConfig.og_description,
      });
    }

    // Twitter metas
    if (seoConfig.twitter_site) {
      obj.meta.push({
        hid: 'twitter:site',
        name: 'twitter:site',
        content: seoConfig.twitter_site,
      });
    }
    if (seoConfig.twitter_card) {
      obj.meta.push({
        hid: 'twitter:card',
        name: 'twitter:card',
        content: seoConfig.twitter_card,
      });
    }

    return obj;
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
