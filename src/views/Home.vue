<template>
  <div id="home">
    <p>
      Bienvenido a la Web de la Comunidad más loca de la TV.
    </p>
    <div id="donate">
      <h2 id="donate-title">{{ donateTitle }}</h2>
      <p>{{ donateText }}</p>
      <div id="donate-form">
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="WHKBEMGHF6Z6E" />
          <input type="image" src="https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="Donar mediante PayPal" alt="Botón para donar mediante PayPal" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      donateTitle: this.$t('VIEWS.HOME.DONATE.TITLE'),
      donateText: this.$t('VIEWS.HOME.DONATE.TEXT'),
    };
  },
  created() {},
};
</script>

<style lang="scss">

#home {
  #donate{
    #donate-title {
      color: $color-brand-paypal;
    }

    #donate-form {
      text-align: center;
    }
  }
}
</style>
