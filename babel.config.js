module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module:react-native-dotenv", {
      "moduleName": "@env",
      "path": ".env",
      "blocklist": null,
      "allowlist": null,
      "safe": false,
      "allowUndefined": true
    
  }],
    "@babel/plugin-transform-private-methods",
    "@babel/plugin-transform-class-properties",
    "@babel/plugin-transform-private-property-in-object"
  ]

};
