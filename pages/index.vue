<template>
  <div id="home">
    <div class="banner">
      <h1>{{ title }}</h1>
    </div>
    <div class="wrapper">
      <div id="welcome">
        <div id="welcome-text" v-html="welcomeText" />
        <div id="welcome-image">
          <img src="/images/home.jpg">
        </div>
      </div>

      <el-row
        :gutter="20"
      >
        <el-col
          :xs="24"
        >
          <div id="adsense">
            <adsbygoogle
              data-ad-slot="4044329554"
              data-ad-format="fluid"
              data-full-width-responsive="true"
            />
          </div>
        </el-col>
        <el-col
          :xs="24"
          :sm="8"
        >
          <div id="characters">
            <h2 id="characters-title">
              {{ charactersTitle }}
            </h2>
            <div id="characters-text" v-html="charactersText" />
          </div>
        </el-col>
        <el-col
          :xs="24"
          :sm="8"
        >
          <div id="donate">
            <h2 id="donate-title">
              {{ donateTitle }}
            </h2>
            <div id="donate-text" v-html="donateText" />
            <div id="donate-form">
              <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_s-xclick">
                <input type="hidden" name="hosted_button_id" value="WHKBEMGHF6Z6E">
                <input
                  type="image"
                  src="https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donateCC_LG.gif"
                  border="0"
                  name="submit"
                  title="Donar mediante PayPal"
                  alt="Botón para donar mediante PayPal"
                >
              </form>
            </div>
          </div>
        </el-col>
        <el-col
          :xs="24"
          :sm="8"
        >
          <div id="chapters">
            <h2 id="chapters-title">
              {{ chaptersTitle }}
            </h2>
            <div id="chapters-text" v-html="chaptersText" />
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col
          :xs="24"
        >
          <div id="references">
            <h2 id="references-title">
              {{ referencesTitle }}
            </h2>
            <div id="references-text" v-html="referencesText" />
          </div>
        </el-col>
      </el-row>
      <el-row
        id="references-list"
        :gutter="20"
      >
        <el-col
          class="reference-item"
          :xs="24"
          :lg="12"
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>ANHQV.ES</span>
              <div class="links">
                <a href="https://anhqv.es" target="_blank"><font-awesome-icon icon="link" /></a>
                <a href="https://www.youtube.com/user/juancuestanhqv2014" target="_blank"><font-awesome-icon :icon="['fab', 'youtube']" /></a>
              </div>
            </div>
            <div>
              <p>
                {{ anhqvText }}
              </p>
            </div>
          </el-card>
        </el-col>
        <el-col
          class="reference-item"
          :xs="24"
          :lg="12"
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>EscenasANHQV</span>
              <div class="links">
                <a href="https://twitter.com/EscenasANHQV" target="_blank"><font-awesome-icon :icon="['fab', 'twitter']" /></a>
                <a href="https://www.instagram.com/escenas.anhqv/" target="_blank"><font-awesome-icon :icon="['fab', 'instagram']" /></a>
              </div>
            </div>
            <div>
              <p>
                {{ escenasAnhqvText }}
              </p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {},
  async fetch() {
    this.$store.commit('configs/setCurrentTitle', this.$t('VIEWS.HOME.TITLE'));

    return this.$store.dispatch('seo-configs/getSeoConfigBySlug', {
      slug: 'home',
    });
  },
  data() {
    return {
      welcomeText: this.$t('VIEWS.HOME.WELCOME.TEXT'),
      charactersTitle: this.$t('VIEWS.HOME.CHARACTERS.TITLE'),
      charactersText: this.$t('VIEWS.HOME.CHARACTERS.TEXT'),
      donateTitle: this.$t('VIEWS.HOME.DONATE.TITLE'),
      donateText: this.$t('VIEWS.HOME.DONATE.TEXT'),
      chaptersTitle: this.$t('VIEWS.HOME.CHAPTERS.TITLE'),
      chaptersText: this.$t('VIEWS.HOME.CHAPTERS.TEXT'),
      referencesTitle: this.$t('VIEWS.HOME.REFERENCES.TITLE'),
      referencesText: this.$t('VIEWS.HOME.REFERENCES.TEXT'),
      anhqvText: this.$t('VIEWS.HOME.REFERENCES.LIST.ANHQV.TEXT'),
      escenasAnhqvText: this.$t('VIEWS.HOME.REFERENCES.LIST.ESCENASANHQV.TEXT'),
    };
  },
  computed: {
    ...mapState('configs', {
      title: 'currentTitle',
    }),
    ...mapState('seo-configs', {
      seoConfig: 'currentSeoConfig',
    }),
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

#home {
  #welcome{
    #welcome-text{
      text-align: justify;
    }

    #welcome-image{
      img {
        margin: auto;
        display: block;
        max-width: 100%;
      }
    }
  }

  #characters{
    #characters-title{
      color: $color-text-blue;
    }

    #characters-text{
      text-align: justify;
    }
  }

  #donate{
    #donate-title {
      color: $color-brand-paypal;
    }

    #donate-text{
      text-align: justify;
    }

    #donate-form {
      text-align: center;
    }
  }

  #chapters{
    #chapters-title{
      color: $color-text-blue;
    }

    #chapters-text{
      text-align: justify;
    }
  }

  #references{
    #references-title{
      color: $color-text-green;
    }
  }

  #references-list{
    .reference-item{
      &:not(:first-child){
        margin-top: 15px;

        @media screen and (min-width: $lg-desktop-min-width) {
          margin-top: 0;
        }
      }

      .links{
        float: right;

        a{
          &:not(:first-child){
            margin-left: 7px;
          }
        }
      }
    }

    .fa-link{
      color: $color-text-gray;
    }

    .fa-youtube{
      color: $color-brand-youtube;
    }

    .fa-twitter{
      color: $color-brand-twitter;
    }

    .fa-instagram{
      color: $color-brand-instagram;
    }
  }
}
</style>
