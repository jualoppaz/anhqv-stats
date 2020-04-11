<template>
  <div id="home">
    <div id="welcome">
      <div id="welcome-text" v-html="welcomeText"></div>
      <div id="welcome-image">
        <img src="/images/home.jpg">
      </div>
    </div>

    <el-row
      :gutter="20">
      <el-col
        :xs="24">
        <div id="adsense">
          <Adsense
            data-ad-client="ca-pub-2309187828170787"
            data-ad-slot="4044329554"
            data-ad-format="fluid"
            data-full-width-responsive="true">
          </Adsense>
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="8">
        <div id="characters">
          <h2 id="characters-title">{{ charactersTitle }}</h2>
          <div id="characters-text" v-html="charactersText"></div>
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="8">
        <div id="donate">
          <h2 id="donate-title">{{ donateTitle }}</h2>
          <div id="donate-text" v-html="donateText"></div>
          <div id="donate-form">
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input type="hidden" name="hosted_button_id" value="WHKBEMGHF6Z6E" />
              <input type="image" src="https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="Donar mediante PayPal" alt="Botón para donar mediante PayPal" />
            </form>
          </div>
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="8">
        <div id="chapters">
          <h2 id="chapters-title">{{ chaptersTitle }}</h2>
          <div id="chapters-text" v-html="chaptersText"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      welcomeText: this.$t('VIEWS.HOME.WELCOME.TEXT'),
      charactersTitle: this.$t('VIEWS.HOME.CHARACTERS.TITLE'),
      charactersText: this.$t('VIEWS.HOME.CHARACTERS.TEXT'),
      donateTitle: this.$t('VIEWS.HOME.DONATE.TITLE'),
      donateText: this.$t('VIEWS.HOME.DONATE.TEXT'),
      chaptersTitle: this.$t('VIEWS.HOME.CHAPTERS.TITLE'),
      chaptersText: this.$t('VIEWS.HOME.CHAPTERS.TEXT'),
    };
  },
  created() {},
};
</script>

<style lang="scss">

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
}
</style>
