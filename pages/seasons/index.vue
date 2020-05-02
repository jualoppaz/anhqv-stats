<template>
  <div id="season">
    <div class="banner">
      <h1>{{ title }}</h1>
    </div>
    <div class="wrapper">
      <el-row
        id="chapters-list"
        :gutter="gutter"
      >
        <el-col
          v-for="chapter in chapters"
          :key="chapter.id"
          class="chapter-col"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
        >
          <ChapterCard :chapter="chapter" />
        </el-col>
      </el-row>
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
import utils from '../../utils';
import ChapterCard from '../../components/ChapterCard.vue';

export default {
  name: 'Season',
  components: {
    ChapterCard,
  },
  nuxtI18n: {
    paths: {
      es: '/temporadas/:season_number',
    },
  },
  async fetch() {
    if (process.browser) {
      this.loadingInstance = Loading.service({
        target: utils.LOADING.QUERY_SELECTOR,
        background: 'rgba(0, 0, 0, 0.8)',
      });
    }

    this.$store.commit('configs/setCurrentTitle', this.$t('VIEWS.SEASONS.DETAIL.TITLE', { number: this.$route.params.season_number }));

    return Promise.all([
      this.$store.dispatch('seo-configs/getSeoConfigBySlug', {
        slug: `season-${this.$route.params.season_number}-chapters`,
      }),
      this.$store.dispatch('chapters/getAll', {
        season: this.$route.params.season_number,
      }),
    ])
      .finally(() => {
        if (this.loadingInstance) this.loadingInstance.close();
      });
  },
  data() {
    return {
      gutter: utils.VIEWS.SEASONS.GUTTER.DEFAULT,
      detailButtonText: this.$t('VIEWS.SEASONS.SEE_DETAIL.TEXT'),
      shareText: this.$t('COMMON.SOCIAL_SHARING.SHARE'),
    };
  },
  computed: {
    ...mapState('chapters', {
      chapters: 'all',
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
    this.$store.dispatch('chapters/destroyAll');
  },
  methods: {
    handleResize() {
      if (utils.isMobile()) {
        this.gutter = utils.VIEWS.SEASONS.GUTTER.MOBILE;
      } else {
        this.gutter = utils.VIEWS.SEASONS.GUTTER.DEFAULT;
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
#season {
  #chapters-list{
    .chapter-col{
      padding: 6px;

      .image-container{
        .image{
          width: 100%;
          height: 100%;
          display: block;
        }
      }

      .chapter-card-info{
        .el-row{
          .chapter-name{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: block;
          }

          &:not(:last-child){
            margin-bottom: 20px;
          }
        }
      }
    }
  }
}
</style>
