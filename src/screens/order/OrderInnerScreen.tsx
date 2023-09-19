import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import { SHOP_API } from '~api'
import { IOorder, IProduct } from '~types/order'
import { timestampToDate } from '~utils/dateTimeFormat'
import { customStyles } from '~utils/style_helpers'

export const statusTypes = {
  status: 'Status',
  pending: 'Pending',
  accepted: 'Accepted',
}

export const OrderInnerScreen: FC = ({ route }: any) => {
  const id = route.params.id
  const [order, setOrder] = useState<IOorder>()
  const { t } = useTranslation()
  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        const orderData = await SHOP_API.getOrdersDetails(id)
        setOrder(orderData.payload)
      }
      getData()
    }, [id])
  )
  // console.log(order, '___ ORDER')

  return order ? (
    <View style={styles.ShopListScreen_wrapper}>
      <ScrollView>
        <View style={styles.box}>
          <Text style={styles.text_h2}>Заказ # {order.orderNumber}</Text>
          <View style={styles.hr} />
          <View style={styles.row_wrap}>
            <Text style={styles.title}>{t('created-at')} :</Text>
            <Text>{timestampToDate(order.createdAt)}</Text>
          </View>
          <View style={styles.row_wrap}>
            <Text style={styles.title}>{t('updated_at')} :</Text>
            <Text>{timestampToDate(order.updatedAt)}</Text>
          </View>
          <View style={styles.row_wrap}>
            <Text style={styles.title}>{t('status')} :</Text>
            <Text>{t(order.status as keyof typeof statusTypes)}</Text>
          </View>
        </View>

        <View style={styles.hr} />
        {order.orderItems.map((item: IProduct, index: number) => {
          return (
            <View key={index} style={styles.box}>
              <View style={styles.row_wrap}>
                <Text style={styles.title}>{t('company_name')} :</Text>
                <Text>{item.productId.supplier.companyName}</Text>
              </View>
              <View style={styles.row_wrap}>
                <Text style={styles.title}>{t('product_name')} :</Text>
                <Text>{item.productName}</Text>
              </View>
              <View style={styles.row_wrap}>
                <Text style={styles.title}>{t('quantity')} :</Text>
                <Text>{item.quantity}</Text>
              </View>
              <View style={styles.row_wrap}>
                <Text style={styles.title}>{t('price')} :</Text>
                <Text>{item.price}</Text>
              </View>
              <View style={styles.row_wrap}>
                <Text style={styles.title}>{t('discount')} :</Text>
                <Text>{item.discount}</Text>
              </View>
              <View style={styles.row_wrap}>
                <Text style={styles.title}>{t('reward')} :</Text>
                <Text>{item.reward}</Text>
              </View>
              <View style={styles.row_wrap}>
                <Text style={styles.title}>{t('total')} :</Text>
                <Text>{(item.price - (item.price * item.discount) / 100).toFixed(2)}</Text>
              </View>
            </View>
          )
        })}
      </ScrollView>
      <View style={styles.parentBox}>
        <View style={styles.boxContainer}>
          <View style={styles.box_little}>
            <Text>{t('shop.shop')}</Text>
            <Text>{order.shop.shopName}</Text>
            <Text>{order.shop.companyName}</Text>
            <Text>{order.shop.deliveryAddress.phoneNumber1}</Text>
          </View>
          <View style={styles.box_little}>
            <Text>{t('shop.supplier')}</Text>
            {/*<Text>{order.supplier.shopName}</Text>*/}
            <Text>{order.supplier.companyName}</Text>
            <Text>{order.supplier.address.phoneNumber1}</Text>
          </View>
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            editable={false}
            placeholder={t('comment')}
            placeholderTextColor={'lightgrey'}
            multiline={true}
            numberOfLines={4}
          />
        </View>
      </View>
      <View style={styles.btn_wrapper}>
        <View style={styles.orderViewContainer}>
          <View style={styles.orderView}>
            <Text>Бонус за заказ : {order.rewardTotal.toFixed(2)}</Text>
            <Text>Итоговая сумма : {order.orderTotal.toFixed(2)} </Text>
          </View>
        </View>
      </View>
    </View>
  ) : (
    <View>
      <Text>Something wrong with your request</Text>
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
  boxContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  box_little: {
    borderRadius: 4,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    ...customStyles.border(1, 'solid', colors.borderColor),
  },
  btn_wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  hr: {
    ...customStyles.borderTop(1, 'solid', colors.borderColor),
    marginVertical: 5,
  },
  input: {
    minHeight: 40,
    minWidth: '100%',
    paddingLeft: 10,
    paddingTop: 10,
    ...customStyles.border(1, 'solid', colors.borderColor),
    borderRadius: 3,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  inputBox: {
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
  orderView: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  orderViewContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 340,
  },
  parentBox: {
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'center',
    ...customStyles.border(1, 'solid', colors.borderColor),
    gap: 7,
    paddingVertical: 10,
    // backgroundColor: "#f1f1f1"
  },
  row_wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginVertical: 3,
  },
  text_h2: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
})
