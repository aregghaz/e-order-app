import { createStackNavigator } from '@react-navigation/stack'

import { SCREEN } from '~constants'
import { useTranslation } from '~hooks'
import { Header } from '~navigation/Header'
import { optionForScreen } from '~navigation/HeaderGlobalStyles'
import { CategoryInnerScreen, CategoryScreen } from '~screens'
import { CategoryDetailScreen } from '~screens/CategoryDetailScreen'
// import { CategorySearchScreen } from '~screens/CategorySearchScreen'

const { Navigator, Screen } = createStackNavigator()
const locale = 'ru'

/*FIXME find the exact type for routes and then replace them*/
export const CategoryStack = (): JSX.Element => {
  const { t } = useTranslation()
  return (
    <Navigator screenOptions={optionForScreen}>
      <Screen
        name={SCREEN.STACK_CATEGORY}
        component={CategoryScreen}
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header navigation={navigation} title={t('navigation.screen_titles.category')} />
          ),
        })}
      />
      <Screen
        name={SCREEN.STACK_CATEGORY_INNER}
        component={CategoryInnerScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={route.params.name[locale]} />,
          headerLeft: () => null,
        })}
      />
      <Screen
        name={SCREEN.STACK_CATEGORY_DETAIL}
        component={CategoryDetailScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={route.params.name[locale]} />,
          headerLeft: () => null,
        })}
      />
    </Navigator>
  )
}
