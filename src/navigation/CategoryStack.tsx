import { createStackNavigator } from '@react-navigation/stack'

import { useTranslation } from '~hooks'
import { Header } from '~navigation/Header'
import { optionForScreen } from '~navigation/HeaderGlobalStyles'
import { CategoryInnerScreen, CategoryScreen } from '~screens'

const { Navigator, Screen } = createStackNavigator()

export const CategoryStack = (): JSX.Element => {
  const { t } = useTranslation()
  return (
    <Navigator screenOptions={optionForScreen}>
      <Screen
        name="CategoryStack"
        options={({ navigation }) => ({
          headerTitle: () => (
            <Header navigation={navigation} title={t('navigation.screen_titles.category')} />
          ),
        })}
        component={CategoryScreen}
      />
      <Screen
        name="CategoryInnerScreen"
        options={({ navigation }) => ({
          headerTitle: () => (
            <Header navigation={navigation} title={t('navigation.screen_titles.category')} />
          ),
        })}
        component={CategoryInnerScreen}
      />
    </Navigator>
  )
}
