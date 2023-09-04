const { defineConfig } = require("@vue/cli-service");

if (process.env.NODE_ENV === "production") {
  module.exports = defineConfig({
    assetsDir: "./lib",
    outputDir: "./lib",
    filenameHashing: false,
    css: {
      extract: false,
    },
    configureWebpack: {
      optimization: {
        splitChunks: false,
      },
    },
    chainWebpack: (config) => {
      config.plugins.delete("html");
      config.plugins.delete("preload");
      config.plugins.delete("prefetch");
    },
  });
} else {
  module.exports = {};
}
