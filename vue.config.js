module.exports = {
  devServer: {
    writeToDisk: true,
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');

    config.plugin('preload').tap((options) => {
      // eslint-disable-next-line no-param-reassign
      options[0].include = 'allChunks';
      return options;
    });
  },
  pluginOptions: {
    i18n: {
      locale: 'es',
      fallbackLocale: 'es',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/styles/variables.scss";',
      },
    },
  },
};
