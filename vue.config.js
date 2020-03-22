module.exports = {
  devServer: {
    writeToDisk: true,
  },
  pluginOptions: {
    i18n: {
      locale: 'es',
      fallbackLocale: 'es',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },
};
