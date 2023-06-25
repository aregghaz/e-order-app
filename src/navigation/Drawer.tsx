import { createDrawerNavigator } from '@react-navigation/drawer'
import { useCallback } from 'react'

import { CustomDrawer } from '~components/CustomDrawer'
import { BottomTabNavigator } from '~navigation/BottomTabNavigator'

const Drawer = createDrawerNavigator()
export const DrawerNavigator = () => {
  const renderCustomDrawerContent = useCallback((props: object) => {
    return <CustomDrawer {...props} />
  }, [])
  return (
    <Drawer.Navigator useLegacyImplementation drawerContent={renderCustomDrawerContent}>
      <Drawer.Screen
        name="Avatar"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  )
}
