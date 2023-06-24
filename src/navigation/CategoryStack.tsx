import { createStackNavigator } from '@react-navigation/stack'

import { useTranslation } from '~hooks'
import { ExamplesScreen } from '~screens'

const { Navigator, Screen } = createStackNavigator()

export const CategoryStack = (): JSX.Element => {
  const { t } = useTranslation()
  return (
    <Navigator>
      <Screen
        name="Category"
        options={{ title: t('navigation.screen_titles.category') }}
        component={ExamplesScreen}
      />
    </Navigator>
  )
}
