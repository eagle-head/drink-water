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
          "@/tests/*": "./src/tests/*",
          "@/hooks": "./src/hooks",
          "@/utils": "./src/utils",
          "@/themes": "./src/themes",
          "@/routes": "./src/routes",
          "@/assets": "./src/assets",
          "@/stores": "./src/stores",
          "@/storage": "./src/storage",
          "@/features": "./src/features",
          "@/contexts": "./src/contexts",
          "@/providers": "./src/providers",
          "@/components": "./src/components",
        },
      },
    ],
  ],
};
