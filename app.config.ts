import { ExpoConfig, ConfigContext } from '@expo/config'

export default ({ config }: ConfigContext): Partial<ExpoConfig> => {
  return {
    ...config,
    extra: {
      universalLinks: [],
      eas: {
        projectId: '4eb24f80-de3b-497f-9623-3d5eb4ae1d96',
      },
    },
    android: {
      package: 'com.eorderapp.app',
    },
  }
}
