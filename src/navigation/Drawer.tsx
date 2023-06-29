import { createDrawerNavigator } from '@react-navigation/drawer'
import { useCallback } from 'react'

import { CustomDrawer } from '~components/CustomDrawer'
// import { BottomTabNavigator } from '~navigation/BottomTabNavigator'
import { RootNavigator } from '~navigation/RootNavigator'

const Drawer = createDrawerNavigator()
export const DrawerNavigator = () => {
  const renderCustomDrawerContent = useCallback((props: object) => {
    return <CustomDrawer {...props} />
  }, [])
  return (
    <Drawer.Navigator useLegacyImplementation drawerContent={renderCustomDrawerContent}>
      <Drawer.Screen name="Avatar" component={RootNavigator} options={{ headerShown: false }} />
    </Drawer.Navigator>
  )
}
