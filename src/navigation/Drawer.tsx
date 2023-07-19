import { createDrawerNavigator } from '@react-navigation/drawer'
import { useCallback } from 'react'

import { CustomDrawer } from '~components/CustomDrawer'
import { SCREEN } from '~constants'
import { Header } from '~navigation/Header'
import { optionForScreen } from '~navigation/HeaderGlobalStyles'
import { PhoneRegisterStack } from '~navigation/PhoneRegisterStack'
import { RootNavigator } from '~navigation/RootNavigator'
import { Verification } from '~navigation/Verification'
import { CategoryInnerScreen, SignInScreen } from '~screens'
import { CategoryDetailScreen } from '~screens/CategoryDetailScreen'
import { CategorySearchScreen } from '~screens/CategorySearchScreen'
import { MenuScreen } from '~screens/MenuScreen'
import { ProductInnerScreen } from '~screens/ProductInnerScreen'

const locale = 'ru'

const Drawer = createDrawerNavigator()
export const DrawerNavigator = () => {
  const renderCustomDrawerContent = useCallback((props: object) => {
    return <CustomDrawer {...props} />
  }, [])
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={renderCustomDrawerContent}
      screenOptions={optionForScreen}
    >
      <Drawer.Screen
        name={SCREEN.DRAWER_ROOT}
        component={RootNavigator}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={SCREEN.STACK_CATEGORY_INNER}
        component={CategoryInnerScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={route.params.name[locale]} />,
          headerLeft: () => null,
        })}
      />
      <Drawer.Screen
        name={SCREEN.STACK_CATEGORY_DETAIL}
        component={CategoryDetailScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={route.params.name[locale]} />,
          headerLeft: () => null,
        })}
      />

      <Drawer.Screen
        name={SCREEN.STACK_PRODUCT_INNER}
        component={ProductInnerScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={route.params.name} />,
          headerLeft: () => null,
        })}
      />
      <Drawer.Screen
        name={SCREEN.PHONE_REGISTER}
        component={PhoneRegisterStack}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={route.params.title} />,
          headerLeft: () => null,
        })}
      />
      <Drawer.Screen
        name={SCREEN.STACK_VERIFICATION}
        component={Verification}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={route.params.title} />,
          headerLeft: () => null,
        })}
      />
      <Drawer.Screen
        name={SCREEN.STACK_SIGN_IN}
        component={SignInScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={'signIn'} />,
          headerLeft: () => null,
        })}
      />
      <Drawer.Screen
        name={SCREEN.DRAWER_MENU}
        component={MenuScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={route.params.title} />,
          headerLeft: () => null,
        })}
      />
      <Drawer.Screen
        name={SCREEN.STACK_CATEGORY_SEARCH}
        component={CategorySearchScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title="search results" />,
          headerLeft: () => null,
        })}
      />
    </Drawer.Navigator>
  )
}
