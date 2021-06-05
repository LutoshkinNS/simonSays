module.exports = {
  publicPath: '/simonSays/',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/style.sass"',
      },
    },
  },
};
