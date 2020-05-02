<template>
  <div id="actors">
    <div class="banner">
      <h1>{{ title }}</h1>
    </div>
    <div class="wrapper">
      <p>
        Aquí puedes ver el detalle de todos y cada uno de los actores que aparecen en la serie.
      </p>
      <el-row
        id="actors-list"
        :gutter="gutter"
      >
        <el-col
          v-for="actor in actors"
          :key="actor.id"
          class="actor-col"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
        >
          <ActorCard :actor="actor" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import { Loading } from 'element-ui';
import ActorCard from '../../components/ActorCard.vue';

import utils from '../../utils';

export default {
  name: 'Actors',
  components: {
    ActorCard,
  },
  nuxtI18n: {
    paths: {
      es: '/actores',
    },
  },
  async fetch() {
    if (process.browser) {
      this.loadingInstance = Loading.service({
        target: utils.LOADING.QUERY_SELECTOR,
        background: 'rgba(0, 0, 0, 0.8)',
      });
    }

    this.$store.commit('configs/setCurrentTitle', this.$t('VIEWS.ACTORS.TITLE'));

    return Promise.all([
      this.$store.dispatch('seo-configs/getSeoConfigBySlug', {
        slug: 'actors',
      }),
      this.$store.dispatch('actors/getAll'),
    ])
      .finally(() => {
        if (this.loadingInstance) this.loadingInstance.close();
      });
  },
  data() {
    return {
      gutter: utils.VIEWS.ACTORS.GUTTER.DEFAULT,
    };
  },
  computed: {
    ...mapState('actors', {
      actors: 'all',
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
    this.$store.dispatch('actors/destroyAll');
  },
  methods: {
    handleResize() {
      if (utils.isMobile()) {
        this.gutter = utils.VIEWS.ACTORS.GUTTER.MOBILE;
      } else {
        this.gutter = utils.VIEWS.ACTORS.GUTTER.DEFAULT;
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

<style lang="scss">

#actors {
  #actors-list{
    .actor-col{
      padding: 6px;
    }
  }
}
</style>
