import { createDrawerNavigator } from '@react-navigation/drawer'

import { CustomDrawer } from '~components/CustomDrawer'
import { BottomTabNavigator } from '~navigation/BottomTabNavigator'

const Drawer = createDrawerNavigator()
export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Avatar"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  )
}
