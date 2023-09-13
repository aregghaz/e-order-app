/**
 * was created by tigran at 08.08.23
 */
import { AntDesign, Entypo, Feather } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import { SHOP_API } from '~api'
import { WishListProducts } from '~components/WishListProducts'
import { SCREEN } from '~constants'
import { useAuth } from '~hooks'
import { getShopId, notification } from '~services/ShopService'
import { screenHeight, screenWidth } from '~utils/breakpoints'
import { IWishlist } from '~utils/helper'
import { customStyles } from '~utils/style_helpers'

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
  confirm: 'green',
}

export const WishlistScreen: FC = () => {
  const [wishList, setWishList] = useState<IWishlist[]>([])
  const [wishListProducts, setWishListProducts] = useState<IWishlist[]>([])
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [refreshTrigger, setRefreshTrigger] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [shopID, setShopID] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const { isSignedIn } = useAuth()
  const navigation = useNavigation<any>()
  const { t } = useTranslation()
  useFocusEffect(
    useCallback(() => {
      const getWishListData = async () => {
        if (isSignedIn) {
          const getID = await getShopId()
          setShopID(getID)
          const wishListData = await SHOP_API.getWishList()
          const wishListDataItem = await SHOP_API.getWishListID(
            wishListData.payload.content[0].id,
            getID
          )
          if (wishListData) {
            setId(wishListData.payload.content[0].id)
            setWishList(wishListData.payload.content)
            setWishListProducts(wishListDataItem.payload.products)
          }
        } else {
          navigation.navigate(SCREEN.STACK_SIGN_IN)
        }
      }
      getWishListData()
    }, [])
  )

  useEffect(() => {
    const getAsyncRefreshData = async () => {
      const wishListData = await SHOP_API.getWishList()
      setWishList(wishListData.payload.content)
      handleLoadProducts(id)
    }
    getAsyncRefreshData()
  }, [refreshTrigger])

  const handleLoadProducts = async (id: string) => {
    setId(id)
    const newData = await SHOP_API.getWishListID(id, shopID)
    const filteredListItem = newData.payload.products
    if (!filteredListItem) return false

    setWishListProducts(filteredListItem)
  }

  const handleRemoveProductFromWishlist = async (productId: string, id: string) => {
    await SHOP_API.removeFromWishList(productId, id)
    handleLoadProducts(id)
    setRefreshTrigger(!refreshTrigger)
  }

  const handleSetID = (id: string) => {
    setId(id)
  }

  const handleEditName = async (id: string, value: string) => {
    await SHOP_API.updateWishListItem(id, value)
    await notification(`Обновлено "${value}"`)
    setModalVisible(false)
    setEdit(false)
    setValue('')
    setRefreshTrigger(!refreshTrigger)
  }
  const handleDeleteList = async (id: string) => {
    setModalVisible(false)
    await SHOP_API.deleteWishListItem(id)
    setRefreshTrigger(!refreshTrigger)
  }

  return (
    <View style={styles.WishlistScreen_wrapper}>
      <View style={styles.scroll_style__wrapper}>
        {wishList.length > 0 ? (
          <ScrollView horizontal={true} contentContainerStyle={styles.scroll_style}>
            {wishList.length > 0 &&
              wishList.map((item: IWishlist) => {
                const activeMenu = item.id === id
                return (
                  <Pressable
                    key={item.id}
                    style={[styles.wishlist_name, activeMenu ? styles.active : styles.passive]}
                    onPress={() => handleLoadProducts(item.id)}
                  >
                    <View style={styles.wishlist_item__wrapper}>
                      <Text>
                        {item.name} ( {item.products.length} )
                      </Text>
                      <Entypo
                        name="dots-three-vertical"
                        size={18}
                        color="black"
                        onPress={() => {
                          setValue(item.name)
                          setModalVisible(true)
                          handleSetID(item.id)
                          setEdit(false)
                        }}
                      />
                    </View>
                  </Pressable>
                )
              })}
          </ScrollView>
        ) : (
          <View style={styles.no_products}>
            <Text>There are no products yet</Text>
          </View>
        )}
      </View>
      <ScrollView>
        <View>
          {wishListProducts.length > 0 && (
            <WishListProducts
              products={wishListProducts as any}
              handleRemoveProductFromWishlist={handleRemoveProductFromWishlist}
              itemId={id}
            />
          )}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.cover}>
          <View style={styles.modal_content}>
            {edit ? (
              <>
                <Feather
                  onPress={() => setModalVisible(!modalVisible)}
                  name="x"
                  size={24}
                  color="black"
                  style={styles.close}
                />
                <TextInput style={styles.input} onChangeText={setValue} value={value} />
                <Pressable onPress={() => handleEditName(id, value)} style={styles.text_confirm}>
                  <AntDesign name="checkcircle" size={24} color={colors.confirm} />
                  <Text style={[styles.text]}>{t('modal.confirm')}</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Feather
                  onPress={() => setModalVisible(!modalVisible)}
                  name="x"
                  size={24}
                  color="black"
                  style={styles.close}
                />
                <View>
                  <Pressable
                    onPress={() => setEdit(true)}
                    style={[styles.button_wrapper, styles.text_update]}
                  >
                    <Feather name="edit" size={24} color={colors.edit} />
                    <Text style={[styles.text, styles.text_update__color]}>{t('modal.edit')}</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleDeleteList(id)}
                    style={[styles.button_wrapper, styles.text_delete]}
                  >
                    <AntDesign name="delete" size={24} color={colors.delete} />
                    <Text style={[styles.text, styles.text_delete__color]}>
                      {t('modal.delete')}
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  WishlistScreen_wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  active: {
    backgroundColor: colors.menuColor,
  },
  button_wrapper: {
    alignItems: 'center',
    borderRadius: 4,
    flexDirection: 'row',
    fontSize: 18,
    gap: 10,
    marginVertical: 10,
    minWidth: 200,
    paddingHorizontal: 10,
    paddingVertical: 3,
    textAlign: 'center',
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  cover: {
    alignItems: 'center',
    backgroundColor: colors.opacity,
    height: screenHeight,
    justifyContent: 'center',
    position: 'absolute',
    width: screenWidth,
  },
  input: {
    ...customStyles.border(1, 'solid', colors.borderColor),
    borderRadius: 4,
    marginTop: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
  },
  modal_content: {
    alignItems: 'center',
    backgroundColor: colors.white,
    height: 150,
    justifyContent: 'center',
    padding: 10,
    position: 'absolute',
    width: '90%',
  },
  no_products: {
    alignItems: 'center',
    height: screenHeight,
    justifyContent: 'center',
    width: screenWidth,
    // ...customStyles.border(1, 'solid', colors.borderColor),
  },
  passive: {},
  scroll_style: {
    gap: 10,
  },
  scroll_style__wrapper: {
    paddingHorizontal: 10,
    ...customStyles.borderBottom(1, 'solid', colors.borderColor),
  },
  text: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  text_confirm: {
    alignItems: 'center',
    borderRadius: 4,
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 10,
    ...customStyles.border(1, 'solid', colors.confirm),
  },
  text_delete: {
    ...customStyles.border(1, 'solid', colors.delete),
  },
  text_delete__color: {
    color: colors.delete,
  },
  text_update: {
    ...customStyles.border(1, 'solid', colors.edit),
  },
  text_update__color: {
    color: colors.edit,
  },
  wishlist_item__wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 30,
  },

  wishlist_name: {
    ...customStyles.border(1, 'solid', colors.borderColor),
    borderRadius: 4,
    marginVertical: 10,
    padding: 5,
  },
})
// function useTranlation(): { t: any } {
//   throw new Error('Function not implemented.')
// }
