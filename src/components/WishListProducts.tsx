/**
 * was created by tigran at 08.09.23
 */

import { AntDesign, Feather } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Text, View, StyleSheet, Modal, Pressable } from 'react-native'
import { ALERT_TYPE } from 'react-native-alert-notification'

import { SHOP_API } from '~api'
import { ImgOrSvg } from '~components/ImgOrSvg'
import { CustomButton } from '~components/molecules/CustomButton'
import InputNumber from '~components/molecules/InputNumber'
import { SCREEN } from '~constants'
import { useAuth, useTranslation } from '~hooks'
import { getShopId, notification } from '~services/ShopService'
import { screenHeight, screenWidth } from '~utils/breakpoints'
import { IWishlistProduct } from '~utils/helper'
import { customStyles } from '~utils/style_helpers'
import { Price } from '~components/Price'

// import { ALERT_TYPE } from 'react-native-alert-notification'

interface IWishListProductProps {
  products: IWishlistProduct[]
  handleRemoveProductFromWishlist: (productID: string, id: string) => void
  itemId: string
}

const colors = {
  headingColor: '#212529',
  borderColor: '#D2D2D2',
  nameColor: '#646464',
  menuColor: '#d2d2d2',
  background: 'lightgrey',
  white: 'white',
  opacity: '#00000056',
  grey: '#dee2e6',
  edit: 'orange',
  delete: 'red',
  activeText: 'white',
}

