/**
 * was created by tigran at 24.06.23
 */
import { Feather, Ionicons } from '@expo/vector-icons'
// import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { SHOP_API } from '~api'
import { SCREEN } from '~constants'
import { useAuth, useGlobal } from '~hooks'
// import { getShopId } from '~services/ShopService'

const width = Dimensions.get('window').width - 30

interface IProps {
  title?: string
  navigation?: any
}

export const Header: FC<IProps> = ({ title, navigation }) => {
  const [search, setSearch] = useState(false)
  const [text, setText] = useState('')
  // const [countIndicator, setCountIndicator] = useState<null | number>(null)
  const { isSignedIn } = useAuth()
  const { indicatorCount } = useGlobal()
  const { t } = useTranslation()
  // useFocusEffect(
  //   useCallback(() => {
  //     const getShopCartCount = async () => {
  //       const getID = await getShopId()
  //       console.log(getID, '333333')
  //
  //       if (getID) {
  //         console.log(getID, '1111111111')
  //
  //         const count = await SHOP_API.getShopCarts(getID)
  //
  //         // if (count) {
  //         //   setCountIndicator(count.payload.content.length)
  //         // } else {
  //         //   setCountIndicator(0)
  //         // }
  //       } else {
  //         setCountIndicator(0)
  //       }
  //     }
  //     getShopCartCount()
  //   }, [countIndicator, isSignedIn])
  // )

  const handleOpenMenu = useCallback(() => {
    navigation.openDrawer()
  }, [navigation])

  const handleSearch = (value: string) => {
    setText(value)
  }

  const handleRequest = async () => {
    setSearch(false)
    // setText('')
    const result = await SHOP_API.getSearchedValues(text)
    const products = result.payload.content
    if (products) {
      // navigation.navigate(SCREEN.DRAWER_ROOT, {
      //   screen: SCREEN.STACK_MAIN_TAB,
      //   params: {
      //     screen: SCREEN.TAB_CATEGORY,
      //     params: {
      //       screen: SCREEN.STACK_CATEGORY_SEARCH,
      //       params: products,
      //     },
      //   },
      // })
      navigation.navigate(SCREEN.STACK_CATEGORY_SEARCH, products)
    }
  }

  const handleWishlist = () => {
    if (!isSignedIn) {
      navigation.navigate(SCREEN.STACK_SIGN_IN)
    } else {
      navigation.navigate(SCREEN.STACK_WISHLIST)
    }
  }
  const handleShopCart = () => {
    if (!isSignedIn) {
      navigation.navigate(SCREEN.STACK_SIGN_IN)
    } else {
      navigation.navigate(SCREEN.STACK_SHOP_CART)
    }
  }

  const goBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])
  return (
    <View style={styles.header_wrapper}>
      {search && (
        <View style={styles.search_block}>
          <TextInput
            style={styles.search_input}
            value={text}
            onChangeText={handleSearch}
            placeholder={t('common.search_alt')}
            onSubmitEditing={handleRequest}
          />
          <Feather name="x" size={24} style={styles.icons} onPress={() => setSearch(false)} />
        </View>
      )}
      <View style={styles.is_back}>
        <TouchableOpacity>
          <Feather name="menu" size={25} onPress={handleOpenMenu} style={styles.icons} />
        </TouchableOpacity>
        {title && (
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={25} onPress={goBack} style={[styles.icons]} />
          </TouchableOpacity>
        )}
        <Text style={styles.font}>{title}</Text>
      </View>
      <View style={styles.icon_blocks}>
        <TouchableOpacity>
          <Feather name="search" size={25} style={styles.icons} onPress={() => setSearch(true)} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="heart" size={25} style={styles.icons} onPress={handleWishlist} />
        </TouchableOpacity>
        <Pressable style={styles.cart_wrapper}>
          <Feather name="shopping-bag" size={25} style={styles.icons} onPress={handleShopCart} />
          {isSignedIn && (
            <View style={styles.cart_bandage}>
              {/*<Text style={styles.indicator}>{countIndicator}</Text>*/}
              <Text style={styles.indicator}>{indicatorCount}</Text>
              {/*<Text style={styles.indicator}>0</Text>*/}
            </View>
          )}
        </Pressable>
      </View>
    </View>
  )
}

const colors = {
  white: 'white',
  red: 'red',
}

const styles = StyleSheet.create({
  cart_bandage: {
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 30,
    height: 23,
    justifyContent: 'center',
    pointerEvents: 'none',
    position: 'absolute',
    right: -2,
    top: -10,
    width: 23,
  },
  cart_wrapper: {
    position: 'relative',
    // ...customStyles.border(1, "solid", "red")
  },
  font: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    fontSize: 16,
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  header_wrapper: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    width,
  },
  icon_blocks: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icons: {
    marginHorizontal: 8,
  },
  indicator: {
    color: colors.white,
  },
  is_back: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  search_block: {
    alignItems: 'center',
    backgroundColor: colors.white,
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    zIndex: 1,
  },
  search_input: {
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 0.5,
    padding: 10,
    width: '80%',
  },
})
