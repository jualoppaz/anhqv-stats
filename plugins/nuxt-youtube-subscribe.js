export default (
  // eslint-disable-next-line no-unused-vars
  { app: { head } }, inject,
) => {
  head.script.push({
    src: 'https://apis.google.com/js/platform.js',
    async: true,
    defer: true,
  });
};
