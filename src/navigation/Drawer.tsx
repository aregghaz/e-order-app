import { createDrawerNavigator } from '@react-navigation/drawer'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from 'react-native'

import { PhoneRegisterStack } from './PhoneRegisterStack'
import { Verification } from './Verification'

import { CustomDrawer } from '~components/CustomDrawer'
import { SCREEN } from '~constants'
import { ForgotPasswordStack } from '~navigation/ForgotPasswordStack'
import { Header } from '~navigation/Header'
import { optionForScreen } from '~navigation/HeaderGlobalStyles'
import { PasswordStack } from '~navigation/PasswordStack'
import { RootNavigator } from '~navigation/RootNavigator'
import { NotFoundScreen, SignInScreen } from '~screens'
import { ProductInnerScreen } from '~screens/ProductInnerScreen'
import { SupplierSearch } from '~screens/SupplierSearch'
import { WishlistScreen } from '~screens/WishlistScreen'
import { CheckOutScreen } from '~screens/cart/CheckOutScreen'
import { ShopCartScreen } from '~screens/cart/ShopCartScreen'
import { CategoryDetailScreen, CategoryInnerScreen, CategorySearchScreen } from '~screens/category'
import {
  OrderFailScreen,
  OrderInnerScreen,
  OrderListScreen,
  OrderSuccessScreen,
} from '~screens/order'
import { AddPartnershipScreen } from '~screens/partners/AddPartnershipScreen'
import { PartnershipScreen } from '~screens/partners/PartnershipScreen'
import { ChangePasswordScreen, ProfileEditScreen } from '~screens/profile'
import { CreateStoreScreen, ShopListScreen, UpdateShopScreen } from '~screens/shops'

const locale = 'ru'

const Drawer = createDrawerNavigator()
export const DrawerNavigator = () => {
  const { t } = useTranslation()
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
        name={SCREEN.STACK_WISHLIST}
        component={WishlistScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={t('wishlist')} />,
          headerLeft: () => null,
        })}
      />
      <Drawer.Screen
        name={SCREEN.STACK_SHOP_CART}
        component={ShopCartScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={t('shop.shopping_cart')} />,
          headerLeft: () => null,
        })}
      />
      <Drawer.Screen
        name={SCREEN.CHECKOUT}
        component={CheckOutScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={t('checkout_title')} />,
          headerLeft: () => null,
        })}
      />
      <Drawer.Screen
        name={SCREEN.STACK_SHOP_LIST}
        component={ShopListScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={t('menu.shop_list')} />,
          headerLeft: () => null,
        })}
      />
      <Drawer.Screen
        name={SCREEN.STACK_CREATE_STORE}
        component={CreateStoreScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={'Create Store'} />,
          headerLeft: () => null,
        })}
      />
      <Drawer.Screen
        name={SCREEN.STACK_UPDATE_STORE}
        component={UpdateShopScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={t('update_store')} />,
          headerLeft: () => null,
        })}
      />

      <Drawer.Screen
        name={SCREEN.STACK_SIGN_IN}
        component={SignInScreen}
        options={({ navigation, route }: any) => ({
          // headerTitle: () => <Header navigation={navigation} title={'login'} />,
          headerTitle: () => <Text>Login</Text>,
          // headerLeft: () => null,
        })}
      />
      <Drawer.Screen
        name={SCREEN.STACK_FORGOT_PASSWORD}
        component={ForgotPasswordStack}
        options={({ navigation, route }: any) => ({
          // headerTitle: () => <Header navigation={navigation} title={'login'} />,
          headerTitle: () => <Text>{t('forgot_password__alt')}</Text>,
          // headerLeft: () => null,
        })}
      />
      <Drawer.Screen
        name={SCREEN.STACK_PASSWORD}
        component={PasswordStack}
        options={({ navigation, route }: any) => {
          console.log(route.params, 'route params!!!!')
          return {
            // headerTitle: () => <Header navigation={navigation} title={'login'} />,
            headerTitle: () => <Text>{t('password.changePassword')}</Text>,
            // headerLeft: () => null,
          }
        }}
      />
      <Drawer.Screen
        name={SCREEN.PHONE_REGISTER}
        component={PhoneRegisterStack}
        options={({ navigation, route }: any) => ({
          // headerTitle: () => <Header navigation={navigation} title={'login'} />,
          headerTitle: () => <Text>{t('registration')}</Text>,
          // headerLeft: () => null,
        })}
      />
      {/*<Drawer.Screen*/}
      {/*  name={SCREEN.DRAWER_MENU}*/}
      {/*  component={MenuScreen}*/}
      {/*  options={({ navigation, route }: any) => ({*/}
      {/*    headerTitle: () => <Header navigation={navigation} title={route.params.title} />,*/}
      {/*    headerLeft: () => null,*/}
      {/*  })}*/}
      {/*/>*/}
      <Drawer.Screen
        name={SCREEN.STACK_NOT_FOUND}
        component={NotFoundScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => (
            <Header navigation={navigation} title={t('navigation.screen_titles.not_found')} />
          ),
          headerLeft: () => null,
        })}
      />
      <Drawer.Screen
        name={SCREEN.STACK_VERIFICATION}
        component={Verification}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={t('verification')} />,
          headerLeft: () => null,
        })}
      />
      <Drawer.Screen
        name={SCREEN.STACK_CATEGORY_SEARCH}
        component={CategorySearchScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={t('common.search')} />,
          headerLeft: () => null,
        })}
      />
      <Drawer.Screen
        name={SCREEN.STACK_ORDER_LIST}
        component={OrderListScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={t('menu.order_list')} />,
          headerLeft: () => null,
        })}
      />
      <Drawer.Screen
        name={SCREEN.STACK_ORDER_INNER}
        component={OrderInnerScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={t('order_details')} />,
          headerLeft: () => null,
        })}
      />
      <Drawer.Screen
        name={SCREEN.STACK_ORDER_SUCCESS}
        component={OrderSuccessScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={'Order Success'} />,
          headerShown: false,
          headerLeft: () => null,
        })}
      />
      <Drawer.Screen
        name={SCREEN.STACK_ORDER_FAIL}
        component={OrderFailScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={'Order Failed'} />,
          headerLeft: () => null,
          headerShown: false,
        })}
      />
      <Drawer.Screen
        name={SCREEN.PARTNER_SHIP}
        component={PartnershipScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={t('menu.partners')} />,
          headerLeft: () => null,
        })}
      />
      <Drawer.Screen
        name={SCREEN.ADD_PARTNERSHIP}
        component={AddPartnershipScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={'Add Partners'} />,
          headerLeft: () => null,
        })}
      />
      <Drawer.Screen
        name={SCREEN.PROFILE_EDIT}
        component={ProfileEditScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={t('menu.edit_profile')} />,
          headerLeft: () => null,
        })}
      />
      <Drawer.Screen
        name={SCREEN.CHANGE_PASSWORD}
        component={ChangePasswordScreen}
        options={({ navigation, route }: any) => ({
          headerTitle: () => <Header navigation={navigation} title={t('menu.change_password')} />,
          headerLeft: () => null,
        })}
      />
      <Drawer.Screen
        name={SCREEN.SUPPLIER}
        component={SupplierSearch}
        options={({ navigation, route }: any) => ({
          headerTitle: () => (
            <Header navigation={navigation} title={t('navigation.screen_titles.supplier')} />
          ),
          headerLeft: () => null,
        })}
      />
    </Drawer.Navigator>
  )
}
