import { MaterialCommunityIcons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

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
  const { t } = useTranslation()
  const sortOrders = [
    {
      id: 2,
      direction: 'asc',
      title: t('ascending_order'),
    },
    {
      id: 3,
      direction: 'desc',
      title: t('descending_order'),
    },
  ]
  const [selected, setSelected] = useState<TOrder>(sortOrders[0])

  type TOrder = {
    id: number
    direction: string
    title: string
  }

  const filteredSortOrders = sortOrders.filter((el: TOrder) => el.id !== selected.id)

  const [openDrop, setOpenDrop] = useState(false)
  const navigation = useNavigation<any>()

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        // const orderData = await SHOP_API.getOrders()
        const orderData = await SHOP_API.getSortOrders(selected.direction)
        setOrders(orderData.payload.content)
      }
      getData()
    }, [selected.direction, selected.title])
  )

  const handlerGetOrder = useCallback((id: string) => {
    return navigation.navigate(SCREEN.STACK_ORDER_INNER, { id })
  }, [])

  const handleChangeSort = (el: TOrder) => {
    setSelected(el)
    setOpenDrop(false)
  }

  const setTheRightIcon = (direction: string) => {
    if (direction === 'asc') {
      return <Octicons name="sort-asc" size={24} color="black" />
    } else {
      return <Octicons name="sort-desc" size={24} color="black" />
    }
  }

  return (
    <View style={styles.ShopListScreen_wrapper}>
      <View style={styles.order_filter__wrapper}>
        <TouchableOpacity style={styles.order_button} onPress={() => setOpenDrop(!openDrop)}>
          {setTheRightIcon(selected.direction)}
          <Text>{selected.title}</Text>
        </TouchableOpacity>
      </View>
      {openDrop && (
        <View style={styles.inner}>
          {/*{sortOrders.map((el: any) => (*/}
          {filteredSortOrders.map((el: any) => (
            <Pressable
              style={styles.order_sort_text}
              key={el.id}
              onPress={() => handleChangeSort(el)}
            >
              <Text>{el.title}</Text>
            </Pressable>
          ))}
        </View>
      )}
      <ScrollView>
        {orders &&
          orders.map((order: IOorder) => (
            <Pressable key={order.id} onPress={() => handlerGetOrder(order.id)}>
              <View key={order.id} style={styles.box}>
                <View style={styles.header_text}>
                  <Text style={styles.title}>
                    {t('order_number')} : {order.orderNumber}
                  </Text>
                  <Text style={styles.text_h2}>
                    <>
                      {t('status')} : {t(order.status)}
                    </>
                  </Text>
                </View>
                <View style={styles.hr} />
                <View style={styles.row_wrap}>
                  <Text style={styles.title_name}>{t('created-at')} :</Text>
                  <Text>{timestampToDate(order.createdAt)}</Text>
                </View>
                <View style={styles.row_wrap}>
                  <Text style={styles.title_name}>{t('order_total')} :</Text>
                  <Text>{order.orderTotal} ₽</Text>
                </View>
                <View style={styles.row_wrap}>
                  <Text style={styles.title_name}>{t('reward_total')} :</Text>
                  <Text>{order.rewardTotal}</Text>
                </View>
                <View style={styles.list_icon}>
                  <MaterialIcons name="list-alt" size={30} color="black" />
                </View>
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
    position: 'relative',
    ...customStyles.border(1, 'solid', colors.borderColor),
  },
  header_text: {
    marginRight: 45,
  },
  hr: {
    ...customStyles.borderTop(1, 'solid', colors.borderColor),
    marginVertical: 5,
  },
  inner: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    left: 15,
    minHeight: 40,
    minWidth: 150,
    paddingHorizontal: 10,
    position: 'absolute',
    top: 60,
    zIndex: 1,
    ...customStyles.border(1, 'solid', colors.borderColor),
  },
  list_icon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  order_button: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  order_filter__wrapper: {
    height: 50,
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    paddingHorizontal: 15,
    ...customStyles.border(1, 'solid', colors.borderColor),
    ...customStyles.borderRadius(0, 4, 4, 0),
  },
  order_sort_text: {
    marginVertical: 10,
  },
  row_wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginVertical: 3,
  },
  text_h2: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  title_name: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
})
