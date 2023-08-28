/**
 * was created by tigran at 02.07.23
 */

import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { ALERT_TYPE } from 'react-native-alert-notification'
import Swiper from 'react-native-swiper'

import { SHOP_API } from '~api'
import { ImgOrSvg } from '~components/ImgOrSvg'
import { NoImageSvg } from '~components/NoImageSvg'
import { CustomButton } from '~components/molecules/CustomButton'
import { SCREEN } from '~constants'
import { useAuth, useTranslation } from '~hooks'
import { useIncrement } from '~hooks/useIncrement'
import { getShopId, notification } from '~services/ShopService'
import { IFeatured } from '~types/featuredProducts'
import { customStyles } from '~utils/style_helpers'

const colors = {
  grey: '#dee2e6',
  headingColor: '#212529',
  borderColor: '#D2D2D2',
  nameColor: '#646464',
  activeColor: '#2a7581',
  activeText: 'white',
}
const RenderFooter = ({ isLoading }: any) => {
  if (!isLoading) return null
  return (
    <View>
      <ActivityIndicator size="large" color={colors.borderColor} />
    </View>
  )
}

export const ProductInnerScreen: FC = ({ route, navigation }: any) => {
  const [featured, setFeatured] = useState<IFeatured[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasNext, setHasNext] = useState(false)
  const [selectedOption, setSelectedOption] = useState<null | any>(null)
  const [shopId, setShopId] = useState('')
  const [wishList, setWishList] = useState<any>([])
  const scrollViewRef = useRef<any>(null)
  const [value, addOption] = useIncrement()
  const width = Dimensions.get('window').width
  const { params } = route
  const activeItemRef = useRef(null)
  const { isSignedIn } = useAuth()
  const [modalVisible, setModalVisible] = useState(false)
  const [wishListName, setWishListName] = useState('')
  const { t } = useTranslation()

  const activeBorder = { backgroundColor: colors.headingColor, color: colors.activeText }
  const options = {
    shopId: null,
    page: value,
    limit: 6,
  }

  useFocusEffect(
    useCallback(() => {
      const getAsyncData = async (): Promise<void> => {
        try {
          setSelectedOption(null)
          setIsLoading(true)
          const getID = await getShopId()
          setShopId(getID)
          if (getID) {
            const featuredData = await SHOP_API.getTopDiscounts(options)
            setHasNext(featuredData.payload.pagination.hasNext)
            setFeatured((featured) => [...featured, ...featuredData.payload.content])
          }
        } catch (err) {
          console.error('Error fetching latest products:', err)
        } finally {
          setIsLoading(false)
        }
      }
      getAsyncData()
    }, [value])
  )
  useEffect(() => {
    activeItemRef.current = null
    setSelectedOption(null)
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToOffset({ offset: 0 })
    }
  }, [params.id])

  const handleSelect = (elem: any) => {
    activeItemRef.current = elem.refId
    setSelectedOption(elem)
  }
  const handleEnd = () => {
    if (!hasNext) {
      return null
    }
    addOption(1)
  }
  const handleAddToCart = async () => {
    if (!isSignedIn) {
      notification(t('notification.signIn'), ALERT_TYPE.WARNING)
      navigation.navigate(SCREEN.STACK_SIGN_IN)
    } else {
      if (!selectedOption) {
        notification(t('notification.chose_unit'), ALERT_TYPE.WARNING)
      } else {
        delete selectedOption.productId
        const data = {
          properties: {
            unit: selectedOption,
          },
          shop: shopId,
          productId: params.id,
          quantity: 1,
        }

        const add = await SHOP_API.addToCart(data)
        if (!add) {
          notification('SOMETHING WRONG', ALERT_TYPE.DANGER)
        } else {
          notification('Добавлено в корзину')
        }
      }
    }
  }

  const handlerOpenModal = async () => {
    const wishListData = await SHOP_API.getWishList()
    setWishList(wishListData.payload.content)
    setModalVisible(!modalVisible)
  }

  const Header = useCallback(() => {
    return (
      <>
        {params.gallery.length > 0 ? (
          <Swiper
            width={width}
            height={width}
            horizontal={true}
            loop={true}
            showsPagination={true}
            scrollEnabled={true}
            showsButtons={false}
            autoplay={false}
            autoplayTimeout={500}
            autoplayDirection={true}
            pagingEnabled={true}
          >
            {params.gallery.map((item: IFeatured) => {
              return (
                <React.Fragment key={item.id}>
                  <ImgOrSvg item={item} product="-product" />
                </React.Fragment>
              )
            })}
          </Swiper>
        ) : (
          <NoImageSvg width={width} height={width} />
        )}
        <View style={styles.inner_wrapper}>
          <Text style={styles.title}>{params.name}</Text>
          <Text style={styles.description}>{params.description}</Text>
          <View style={styles.rating_block}>
            <Text style={styles.rates}>{params.reward}</Text>
            <Ionicons name="star" size={16} color="#FFC107" />
            <View style={styles.slash} />
            <Text style={styles.rates}>{params.rating} Ratings</Text>
          </View>
          <View style={styles.horizontal_row} />
          <View>
            <Text style={styles.price}>₽ {params.price}</Text>
          </View>
          <View style={styles.horizontal_row} />
          <View style={styles.each}>
            <Text>Вложение</Text>
            {params.properties.unit.length > 0 &&
              params.properties.unit.map((el: any, index: number) => (
                <Pressable onPress={() => handleSelect(el)} key={index}>
                  <Text
                    style={[styles.each_btn, activeItemRef.current === el.refId && activeBorder]}
                  >
                    {el.contents} {el.name}
                  </Text>
                </Pressable>
              ))}
          </View>

          <View style={styles.horizontal_row} />
          <View>
            <Text style={styles.details}>Product Details</Text>
            <Text>{params.description}</Text>
          </View>
          <View style={styles.horizontal_row} />
          <Text style={styles.heading}>Top Discounts</Text>
        </View>
      </>
    )
  }, [params.id])

  return (
    <View style={styles.ProductInnerScreen_wrapper}>
      <FlatList
        numColumns={2}
        ref={scrollViewRef}
        data={featured}
        ListHeaderComponent={Header}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              navigation.navigate(SCREEN.STACK_PRODUCT_INNER, item)
            }}
          >
            <ImgOrSvg item={item} padding={20} product="-product" />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
            </View>
            <View>
              <Text style={styles.price}>₽ {item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={<RenderFooter isLoading={isLoading} />}
        // onEndReached={() => addOption(1)}
        onEndReached={handleEnd}
        onEndReachedThreshold={0.5}
      />
      <View style={styles.fix_footer}>
        <View style={styles.btn_wrapper}>
          <CustomButton
            title="Wishlist"
            padding={10}
            color="black"
            border="grey"
            onPress={() => handlerOpenModal()}
          />
        </View>
        <View style={styles.btn_wrapper}>
          <CustomButton
            title="Add To Cart"
            padding={10}
            onPress={handleAddToCart}
            background="black"
          />
        </View>
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable style={styles.button} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>X</Text>
              </Pressable>
              <View>
                {wishList.map((item: any) => {
                  console.log(item)
                })}
              </View>
              <View style={styles.create_wish_list}>
                <TextInput
                  onChangeText={(value) => {
                    setWishListName(value)
                  }}
                  value={wishListName}
                  placeholder="Отчество"
                />
                <CustomButton
                  title=" Создать список  "
                  padding={10}
                  color="black"
                  border="grey"
                  onPress={() => handlerOpenModal()}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ProductInnerScreen_wrapper: {
    flex: 1,
  },
  btn_wrapper: {
    marginHorizontal: 5,
    width: '45%',
  },
  button: {
    borderRadius: 20,
    elevation: 2,
    padding: 10,
  },
  centeredView: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    // marginTop: 22,
  },
  create_wish_list: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  description: {},
  details: {
    fontSize: 20,
    fontWeight: 'bold',
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
  fix_footer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
    // paddingHorizontal: 20,
    justifyContent: 'center',
    ...customStyles.border(1, 'solid', colors.borderColor),
  },
  heading: {
    color: colors.headingColor,
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  horizontal_row: {
    backgroundColor: colors.grey,
    height: 1,
    marginVertical: 20,
    width: '100%',
  },
  inner_wrapper: {
    paddingHorizontal: 20,
  },
  item: {
    borderRadius: 8,
    ...customStyles.border(1, 'solid', colors.borderColor),
    justifyContent: 'flex-start',
    marginHorizontal: 8,
    marginVertical: 10,
    overflow: 'hidden',
    padding: 10,
    width: '46%',
  },
  modalView: {
    alignItems: 'flex-start',
    backgroundColor: colors.activeText,
    borderRadius: 20,
    elevation: 5,
    marginHorizontal: 20,
    marginTop: 150,

    padding: 35,
    //
    // ///  shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    //
    // shadowRadius: 4,
  },
  name: {
    color: colors.nameColor,
    fontWeight: '700',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rates: {
    fontSize: 14,
    padding: 5,
  },
  rating_block: {
    alignItems: 'center',
    borderColor: colors.grey,
    borderStyle: 'solid',
    borderWidth: 0.5,
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 4,
    width: 180,
  },
  slash: {
    backgroundColor: colors.grey,
    height: '100%',
    marginHorizontal: 10,
    width: 1,
  },
  textContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  textStyle: {
    // color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
})
