<template>
  <div id="chapter-detail">
    <div class="banner">
      <h1>{{ title }}</h1>
    </div>
    <div class="wrapper">
      <div
        id="chapter-info"
      >
        <el-card>
          <div slot="header" class="clearfix">
            <div id="title">
              {{ chapterInfoTitle }}
            </div>
          </div>
          <el-row>
            <el-col
              id="avatar"
              :xs="24"
              :sm="24"
              :md="12"
              :lg="6"
            >
              <el-avatar :src="chapter.image_url" :size="avatarSize" shape="square" />
            </el-col>
            <el-col
              :xs="24"
              :sm="24"
              :md="12"
              :lg="{ span: 14, offset: 2 }"
            >
              <el-row class="chapter-info-row">
                <el-col :xs="24" :sm="12" :md="8">
                  <p>{{ nameLabel }}</p>
                  <p v-if="chapter.name" class="bold">
                    {{ chapter.name }}
                  </p>
                  <p v-else>
                    <i class="el-icon-minus" />
                  </p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8">
                  <p>{{ seasonLabel }}</p>
                  <p v-if="chapter.season" class="bold">
                    {{ chapter.season }}
                  </p>
                  <p v-else>
                    <i class="el-icon-minus" />
                  </p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8">
                  <p>{{ durationLabel }}</p>
                  <p v-if="chapter.parsed_duration" class="bold">
                    {{ chapter.parsed_duration }}
                  </p>
                  <p v-else>
                    <i class="el-icon-minus" />
                  </p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8">
                  <p>{{ releaseDateLabel }}</p>
                  <p
                    v-if="chapter.parsed_release_date"
                    class="bold"
                  >
                    {{ chapter.parsed_release_date }}
                  </p>
                  <p v-else>
                    <i class="el-icon-minus" />
                  </p>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="chapter.summary">
            <el-col>
              <p>{{ summaryLabel }}</p>
              <div v-if="chapter.summary" id="summary" v-html="chapter.summary" />
              <p v-else>
                <i class="el-icon-minus" />
              </p>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <div
        id="chapter-video"
      >
        <el-card>
          <div slot="header" class="clearfix">
            <div id="title">
              {{ videoTitle }}
            </div>
          </div>
          <p v-if="loading()">
            {{ loadingText }}
          </p>
          <el-row v-else-if="chapter.video_url">
            <el-col
              id="avatar"
              :xs="24"
              :sm="24"
              :md="{
                span: 12,
                offset: 6
              }"
              :lg="{
                span: 12,
                offset: 6
              }"
            >
              <div
                class="embed-container"
              >
                <iframe
                  :src="chapter.video_url"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                />
              </div>
            </el-col>
          </el-row>
          <p v-else>
            {{ unavailableText }}
          </p>
        </el-card>
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
  </div>
</template>

<script>

import { mapState } from 'vuex';
import { Loading } from 'element-ui';

import utils from '../../../../../utils';

export default {
  name: 'ChapterDetail',
  components: {},
  nuxtI18n: {
    paths: {
      es: '/temporadas/:season_number/capitulos/:slug',
    },
  },
  async fetch() {
    if (process.browser) {
      this.loadingInstance = Loading.service({
        target: utils.LOADING.QUERY_SELECTOR,
        background: 'rgba(0, 0, 0, 0.8)',
      });
    }

    this.$store.commit('configs/setCurrentTitle', this.$t('VIEWS.SEASONS.DETAIL.CHAPTERS.DETAIL.TITLE', { slug: '' }));

    return Promise.all([
      this.$store.dispatch('seo-configs/getSeoConfigBySlug', {
        slug: this.$route.params.slug,
      }),
      this.$store.dispatch('chapters/getBySlug', {
        slug: this.$route.params.slug,
      }),
    ])
      .then(() => {
        this.$store.commit('configs/setCurrentTitle', this.$t('VIEWS.SEASONS.DETAIL.CHAPTERS.DETAIL.TITLE', {
          slug: this.chapter.natural_id,
          name: this.chapter.name,
        }));
      })
      .finally(() => {
        if (this.loadingInstance) this.loadingInstance.close();
      });
  },
  data() {
    return {
      avatarSize: 250,
      chapterInfoTitle: this.$t('VIEWS.SEASONS.DETAIL.CHAPTERS.DETAIL.INFO.TITLE'),
      nameLabel: this.$t('VIEWS.SEASONS.DETAIL.CHAPTERS.DETAIL.INFO.NAME'),
      seasonLabel: this.$t('VIEWS.SEASONS.DETAIL.CHAPTERS.DETAIL.INFO.SEASON'),
      durationLabel: this.$t('VIEWS.SEASONS.DETAIL.CHAPTERS.DETAIL.INFO.DURATION'),
      releaseDateLabel: this.$t('VIEWS.SEASONS.DETAIL.CHAPTERS.DETAIL.INFO.RELEASE_DATE'),
      summaryLabel: this.$t('VIEWS.SEASONS.DETAIL.CHAPTERS.DETAIL.INFO.SUMMARY'),
      videoTitle: this.$t('VIEWS.SEASONS.DETAIL.CHAPTERS.DETAIL.VIDEO.TITLE'),
      loadingText: this.$t('COMMON.LOADING'),
      unavailableText: this.$t('COMMON.UNAVAILABLE'),
      shareText: this.$t('COMMON.SOCIAL_SHARING.SHARE'),
    };
  },
  computed: {
    ...mapState('chapters', {
      chapter: 'current',
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
    this.$store.dispatch('chapters/destroyCurrent');
  },
  methods: {
    handleResize() {
      if (utils.isMobile()) {
        this.avatarSize = 100;
      } else {
        this.avatarSize = 250;
      }
    },
    loading() {
      return this.loadingInstance && this.loadingInstance.visible;
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

#chapter-detail {
  #chapter-info{
    #avatar {
      text-align: center;
    }

    #title{
      color: $color-text-blue;
      font-size: 20px;
    }

    .chapter-info-row{
      .bold {
        font-weight: bold;
      }
    }

    #summary{
      ::v-deep p {
        text-align: justify;
      }
    }
  }

  #chapter-video {
    margin-top: 15px;

    #title{
      color: $color-text-red;
      font-size: 20px;
    }

    .embed-container {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
    }
    .embed-container iframe {
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
    }
  }
}
</style>
