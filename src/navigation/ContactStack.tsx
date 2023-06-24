import { createStackNavigator } from '@react-navigation/stack'

import { useTranslation } from '~hooks'
import { Header } from '~navigation/Header'
import { optionForScreen } from '~navigation/HeaderGlobalStyles'
import { ContactScreen } from '~screens'

const { Navigator, Screen } = createStackNavigator()

export const ContactStack = (): JSX.Element => {
  const { t } = useTranslation()
  return (
    <Navigator screenOptions={optionForScreen}>
      <Screen
        name="ContactStack"
        options={({ navigation }) => ({
          headerTitle: () => (
            <Header navigation={navigation} title={t('navigation.screen_titles.contact')} />
          ),
        })}
        component={ContactScreen}
      />
    </Navigator>
  )
}