export const WishListProducts: FC<IWishListProductProps> = ({
  products,
  handleRemoveProductFromWishlist,
  itemId,
}) => {
  const [selectedOption, setSelectedOption] = useState<null | any>(null)
  const [shopId, setShopId] = useState('')
  const [cartModalVisible, setCartModalVisible] = useState<boolean>(false)
  const [cartProduct, setCartProduct] = useState<any>([])
  const [countProduct, setCount] = useState(1)
  const activeItemRef = useRef<any>(null)
  const { isSignedIn } = useAuth()
  const { t } = useTranslation()
  const navigation = useNavigation<any>()

  useFocusEffect(
    useCallback(() => {
      const getAsyncData = async (): Promise<void> => {
        setSelectedOption(null)
        const getID = await getShopId()
        setShopId(getID)
      }
      getAsyncData()
    }, [])
  )

  useEffect(() => {
    activeItemRef.current = null
    setSelectedOption(null)
  }, [cartProduct.id])

  const activeBorder = { backgroundColor: colors.headingColor, color: colors.activeText }
  const handleUpdateQuantity = (cartItemId: string, id: string, count: number) => {
    setCount(count)
  }

  const handleSelect = (elem: any) => {
    activeItemRef.current = elem.refId
    setSelectedOption(elem)
  }

  const handleAddToCart = async () => {
    if (!isSignedIn) {
      await notification(t('notification.signIn'), ALERT_TYPE.WARNING)
      navigation.navigate(SCREEN.STACK_SIGN_IN)
    } else {
      if (!selectedOption) {
        await notification(t('notification.chose_unit'), ALERT_TYPE.WARNING)
      } else {
        delete selectedOption.productId
        const data = {
          properties: {
            unit: selectedOption,
          },
          shop: shopId,
          productId: cartProduct.id,
          quantity: countProduct,
        }

        const add = await SHOP_API.addToCart(data)
        if (!add) {
          await notification('SOMETHING WRONG', ALERT_TYPE.DANGER)
        } else {
          await notification('Добавлено в корзину')
          setCartModalVisible(!cartModalVisible)
        }
      }
    }
  }

  return (
    <View>
      {products?.length > 0 &&
        products.map((item: IWishlistProduct) => {
          return (
            <View key={item.id} style={styles.product_wrapper}>
              <ImgOrSvg item={item} product="-product" padding={20} width={80} />
              <View>
                <Pressable onPress={() => navigation.navigate(SCREEN.STACK_PRODUCT_INNER, item)}>
                  <Text>{item.name}</Text>
                </Pressable>
              </View>
              <View style={styles.price_wrapper}>
                <Text>{t('price')} :</Text>
                <Price price={item.price} discount={item.discount} />
              </View>
              <View>
                <Text>
                  {t('discount')} : {item.discount}
                </Text>
              </View>
              <View>
                <Text>
                  {t('reward')} : {item.reward}
                </Text>
              </View>
              <View style={styles.icons}>
                <AntDesign
                  name="shoppingcart"
                  size={24}
                  color="black"
                  onPress={() => {
                    setCartModalVisible(true)
                    setCartProduct(item)
                  }}
                  style={styles.icon}
                />
                <AntDesign
                  name="delete"
                  size={24}
                  color="red"
                  onPress={() => handleRemoveProductFromWishlist(item.id, itemId)}
                  style={styles.icon}
                />
              </View>
            </View>
          )
        })}
      <Modal
        animationType="slide"
        transparent={true}
        visible={cartModalVisible}
        onRequestClose={() => {
          setCartModalVisible(!cartModalVisible)
        }}
      >
        <View style={styles.cover}>
          <View style={styles.modal_content}>
            <Feather
              onPress={() => setCartModalVisible(!cartModalVisible)}
              name="x"
              size={24}
              color="black"
              style={styles.close}
            />
            <ImgOrSvg item={cartProduct} product="-product" width={140} />
            <View style={styles.inner_wrapper}>
              <Text style={styles.title}>{cartProduct.name}</Text>
              <Text style={styles.supplier}>Bonus : {cartProduct.reward}</Text>
              <Text style={styles.price}>₽ {cartProduct.price}</Text>
              <View style={styles.horizontal_row} />
              <Text>Вложение</Text>
              <View style={styles.each}>
                {cartProduct?.properties?.unit?.length > 0 &&
                  cartProduct?.properties?.unit.map((el: any, index: number) => (
                    <Pressable onPress={() => handleSelect(el)} key={index}>
                      <Text
                        style={[
                          styles.each_btn,
                          activeItemRef.current === el.refId && activeBorder,
                        ]}
                      >
                        {el.contents} {el.name}
                      </Text>
                    </Pressable>
                  ))}
              </View>
              <View style={styles.increment}>
                <InputNumber
                  qty={1}
                  id={cartProduct.id}
                  min={1}
                  cartItemId={shopId}
                  handleUpdateQuantity={handleUpdateQuantity}
                />
              </View>
              <View style={styles.horizontal_row} />
              <View style={styles.btn_wrapper}>
                <CustomButton
                  title="Add To Cart"
                  padding={10}
                  onPress={handleAddToCart}
                  background="black"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  btn_wrapper: {
    marginHorizontal: 5,
    width: '100%',
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
  },
  cover: {
    alignItems: 'center',
    backgroundColor: colors.opacity,
    height: screenHeight,
    justifyContent: 'center',
    position: 'absolute',
    width: screenWidth,
  },
  each: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  each_btn: {
    ...customStyles.border(1, 'solid', colors.borderColor),
    borderRadius: 4,
    marginRight: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  horizontal_row: {
    backgroundColor: colors.grey,
    height: 1,
    marginVertical: 20,
    width: '100%',
  },
  icon: {
    marginVertical: 10,
  },
  icons: {
    position: 'absolute',
    right: 10,
    top: 5,
  },
  increment: {
    marginTop: 20,
  },
  inner_wrapper: {
    paddingHorizontal: 20,
  },
  modal_content: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    padding: 10,
    position: 'absolute',
    width: '90%',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price_wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  product_wrapper: {
    ...customStyles.border(1, 'solid', colors.borderColor),
    borderRadius: 4,
    gap: 10,
    margin: 10,
    padding: 10,
    paddingRight: 40,
    position: 'relative',
  },
  supplier: {
    marginVertical: 10,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
})
