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
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { ALERT_TYPE } from 'react-native-alert-notification'
import Swiper from 'react-native-swiper'

import { SHOP_API } from '~api'
import { ImgOrSvg } from '~components/ImgOrSvg'
import { ModalWishList } from '~components/ModalWishList'
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
  opacity: '#00000056',
  white: 'white',
  red: '#EF8781',
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
  const scrollViewRef = useRef<any>(null)
  const [value, addOption] = useIncrement()
  const width = Dimensions.get('window').width
  const { params } = route
  const activeItemRef = useRef(null)
  const { isSignedIn } = useAuth()
  const [modalVisible, setModalVisible] = useState(false)
  const { t } = useTranslation()
  const [productId, setProductId] = useState('')

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
    console.log(isSignedIn,'isSignedInisSignedInisSignedInisSignedIn')
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

  // const handlerOpenModal = async () => {
  //   if (wishListName) {
  //     await SHOP_API.createWishList(wishListName);
  //   }
  //   const wishListData = await SHOP_API.getWishList();
  //   setWishList(wishListData.payload.content);
  //   // setModalVisible(!modalVisible);
  //   setModalVisible(true);
  //   setWishListName("");
  // };
  //
  // const handleAddToWishList = () => {
  //   notification("Добавлено в корзину");
  // };

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
          <View>
            <Text>Вложение</Text>
          </View>
          <View style={styles.each}>
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
            // onPress={() => handlerOpenModal()}
            // onPress={() => setModalVisible(true)}
            onPress={() => {
              setModalVisible(true)
              setProductId(params.id)
            }}
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
      {/*<Modal*/}
      {/*  animationType="slide"*/}
      {/*  transparent={true}*/}
      {/*  visible={modalVisible}*/}
      {/*  onRequestClose={() => {*/}
      {/*    setModalVisible(!modalVisible);*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <View style={styles.cover}>*/}
      {/*    <View style={styles.modal_content}>*/}
      {/*      <View style={styles.modal_header}>*/}
      {/*        <Text style={styles.textStyle}>Список избранных</Text>*/}
      {/*        <Pressable onPress={() => setModalVisible(!modalVisible)}>*/}
      {/*          <Text>*/}
      {/*            <Feather name="x" size={24} color="black" />*/}
      {/*          </Text>*/}
      {/*        </Pressable>*/}
      {/*      </View>*/}
      {/*      <View style={styles.wish_list}>*/}
      {/*        <ScrollView>*/}
      {/*          <View>*/}
      {/*            {wishList.length > 0 ? (*/}
      {/*              wishList.map((item: any) => {*/}
      {/*                console.log(item, "ITEM____");*/}
      {/*                return (*/}
      {/*                  <Pressable key={item.id} onPress={handleAddToWishList}>*/}
      {/*                    <View style={styles.wish_list_item__block}>*/}
      {/*                      <Text>{item.name}</Text>*/}
      {/*                    </View>*/}
      {/*                  </Pressable>*/}
      {/*                );*/}
      {/*              })*/}
      {/*            ) : (*/}
      {/*              <View>*/}
      {/*                <Text style={styles.wish_list_text}>Список избранных пуст</Text>*/}
      {/*              </View>*/}
      {/*            )}*/}
      {/*          </View>*/}
      {/*        </ScrollView>*/}
      {/*      </View>*/}
      {/*      <View>*/}
      {/*        <View style={styles.list_text}>*/}
      {/*          <Text>Создать новый список</Text>*/}
      {/*        </View>*/}
      {/*        <View style={styles.create_wish_list}>*/}
      {/*          <TextInput*/}
      {/*            style={styles.input_BG}*/}
      {/*            onChangeText={(value) => {*/}
      {/*              setWishListName(value);*/}
      {/*            }}*/}
      {/*            value={wishListName}*/}
      {/*            placeholder="Отчество"*/}
      {/*          />*/}
      {/*          <Pressable style={styles.button} onPress={() => handlerOpenModal()}>*/}
      {/*            <Text style={styles.button_text}>Создать список</Text>*/}
      {/*          </Pressable>*/}
      {/*        </View>*/}
      {/*      </View>*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*</Modal>*/}
      <ModalWishList
        productId={productId}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
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
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
})
