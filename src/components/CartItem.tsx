import { MaterialIcons } from '@expo/vector-icons'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'

import { ImgOrSvg } from '~components/ImgOrSvg'
import { Price } from '~components/Price'
import InputNumber from '~components/molecules/InputNumber'
import { customStyles } from '~utils/style_helpers'
// import { fakeData } from "~FakeData";

interface IProps {
  elem?: any
  onDelete?: any
  cartItemId?: any
  isDelete?: any
  onDataToParent?: any
  total?: any
}
export const CartItems: FC<IProps> = ({
  elem,
  onDelete,
  cartItemId,
  isDelete,
  onDataToParent,
  total,
}) => {
  const { t } = useTranslation()

  // const { elem } = fakeData
  const handleUpdateQuantity = async (id: string, itemId: string, qty: number) => {
    const updatedQtyObj = elem.map((item: any) => {
      if (item.id === itemId) {
        item.quantity = qty
      }
      return {
        itemId: item.id,
        quantity: item.quantity,
      }
    })
    onDataToParent(id, updatedQtyObj)
    // setTrigger(!trigger)
  }

  const calculateSum = (item: any) => {
    const calculatedPrice = item.quantity * item.properties.unit.contents * item.price
    if (item.discount && item.discount > 0) {
      const percentage = (calculatedPrice * item.discount) / 100
      return (calculatedPrice - percentage).toFixed(2)
    }
    return calculatedPrice.toFixed(2)
  }

  return (
    <ScrollView>
      {elem &&
        elem.map((item: any, index: number) => {
          return (
            <View key={index} style={styles.cart_wrapper}>
              <View style={styles.info_section}>
                <View style={styles.image_wrapper}>
                  <ImgOrSvg item={item.product} product="-product" padding={20} width={80} />
                </View>
                <View>
                  <View>
                    <Text style={styles.name}>{item.product.productName}</Text>
                  </View>
                  <View style={styles.price_block}>
                    <Text style={styles.text_little_light}>{t('sku')}: </Text>
                    <Text style={styles.text_little_light}>{item.product.sku}</Text>
                  </View>
                  <View style={styles.price_block}>
                    <Text style={styles.text_little_light}>{t('unit')}:</Text>
                    <Text
                      style={styles.text_little_light}
                    >{`${item.properties.unit.name} (x${item.properties.unit.contents})`}</Text>
                  </View>
                  <View style={[styles.price_block, styles.price_gap]}>
                    <Text>{t('price')}:</Text>
                    <Price price={item.price} discount={item.discount} />
                  </View>
                  <View style={styles.price_block}>
                    <Text style={styles.text_little}>{t('reward')}: </Text>
                    <Text style={styles.text_little}>{item.reward}</Text>
                    <Text style={styles.bonus}>B</Text>
                  </View>
                </View>
              </View>
              <View style={styles.footer_block}>
                {isDelete && (
                  <View style={styles.buttons_wrapper}>
                    <View style={styles.incrementor}>
                      <InputNumber
                        qty={item.quantity}
                        id={item.id}
                        min={1}
                        cartItemId={cartItemId}
                        handleUpdateQuantity={handleUpdateQuantity}
                      />
                    </View>
                    <Pressable
                      style={styles.delete_wrapper}
                      onPress={() =>
                        onDelete({
                          cartItemID: cartItemId,
                          itemId: item.id,
                        })
                      }
                    >
                      <MaterialIcons name="delete" size={24} color="black" />
                    </Pressable>
                  </View>
                )}
                {total && (
                  <View style={styles.price_block}>
                    <Text style={styles.large_text}>{t('sum')}: </Text>
                    <Text style={styles.large_text}>{calculateSum(item)} ₽</Text>
                  </View>
                )}
              </View>
            </View>
          )
        })}
    </ScrollView>
  )
}
const colors = {
  borderColor: '#d1d1d1',
  red: 'red',
  lightGrey: '#b4b4b4',
}

const styles = StyleSheet.create({
  bonus: {
    color: colors.red,
  },
  buttons_wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    gap: 10,
    marginTop: 10,
  },
  cart_wrapper: {
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 10,
    ...customStyles.border(1, 'solid', colors.borderColor),
    borderRadius: 4,
  },
  delete_wrapper: {
    ...customStyles.border(1, 'solid', colors.borderColor),
    alignItems: 'center',
    borderRadius: 4,
    flexDirection: 'row',
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  footer_block: {
    flexDirection: 'row',
    marginTop: 20,
  },
  image_wrapper: {
    alignItems: 'center',
    borderRadius: 4,
    flexDirection: 'row',
    height: 100,
    justifyContent: 'center',
    width: 100,
    ...customStyles.border(1, 'solid', colors.borderColor),
  },
  incrementor: {
    height: 30,
  },
  info_section: {
    flexDirection: 'row',
    gap: 10,
  },
  large_text: {
    fontSize: 16,
  },
  name: {
    fontWeight: '500',
    width: 250,
  },
  price_block: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  price_gap: {
    marginTop: 5,
  },
  text_little: {
    fontSize: 12,
  },
  text_little_light: {
    color: colors.lightGrey,
    fontSize: 11,
  },
})
