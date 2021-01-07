const isTest = String(process.env.NODE_ENV) === "test";
const modules = isTest ? "commonjs" : false;

module.exports = {
  presets: [
    "@babel/preset-react",
    ["@babel/preset-env", { targets: "> 0.25%, not dead", modules }],
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-object-rest-spread",
    ["@babel/plugin-transform-runtime", { helpers: true }],
    "@babel/plugin-proposal-class-properties",
  ],
};
