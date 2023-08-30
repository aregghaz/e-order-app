/**
 * was created by tigran at 30.08.23
 */
import { Feather } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useCallback, useState } from 'react'
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

import { SHOP_API } from '~api'
import { notification } from '~services/ShopService'
import { screenHeight, screenWidth } from '~utils/breakpoints'

const colors = {
  grey: '#dee2e6',
  headingColor: '#212529',
  borderColor: '#D2D2D2',
  nameColor: '#646464',
  activeColor: '#2a7581',
  activeText: 'white',
  opacity: '#00000056',
  white: 'white',
  red: '#EF8781',
}

interface IProps {
  productId: string
  setModalVisible: (el: boolean) => void
  modalVisible: boolean
}

export const ModalWishList: FC<IProps> = ({ setModalVisible, modalVisible, productId }) => {
  const [wishList, setWishList] = useState<any>([])
  const [wishListName, setWishListName] = useState('')

  useFocusEffect(
    useCallback(() => {
      const getWishListData = async () => {
        const wishListData = await SHOP_API.getWishList()
        setWishList(wishListData.payload.content)
      }
      getWishListData()
    }, [])
  )

  const handleAddToWishList = async (productId: string, id: string) => {
    await SHOP_API.addToWishList(productId, id)
    await notification('Успешно добавлено в список')
  }

  const handlerOpenModal = async () => {
    if (wishListName) {
      await SHOP_API.createWishList(wishListName)
    }
    const wishListData = await SHOP_API.getWishList()
    setWishList(wishListData.payload.content)
    setWishListName('')
  }

  return (
    <View style={styles.ModalWishList_wrapper}>
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
            <View style={styles.modal_header}>
              <Text style={styles.textStyle}>Список избранных</Text>
              <Feather
                onPress={() => setModalVisible(!modalVisible)}
                name="x"
                size={24}
                color="black"
              />
            </View>
            <View style={styles.wish_list}>
              <ScrollView>
                <KeyboardAvoidingView>
                  {wishList.length > 0 ? (
                    wishList.map((item: any) => {
                      return (
                        <Pressable
                          key={item.id}
                          onPress={() => handleAddToWishList(productId, item.id)}
                        >
                          <View style={styles.wish_list_item__block}>
                            <Text>{item.name}</Text>
                          </View>
                        </Pressable>
                      )
                    })
                  ) : (
                    <View>
                      <Text style={styles.wish_list_text}>Список избранных пуст</Text>
                    </View>
                  )}
                </KeyboardAvoidingView>
              </ScrollView>
            </View>
            <View style={styles.modal_footer}>
              <View style={styles.list_text}>
                <Text>Создать новый список</Text>
              </View>
              <View style={styles.create_wish_list}>
                <TextInput
                  style={styles.input_BG}
                  onChangeText={(value) => {
                    setWishListName(value)
                  }}
                  value={wishListName}
                />
                <Pressable style={styles.button} onPress={handlerOpenModal}>
                  <Text style={styles.button_text}>Создать список</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  ModalWishList_wrapper: {
    flex: 1,
  },
  button: {
    backgroundColor: colors.red,
    marginLeft: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button_text: {
    color: colors.white,
  },
  cover: {
    alignItems: 'center',
    backgroundColor: colors.opacity,
    height: screenHeight,
    justifyContent: 'center',
    position: 'absolute',
    width: screenWidth,
  },
  create_wish_list: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  input_BG: {
    backgroundColor: colors.borderColor,
    height: '100%',
    paddingHorizontal: 10,
    width: 180,
  },
  list_text: {
    paddingLeft: 10,
    paddingTop: 10,
  },
  modal_content: {
    backgroundColor: colors.white,
    maxHeight: screenHeight - 200,
    position: 'absolute',
    width: '90%',
  },
  modal_footer: {
    backgroundColor: colors.white,
    borderTopColor: colors.grey,
    borderTopWidth: 1,
    bottom: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  modal_header: {
    alignItems: 'center',
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  wish_list: {
    paddingBottom: 100,
    paddingLeft: 40,
    paddingTop: 50,
  },
  wish_list_item__block: {
    paddingVertical: 5,
  },
  wish_list_text: {
    fontSize: 17,
    fontWeight: 'bold',
  },
})
