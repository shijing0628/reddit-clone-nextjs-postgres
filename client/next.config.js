// Can't import SVG into Next.js: https://stackoverflow.com/questions/55175445/cant-import-svg-into-next-js

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
