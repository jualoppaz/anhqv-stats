<template>
  <div id="actor-detail">
    <div class="banner">
      <h1>{{ title }}</h1>
    </div>
    <div class="wrapper">
      <div
        id="actor-info"
      >
        <el-card>
          <div slot="header" class="clearfix">
            <div id="title">
              {{ actorInfoTitle }}
            </div>
          </div>
          <el-row>
            <el-col id="avatar" :xs="24" :sm="24" :md="6">
              <el-avatar :src="actor.image_url" :size="avatarSize" />
            </el-col>
            <el-col :xs="24" :sm="24" :md="{ span: 14, offset: 2 }">
              <el-row class="actor-info-row">
                <el-col :xs="24" :sm="12" :md="8">
                  <p>{{ nameLabel }}</p>
                  <p v-if="actor.name" class="bold">
                    {{ actor.name }}
                  </p>
                  <p v-else>
                    <i class="el-icon-minus" />
                  </p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8">
                  <p>{{ surnameLabel }}</p>
                  <p v-if="actor.surname" class="bold">
                    {{ actor.surname }}
                  </p>
                  <p v-else>
                    <i class="el-icon-minus" />
                  </p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8">
                  <p>{{ secondSurnameLabel }}</p>
                  <p v-if="actor.second_surname" class="bold">
                    {{ actor.second_surname }}
                  </p>
                  <p v-else>
                    <i class="el-icon-minus" />
                  </p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8">
                  <p>{{ shortnameLabel }}</p>
                  <p v-if="actor.shortname" class="bold">
                    {{ actor.shortname }}
                  </p>
                  <p v-else>
                    <i class="el-icon-minus" />
                  </p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8">
                  <p>{{ birthdateLabel }}</p>
                  <p v-if="actor.parsed_birthdate" class="bold">
                    {{ actor.parsed_birthdate }}
                  </p>
                  <p v-else>
                    <i class="el-icon-minus" />
                  </p>
                </el-col>
                <el-col v-if="actor.parsed_deathdate" :xs="24" :sm="12" :md="8">
                  <p>{{ deathdateLabel }}</p>
                  <p class="bold">
                    {{ actor.parsed_deathdate }}
                  </p>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <el-row
        class="social-networks"
      >
        <h2>{{ shareText }}</h2>
        <social-sharing
          :url="seoConfig.canonical_url"
          :title="seoConfig.title"
          :description="seoConfig.description"
          inline-template
        >
          <div class="networks-inline-list">
            <network network="twitter">
              <font-awesome-icon
                class="twitter-icon"
                :icon="['fab', 'twitter']"
                size="2x"
              />
            </network>
            <network network="facebook">
              <font-awesome-icon
                class="facebook-icon"
                :icon="['fab', 'facebook']"
                size="2x"
              />
            </network>
          </div>
        </social-sharing>
      </el-row>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import { Loading } from 'element-ui';

import utils from '../../../utils';

export default {
  name: 'ActorDetail',
  components: {},
  nuxtI18n: {
    paths: {
      es: '/actores/:slug',
    },
  },
  async fetch() {
    if (process.browser) {
      this.loadingInstance = Loading.service({
        target: utils.LOADING.QUERY_SELECTOR,
        background: 'rgba(0, 0, 0, 0.8)',
      });
    }

    this.$store.commit('configs/setCurrentTitle', this.$t('VIEWS.ACTORS.DETAIL.TITLE', { actor: '' }));

    return Promise.all([
      this.$store.dispatch('seo-configs/getSeoConfigBySlug', {
        slug: `actor-${this.$route.params.slug}`,
      }),
      this.$store.dispatch('actors/getBySlug', {
        slug: this.$route.params.slug,
      }),
    ])
      .then(() => {
        this.$store.commit('configs/setCurrentTitle', this.$t('VIEWS.ACTORS.DETAIL.TITLE', { actor: this.actor.shortname }));
      })
      .finally(() => {
        if (this.loadingInstance) this.loadingInstance.close();
      });
  },
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
      shareText: this.$t('COMMON.SOCIAL_SHARING.SHARE'),
    };
  },
  computed: {
    ...mapState('actors', {
      actor: 'current',
    }),
    ...mapState('configs', {
      title: 'currentTitle',
    }),
    ...mapState('seo-configs', {
      seoConfig: 'currentSeoConfig',
    }),
  },
  mounted() {
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    if (this.loadingInstance) this.loadingInstance.close();
    window.removeEventListener('resize', this.handleResize);
    this.$store.dispatch('actors/destroyCurrent');
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
