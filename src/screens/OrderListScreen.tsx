import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { FC, useCallback, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import { SHOP_API } from '~api'
import { SCREEN } from '~constants'
import { timestampToDate } from '~utils/dateTimeFormat'
import { customStyles } from '~utils/style_helpers'
interface IOorder {
  id: string
  orderTotal: number
  rewardTotal: number
  orderNumber: number
  createdAt: string
  updatedAt: string
  status: string
  comment: string
}
export const OrderListScreen: FC = () => {
  const [orders, setOrders] = useState<IOorder[]>([])
  const navigation = useNavigation<any>()

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        const orderData = await SHOP_API.getOrders()
        setOrders(orderData.payload.content)
      }
      getData()
    }, [])
  )

  const handlerGetOrder = useCallback((id: string) => {
    return navigation.navigate(SCREEN.STACK_ORDER_INNER, { id })
  }, [])

  return (
    <View style={styles.ShopListScreen_wrapper}>
      <ScrollView>
        {orders &&
          orders.map((order: IOorder) => (
            <Pressable key={order.id} onPress={() => handlerGetOrder(order.id)}>
              <View key={order.id} style={styles.box}>
                <Text style={styles.title}>orderNumber : {order.orderNumber}</Text>
                <Text style={styles.text_h2}>status : {order.status}</Text>
                <View style={styles.hr} />
                <Text>createdAt : {timestampToDate(order.createdAt)}</Text>
                <Text>orderTotal : {order.orderTotal} ₽</Text>
                <Text>rewardTotal : {order.rewardTotal}</Text>
              </View>
            </Pressable>
          ))}
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
