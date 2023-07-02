import { createStackNavigator } from '@react-navigation/stack'

import { SCREEN } from '~constants'
import { useTranslation } from '~hooks'
import { Header } from '~navigation/Header'
import { optionForScreen } from '~navigation/HeaderGlobalStyles'
import { CategoryInnerScreen, CategoryScreen } from '~screens'
import { CategoryDetailScreen } from '~screens/CategoryDetailScreen'
import { ProductInnerScreen } from '~screens/ProductInnerScreen'

const { Navigator, Screen } = createStackNavigator()
const locale = 'ru'

/*FIXME find the exact type for routes and then replace them*/
export const CategoryStack = (): JSX.Element => {
  const { t } = useTranslation()
  return (
    <Navigator screenOptions={optionForScreen}>
      <Screen
        name={SCREEN.STACK_CATEGORY}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Header navigation={navigation} title={t('navigation.screen_titles.category')} />
          ),
        })}
        component={CategoryScreen}
      />
      <Screen
        name={SCREEN.STACK_CATEGORY_INNER}
        options={({ navigation, route }) => ({
          headerTitle: () => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <Header navigation={navigation} title={route.params.name[locale]} />
          ),
          headerLeft: () => null,
        })}
        component={CategoryInnerScreen}
      />
      <Screen
        name={SCREEN.STACK_CATEGORY_DETAIL}
        options={({ navigation, route }) => ({
          headerTitle: () => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <Header navigation={navigation} title={route.params.name[locale]} />
          ),
          headerLeft: () => null,
        })}
        component={CategoryDetailScreen}
      />
      <Screen
        name={SCREEN.STACK_PRODUCT_INNER}
        options={({ navigation, route }) => ({
          headerTitle: () => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <Header navigation={navigation} title={route.params.name} />
          ),
          headerLeft: () => null,
        })}
        component={ProductInnerScreen}
      />
    </Navigator>
  )
}
