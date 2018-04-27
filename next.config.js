/* eslint-disable */
module.exports = {
  webpack: (config, { dev }) => {
    // For the development version, we'll use React.
    // Because, it support react hot loading and so on.
    if (dev) {
      return config;
    }

    config.resolve.alias = {
      react: "preact-compat/dist/preact-compat",
      "react-dom": "preact-compat/dist/preact-compat"
    };

    return config;
  },
  exportPathMap: () => ({
    "/": { page: "/" },
    "/contact": { page: "/contact" },
    "/writing": { page: "/writing" },
    "/writing/2016/building-a-static-react-js-site": {
      page: "/writing/2016/building-a-static-react-js-site"
    },
    "/writing/2017/why-react-wins": { page: "/writing/2017/why-react-wins" },
    "/writing/2017/pattern-libraries": { page: "/writing/2017/pattern-libraries" }
  })
};
