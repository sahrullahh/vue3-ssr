const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const nodeExternal = require("webpack-node-externals");

module.exports = {
  chainWebpack: (webpackConfig) => {
    if (!process.env.SSR) return;

    webpackConfig.entry("app").clear().add("./src/main.server.js");

    webpackConfig.target("node");
    webpackConfig.output.libraryTarget("commonjs");

    webpackConfig.plugin("manifest").use(
      new WebpackManifestPlugin({
        fileName: "ssr-manifest.json",
      })
    );

    webpackConfig.externals(nodeExternal({ allowlist: /\.(css|vue)$/ }));

    webpackConfig.optimization.splitChunks(false).minimize(false);

    webpackConfig.plugins.delete("hmr");
    webpackConfig.plugins.delete("preload");
    webpackConfig.plugins.delete("prefetch");
    webpackConfig.plugins.delete("progress");
    webpackConfig.plugins.delete("friendly-errors");
  },
};
