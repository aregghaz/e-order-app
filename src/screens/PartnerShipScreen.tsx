/**
 * was created by tigran at 11.08.23
 */

import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import { SHOP_API } from '~api'
import { customStyles } from '~utils/style_helpers'

export const PrtnerShipScreen: FC = () => {
  const [partnerShips, setPartnerShips] = useState<any>([])

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        const data = await SHOP_API.get()
        console.log(data, 'datadata')
        setPartnerShips(data)
      }
      getData()
    }, [])
  )

  return (
    <View style={styles.ShopListScreen_wrapper}>
      <ScrollView>
        {partnerShips &&
          partnerShips.map((item: any) => {
            return (
              <Pressable
                key={item.id}
                ///           onPress={() => handleSetShopId(item.id)}
              >
                <View key={item.id} style={styles.box}>
                  <Text style={styles.title}>{item.companyName}</Text>
                  <Text style={styles.text_h2}>{item.shopName}</Text>
                  <View style={styles.hr} />
                  <Text>Delivery Address : {item.deliveryAddress.address_1}</Text>
                  <Text>Phone : {item.deliveryAddress.phoneNumber1}</Text>
                </View>
              </Pressable>
            )
          })}
      </ScrollView>
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

  box: {
    borderRadius: 5,
    margin: 10,
    minHeight: 100,
    padding: 5,
    ...customStyles.border(1, 'solid', colors.borderColor),
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
