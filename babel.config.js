module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./app"],
        alias: {
          "@components": "./app/components",
          "@api": "./app/api",
          "@actions": "./app/actions",
          "@reducers": "./app/reducers",
          "@utils": "./app/utils",
          "@theme": "./app/res/Theme",
          "@images": "./app/res/images",
          "@strings": "./app/assets/Strings"
        },
      },
    ],
  ]
};
