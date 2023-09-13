import { ExpoConfig, ConfigContext } from '@expo/config'

export default ({ config }: ConfigContext): Partial<ExpoConfig> => {
  return {
    ...config,
    extra: {
      universalLinks: [],
      eas: {
        projectId: '1233bed6-82c7-4703-a4cf-9732a305a7c1',
      },
    },
    updates: {
      url: 'https://u.expo.dev/1233bed6-82c7-4703-a4cf-9732a305a7c1',
    },
    runtimeVersion: {
      policy: 'sdkVersion',
    },

    android: {
      package: 'com.redro.app',
    },
  }
}
