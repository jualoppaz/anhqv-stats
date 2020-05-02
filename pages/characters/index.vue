<template>
  <div id="characters">
    <div class="banner">
      <h1>{{ title }}</h1>
    </div>
    <div class="wrapper">
      <p>
        Aquí puedes ver el detalle de todos y cada uno de los personajes que aparecen en la serie.
      </p>
      <el-row
        id="characters-list"
        :gutter="gutter"
      >
        <el-col
          v-for="character in characters"
          :key="character.id"
          class="character-col"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
        >
          <CharacterCard :character="character" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import { Loading } from 'element-ui';
import CharacterCard from '../../components/CharacterCard.vue';

import utils from '../../utils';

export default {
  name: 'Characters',
  components: {
    CharacterCard,
  },
  nuxtI18n: {
    paths: {
      es: '/personajes',
    },
  },
  async fetch() {
    if (process.browser) {
      this.loadingInstance = Loading.service({
        target: utils.LOADING.QUERY_SELECTOR,
        background: 'rgba(0, 0, 0, 0.8)',
      });
    }

    return Promise.all([
      this.$store.dispatch('seo-configs/getSeoConfigBySlug', {
        slug: 'characters',
      }),
      this.$store.dispatch('characters/getAll'),
    ])
      .finally(() => {
        if (this.loadingInstance) this.loadingInstance.close();
      });
  },
  data() {
    return {
      gutter: utils.VIEWS.CHARACTERS.GUTTER.DEFAULT,
    };
  },
  computed: {
    ...mapState('characters', {
      characters: 'all',
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

    this.$store.commit('configs/setCurrentTitle', this.$t('VIEWS.CHARACTERS.TITLE'));
  },
  beforeDestroy() {
    if (this.loadingInstance) this.loadingInstance.close();
    window.removeEventListener('resize', this.handleResize);
    this.$store.dispatch('characters/destroyAll');
  },
  methods: {
    handleResize() {
      if (utils.isMobile()) {
        this.gutter = utils.VIEWS.CHARACTERS.GUTTER.MOBILE;
      } else {
        this.gutter = utils.VIEWS.CHARACTERS.GUTTER.DEFAULT;
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
    if (seoConfig.description) {
      obj.meta.push({
        hid: 'description',
        name: 'description',
        content: seoConfig.description,
      });
    }
    if (seoConfig.og_title) {
      obj.meta.push({
        hid: 'og:title',
        name: 'og:title',
        content: seoConfig.og_title,
      });
    }
    if (seoConfig.og_type) {
      obj.meta.push({
        hid: 'og:type',
        name: 'og:type',
        content: seoConfig.og_type,
      });
    }
    if (seoConfig.og_image) {
      obj.meta.push({
        hid: 'og:image',
        name: 'og:image',
        content: seoConfig.og_image,
      });
    }
    if (seoConfig.og_url) {
      obj.meta.push({
        hid: 'og:url',
        name: 'og:url',
        content: seoConfig.og_url,
      });
    }
    if (seoConfig.og_description) {
      obj.meta.push({
        hid: 'og:description',
        name: 'og:description',
        content: seoConfig.og_description,
      });
    }

    if (seoConfig.canonical_url) {
      obj.link.push({
        rel: 'canonical',
        href: seoConfig.canonical_url,
      });
    }

    return obj;
  },
};
</script>

<style lang="scss">

#characters {
  #characters-list{
    .character-col{
      padding: 6px;
    }
  }
}
</style>
