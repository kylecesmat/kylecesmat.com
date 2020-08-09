const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  basePath: isDev ? '' : '/kylecesmat.com',
  assetPrefix: isDev ? '' : '/kylecesmat.com/',
};
