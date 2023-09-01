/**
 * was created by tigran at 08.08.23
 */
import { AntDesign, Feather } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { FC, useCallback, useRef, useState } from 'react'
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import { SHOP_API } from '~api'
import { SCREEN } from '~constants'
import { useAuth } from '~hooks'
import { screenHeight, screenWidth } from '~utils/breakpoints'
import { customStyles } from '~utils/style_helpers'

const colors = {
  headingColor: '#212529',
  borderColor: '#D2D2D2',
  nameColor: '#646464',
  background: 'lightgrey',
  white: 'white',
  opacity: '#00000056',
  grey: '#dee2e6',
  edit: 'orange',
  delete: 'red',
}
const WishListProductSection: FC<any> = ({ products }) => {
  return (
    <View>
      <View style={styles.hr} />
      {products?.length > 0 &&
        products.map((item: any) => {
          return (
            <View key={item.id} style={styles.product_wrapper}>
              {/*<ImgOrSvg item={item} product="-product" padding={20} width={80}/>*/}
              <View>
                <Text>{item.name}</Text>
              </View>
              <AntDesign name="edit" size={24} color="black" />
              <AntDesign name="delete" size={24} color="black" />
            </View>
          )
        })}
    </View>
  )
}

export const WishlistScreen: FC = () => {
  const [wishList, setWishList] = useState<any>([])
  // const [foundList, setFoundList] = useState<any>({});
  const foundListRef = useRef<any>(null)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [id, setId] = useState('')
  const [value, setValue] = useState('')
  const { isSignedIn } = useAuth()
  const navigation = useNavigation<any>()

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
    }, [wishList, foundListRef.current])
  )
  const handleLoadProducts = (id: string) => {
    const filteredListItem = wishList.find((item: any) => item.id === id)
    if (!filteredListItem) return false
    // setFoundList(filteredListItem);
    foundListRef.current = filteredListItem
  }

  const handleSetID = (id: string) => {
    setId(id)
  }

  const handleEditName = async (id: string, value: string) => {
    await SHOP_API.updateWishListItem(id, value)
    setModalVisible(false)
    setEdit(false)
    setValue('')
  }
  const handleDeleteList = async (id: string) => {
    setModalVisible(false)
    await SHOP_API.deleteWishListItem(id)
  }

  return (
    <View style={styles.WishlistScreen_wrapper}>
      <ScrollView>
        <View>
          <ScrollView horizontal={true} contentContainerStyle={styles.scroll_style}>
            {wishList.length > 0 ? (
              wishList.map((item: any) => {
                return (
                  <Pressable
                    key={item.id}
                    style={[
                      styles.wishlist_name,
                      foundListRef && item.id === foundListRef.current?.id
                        ? styles.active
                        : styles.passive,
                    ]}
                    onPress={() => handleLoadProducts(item.id)}
                    onLongPress={() => {
                      setModalVisible(true)
                      handleSetID(item.id)
                    }}
                  >
                    <View>
                      <Text
                        style={
                          foundListRef && item.id === foundListRef?.current?.id
                            ? styles.active_text
                            : styles.passive_text
                        }
                      >
                        {item.name} ( {item.products.length} )
                      </Text>
                    </View>
                  </Pressable>
                )
              })
            ) : (
              <View style={styles.no_products}>
                <Text>There are no products yet</Text>
              </View>
            )}
          </ScrollView>
          {foundListRef.current && Object.keys(foundListRef.current!).length > 0 && (
            <WishListProductSection products={foundListRef.current.products} />
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
    backgroundColor: colors.headingColor,
  },
  active_text: {
    color: colors.white,
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
  hr: {
    ...customStyles.borderBottom(1, 'solid', colors.borderColor),
    width: '100%',
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
    height: screenHeight - 200,
    justifyContent: 'center',
    width: screenWidth,
  },
  passive: {},
  passive_text: {},
  product_wrapper: {
    ...customStyles.border(1, 'solid', colors.borderColor),
    borderRadius: 4,
    gap: 10,
    margin: 10,
    padding: 10,
    position: 'relative',
  },
  scroll_style: {
    gap: 10,
    marginHorizontal: 10,
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
  wishlist_name: {
    ...customStyles.border(1, 'solid', colors.borderColor),
    borderRadius: 4,
    marginVertical: 10,
    padding: 5,
  },
})
