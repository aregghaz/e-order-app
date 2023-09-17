import React from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, View, Text, StyleSheet, ScrollView } from 'react-native'

// import { SHOP_API } from '~api'
import InputNumber from '~components/molecules/InputNumber'
import { customStyles } from '~utils/style_helpers'

export const CartItems = ({
  elem,
  onDelete,
  cartItemId,
  isDelete,
  setTrigger,
  trigger,
  onDataToParent,
}: any) => {
  const { t } = useTranslation()
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
    console.log(updatedQtyObj, '______updatedQtyObj')
    onDataToParent(id, updatedQtyObj)
    setTrigger(!trigger)
  }

  return (
    <ScrollView>
      {elem &&
        elem.map((item: any, index: number) => {
          return (
            <View key={index} style={styles.cart_wrapper}>
              <View>
                <Text>{item.product.productName}</Text>
                <Text>Sku: {item.product.sku}</Text>
                <Text>
                  {t('unit')}: {`${item.properties.unit.name} (x${item.properties.unit.contents})`}
                </Text>
                <Text>
                  {t('quantity')}: {item.quantity}
                </Text>
                <Text>
                  {t('price')}: {item.price}
                </Text>
                <Text>
                  {t('reward')}: {item.reward}
                </Text>
                <Text>
                  {t('discount')} {item.discount} %
                </Text>
                {isDelete && (
                  <View style={styles.buttons_wrapper}>
                    <Pressable
                      style={styles.delete_wrapper}
                      onPress={() =>
                        onDelete({
                          cartItemID: cartItemId,
                          itemId: item.id,
                        })
                      }
                    >
                      <Text style={styles.delete}>{t('modal.delete')}</Text>
                    </Pressable>
                    <View style={styles.incrementor}>
                      <InputNumber
                        qty={item.quantity}
                        id={item.id}
                        min={1}
                        cartItemId={cartItemId}
                        handleUpdateQuantity={handleUpdateQuantity}
                      />
                    </View>
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
}

const styles = StyleSheet.create({
  buttons_wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    gap: 20,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cart_wrapper: {
    flexDirection: 'column',
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 10,
    ...customStyles.border(1, 'solid', colors.borderColor),
    borderRadius: 4,
  },
  delete: {
    color: colors.red,
    letterSpacing: 1,
    textAlign: 'center',
  },
  delete_wrapper: {
    ...customStyles.border(1, 'solid', colors.borderColor),
    alignItems: 'center',
    borderRadius: 4,
    marginVertical: 4,
    paddingVertical: 4,
    width: 140,
  },
  incrementor: {
    height: 30,
  },
})
