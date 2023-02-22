module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".android.js", ".android.tsx", ".ios.js", ".ios.tsx"],
        alias: {
          "@/enum": "./src/enum",
          "@/test": "./src/test",
          "@/hooks": "./src/hooks",
          "@/utils": "./src/utils",
          "@/routes": "./src/routes",
          "@/assets": "./src/assets",
          "@/stores": "./src/stores",
          "@/context": "./src/context",
          "@/storage": "./src/storage",
          "@/features": "./src/features",
          "@/providers": "./src/providers",
          "@/components": "./src/components",
        },
      },
    ],
  ],
};
