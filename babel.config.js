module.exports = function(api) {
  api.cache(true);
  return {
    pluging: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "~": "./src"
          }
        }
      ]
    ],
    presets: ["babel-preset-expo"]
  };
};
