/**
 * was created by tigran at 08.08.23
 */
import { AntDesign, Entypo, Feather } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { FC, useCallback, useState } from 'react'
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { ALERT_TYPE } from 'react-native-alert-notification'

import { SHOP_API } from '~api'
import { ImgOrSvg } from '~components/ImgOrSvg'
import { SCREEN } from '~constants'
import { useAuth } from '~hooks'
import { notification } from '~services/ShopService'
import { screenHeight, screenWidth } from '~utils/breakpoints'
import { IWishlist, IWishlistProduct } from '~utils/helper'
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
}

interface IWishListProductProps {
  products: IWishlistProduct[]
  handleRemoveProductFromWishlist: (productID: string, id: string) => void
  itemId: string
}

const WishListProducts: FC<IWishListProductProps> = ({
  products,
  handleRemoveProductFromWishlist,
  itemId,
}) => {
  return (
    <View>
      {products?.length > 0 &&
        products.map((item: IWishlistProduct) => {
          return (
            <View key={item.id} style={styles.product_wrapper}>
              <ImgOrSvg item={item} product="-product" padding={20} width={80} />
              <View>
                <Text>{item.name}</Text>
              </View>
              <View>
                <Text>Rating : {item.rating}</Text>
              </View>
              <View>
                <Text>Views : {item.views}</Text>
              </View>
              <View>
                <Text>Status : {item.status}</Text>
              </View>
              <View style={styles.icons}>
                <AntDesign
                  name="shoppingcart"
                  size={24}
                  color="black"
                  onPress={() => alert(item.id)}
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
    </View>
  )
}

export const WishlistScreen: FC = () => {
  const [wishList, setWishList] = useState<IWishlist[]>([])
  const [foundList, setFoundList] = useState<null | IWishlist>(null)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [refreshTrigger, setRefreshTrigger] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const { isSignedIn } = useAuth()
  const navigation = useNavigation<any>()
  const { t } = useTranlation()
  useFocusEffect(
    useCallback(() => {
      const getWishListData = async () => {
        if (isSignedIn) {
          const wishListData = await SHOP_API.getWishList()
          if (wishListData) {
            setWishList(wishListData.payload.content)
          }
        } else {
          navigation.navigate(SCREEN.STACK_SIGN_IN)
        }
      }
      getWishListData()
    }, [wishList, refreshTrigger, foundList])
  )

  const handleLoadProducts = (id: string) => {
    setId(id)
    const filteredListItem = wishList.find((item: IWishlist) => item.id === id)
    if (!filteredListItem) return false
    setFoundList(filteredListItem)
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
  }
  const handleDeleteList = async (id: string) => {
    setModalVisible(false)
    await SHOP_API.deleteWishListItem(id)
    setRefreshTrigger(!refreshTrigger)
  }
  // const handleAddToCart = async () => {
  //   if (!isSignedIn) {
  //     notification(t('notification.signIn'), ALERT_TYPE.WARNING)
  //     navigation.navigate(SCREEN.STACK_SIGN_IN)
  //   } else {
  //     if (!selectedOption) {
  //       notification(t('notification.chose_unit'), ALERT_TYPE.WARNING)
  //     } else {
  //       delete selectedOption.productId
  //       // const data = {
  //       //   properties: {
  //       //     unit: selectedOption,
  //       //   },
  //       //   shop: shopId,
  //       //   productId: params.id,
  //       //   quantity: countProduct,
  //       // }
  //       // console.log(data,'datadata')
  //       const add = await SHOP_API.addToCart(data)
  //       if (!add) {
  //         notification('SOMETHING WRONG', ALERT_TYPE.DANGER)
  //       } else {
  //         notification('Добавлено в корзину')
  //       }
  //     }
  //   }
  // }

  return (
    <View style={styles.WishlistScreen_wrapper}>
      <View style={styles.scroll_style__wrapper}>
        {wishList.length > 0 ? (
          <ScrollView horizontal={true} contentContainerStyle={styles.scroll_style}>
            {wishList.length > 0 &&
              wishList.map((item: IWishlist) => {
                const activeMenu = foundList && item.id === foundList?.id
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
                          setModalVisible(true)
                          handleSetID(item.id)
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
          {wishList.length > 0 && foundList && Object.keys(foundList).length > 0 && (
            <WishListProducts
              products={foundList.products}
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
                <TextInput style={styles.input} onChangeText={setValue} value={value} />
                <Pressable onPress={() => handleEditName(id, value)}>
                  <Text style={[styles.text, styles.text_update]}>Update</Text>
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
                  <Pressable onPress={() => setEdit(true)}>
                    <Text style={[styles.text, styles.text_update]}>Edit</Text>
                  </Pressable>
                  <Pressable onPress={() => handleDeleteList(id)}>
                    <Text style={[styles.text, styles.text_delete]}>Delete</Text>
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
  icon: {
    marginVertical: 10,
  },
  icons: {
    position: 'absolute',
    right: 10,
    top: 5,
  },
  input: {
    ...customStyles.border(1, 'solid', colors.borderColor),
    borderRadius: 4,
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
  product_wrapper: {
    ...customStyles.border(1, 'solid', colors.borderColor),
    borderRadius: 4,
    gap: 10,
    margin: 10,
    minHeight: 100,
    padding: 10,
    paddingRight: 40,
    position: 'relative',
  },
  scroll_style: {
    gap: 10,
  },
  scroll_style__wrapper: {
    paddingHorizontal: 10,
    ...customStyles.borderBottom(1, 'solid', colors.borderColor),
  },
  text: {
    borderRadius: 4,
    fontSize: 18,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    textAlign: 'center',
  },
  text_delete: {
    ...customStyles.border(1, 'solid', colors.delete),
    color: colors.delete,
  },
  text_update: {
    ...customStyles.border(1, 'solid', colors.edit),
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
function useTranlation(): { t: any } {
  throw new Error('Function not implemented.')
}
