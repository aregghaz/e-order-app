/**
 * was created by tigran at 11.08.23
 */
import { Feather } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { ALERT_TYPE } from 'react-native-alert-notification'

import { SHOP_API } from '~api'
import { CustomButton } from '~components/molecules/CustomButton'
import { SCREEN } from '~constants'
import { notification, setShopId } from '~services/ShopService'
import { customStyles } from '~utils/style_helpers'

export const ShopListScreen: FC = () => {
  const [shops, setShops] = useState<any>([])
  const [load, setLoad] = useState<boolean>(false)
  const navigation = useNavigation<any>()
  const { t } = useTranslation()

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        const shopData = await SHOP_API.getShopsData()
        setShops(shopData.payload.content)
      }
      getData()
    }, [load])
  )

  const handleAddShop = () => {
    navigation.navigate(SCREEN.STACK_CREATE_STORE)
  }

  const handleSetShopId = async (id: string, name: string) => {
    await setShopId(id)
    notification(t('notification.change_shop') + name, ALERT_TYPE.WARNING)
    navigation.navigate(SCREEN.DRAWER_ROOT, {
      screen: SCREEN.STACK_MAIN_TAB,
    })
  }

  const handleUpdate = (id: string) => {
    navigation.navigate(SCREEN.STACK_UPDATE_STORE, id)
  }
  const handleDelete = async (id: string) => {
    await SHOP_API.deleteShop(id)
    setLoad(!load)

    notification('Удалено')
  }

  return (
    <View style={styles.ShopListScreen_wrapper}>
      <ScrollView>
        {shops &&
          shops.map((item: any) => {
            return (
              <Pressable key={item.id} onPress={() => handleSetShopId(item.id, item.shopName)}>
                <View key={item.id} style={styles.box}>
                  <Text style={styles.title}>{item.companyName}</Text>
                  <Text style={styles.text_h2}>{item.shopName}</Text>
                  <View style={styles.hr} />
                  <Text>Delivery Address : {item.deliveryAddress.address_1}</Text>
                  <Text>Phone : {item.deliveryAddress.phoneNumber1}</Text>
                  <View style={styles.buttonsContainer}>
                    <CustomButton
                      title="изменить"
                      width={150}
                      padding={15}
                      border="grey"
                      background="white"
                      color="red"
                      onPress={() => handleUpdate(item.id)}
                    />
                    <CustomButton
                      title="удалить"
                      width={150}
                      padding={15}
                      border="grey"
                      background="white"
                      color="red"
                      onPress={() => handleDelete(item.id)}
                    />
                  </View>
                </View>
              </Pressable>
            )
          })}
      </ScrollView>
      <View style={styles.footer}>
        <Pressable style={styles.add_btn} onPress={handleAddShop}>
          <Feather name="plus" size={28} color={colors.white} />
        </Pressable>
      </View>
    </View>
  )
}

const colors = {
  black: 'black',
  white: 'white',
  borderColor: '#d1d1d1',
  background: '#f1f1f1',
}

const styles = StyleSheet.create({
  ShopListScreen_wrapper: {
    flex: 1,
    position: 'relative',
  },
  add_btn: {
    alignItems: 'center',
    backgroundColor: colors.black,
    borderRadius: 50,
    bottom: 20,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    width: 50,
  },
  box: {
    borderRadius: 5,
    margin: 10,
    minHeight: 100,
    padding: 5,
    ...customStyles.border(1, 'solid', colors.borderColor),
  },
  buttonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
    margin: 5,
    padding: 10,
    // backgroundColor: colors.background,
  },
  footer: {
    backgroundColor: colors.background,
    // height: 60,
  },
  hr: {
    ...customStyles.border(1, 'solid', colors.borderColor),
    marginVertical: 5,
  },
  text_h2: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
})
