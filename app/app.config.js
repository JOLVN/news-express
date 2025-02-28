export default {
  expo: {
    name: "Xpress",
    slug: "xpress-news",
    version: "1.0.1",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: false,
      bundleIdentifier: "fr.jolan.xpress"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#010121"
      },
      package: "fr.jolan.xpress"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-screen.png",
          resizeMode: "contain",
          backgroundColor: "#F1F2FF",
          dark: {
            image: "./assets/images/splash-screen.png",
            backgroundColor: "#010121"
          }
        }
      ],
      "expo-font"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "c6013862-def3-440f-87a5-a1911b08d9f0"
      },
      personalApiKey: process.env.PERSONAL_API_KEY,
      googleTTSApiKey: process.env.GOOGLE_TTS_API_KEY,
      elevenLabsApiKey: process.env.ELEVENLABS_API_KEY,
      revenueCatIosApiKey: process.env.REVENUE_CAT_IOS_API_KEY,
      revenueCatAndroidApiKey: process.env.REVENUE_CAT_ANDROID_API_KEY
    }
  }
};