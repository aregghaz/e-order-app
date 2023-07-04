import { createDrawerNavigator } from '@react-navigation/drawer'
import { useCallback } from 'react'

import { CustomDrawer } from '~components/CustomDrawer'
// import { BottomTabNavigator } from '~navigation/BottomTabNavigator'
import { SCREEN } from '~constants'
import { CategoryStack } from '~navigation/CategoryStack'
import { Header } from '~navigation/Header'
import { RootNavigator } from '~navigation/RootNavigator'
import { MenuScreen } from '~screens/MenuScreen'
import { ProductInnerScreen } from '~screens/ProductInnerScreen'

const Drawer = createDrawerNavigator()
export const DrawerNavigator = () => {
  const renderCustomDrawerContent = useCallback((props: object) => {
    return <CustomDrawer {...props} />
  }, [])
  return (
    <Drawer.Navigator useLegacyImplementation drawerContent={renderCustomDrawerContent}>
      <Drawer.Screen name="Root" component={RootNavigator} options={{ headerShown: false }} />
      <Drawer.Screen
        name="CategoryInnerPage"
        component={CategoryStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="Home" component={RootNavigator} options={{ headerShown: false }} />
      <Drawer.Screen
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
      <Drawer.Screen
        name="Menu"
        component={MenuScreen}
        options={({ navigation, route }) => ({
          headerTitle: () => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <Header navigation={navigation} title={route.params.title} />
          ),
          headerLeft: () => null,
        })}
      />
    </Drawer.Navigator>
  )
}
