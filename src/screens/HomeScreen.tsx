import { useFocusEffect } from '@react-navigation/native'
import { ScrollView, View } from 'native-base'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, StyleSheet, Text } from 'react-native'

import { SHOP_API } from '~api'
///import CarouselComponent from '~components/CarouselComponent'
///import BestSellerItems from '~components/BestSellerItems'
import CircleCategories from '~components/CricleCategories'
import FeaturedItems from '~components/FeaturedItems'
import NewArrivalItems from '~components/NewArrivalItems'
///import OfferPosterSlider from '~components/OfferPosterSlider'
import TopDiscountItems from '~components/TopDiscountItems'
import TopRatedItems from '~components/TopRatedItems'
import { useAuth, useGlobal } from '~hooks'
import { optionForScreen } from '~navigation/HeaderGlobalStyles'
import { getShopId, setShopId } from '~services/ShopService'
// import { getUserData } from "~services/UserService";
//
// const { slides } = fakeData.homeScreen

const options = {
  shopId: null,
  page: null,
  limit: null,
}

const colors = {
  white: 'white',
  grey: '#9a9a9a',
}
export const HomeScreen = ({ navigation }: any): JSX.Element => {
  const [categories, setCategories] = useState([])
  const [topDiscount, setTopDiscount] = useState([])
  const [featured, setFeatured] = useState([])
  const [newArrival, setNewArrival] = useState([])
  const [bestSeller, setBestSeller] = useState([])
  const [topRated, setTopRated] = useState([])
  const [defaultShop, setDefaultShop] = useState<any>({})
  const [shopId, setShopDefaultId] = useState('')
  const [laoding, setLoading] = useState(false)
  const { isSignedIn } = useAuth()
  const { shop_id, setShop_id, userData } = useGlobal()
  const { t } = useTranslation()
  // const { t } = useTranslation()

  useFocusEffect(
    useCallback(() => {
      const getAsyncData = async (): Promise<void> => {
        if (isSignedIn) {
          const getID = await getShopId()
          const shopData = await SHOP_API.getShopsData()
          const defStore = shopData.payload.content.find((shop: any) => shop.id === getID)
          if (defStore === undefined) setDefaultShop({})
          setDefaultShop(defStore)
          if (!getID) {
            if (shopData.payload.content.length > 0) {
              await setShopId(shopData.payload.content[0].id)
              setDefaultShop(shopData.payload.content[0])
              setShopDefaultId(shopData.payload.content[0].id)
              setShop_id(shopData.payload.content[0].id)
            }
          } else {
            setShopDefaultId(getID)
          }
        }

        const categoryData = await SHOP_API.getCategory()
        setCategories(categoryData.payload.content)
        const topDiscountData = await SHOP_API.getTopDiscounts(options)
        setTopDiscount(topDiscountData.payload.content)
        const featuredData = await SHOP_API.getFeaturedProducts(options)
        setFeatured(featuredData.payload.content)
        const newArrivalsData = await SHOP_API.getNewArrivals(options)
        setNewArrival(newArrivalsData.payload.content)
        const bestSellerData = await SHOP_API.getBestSeller(options)
        setBestSeller(bestSellerData.payload.content)
        const topRatedData = await SHOP_API.getTopRated(options)
        setTopRated(topRatedData.payload.content)
        setLoading(true)
      }
      getAsyncData()
    }, [shopId, shop_id, userData])
  )
  return laoding ? (
    <>
      {Object.keys(defaultShop).length > 0 && (
        <View style={[optionForScreen.addressOption, styles.address_bar]}>
          <Text style={styles.store_title}>{t('store_name_alt')} : </Text>
          <Text style={styles.store_title_address}>
            {defaultShop?.companyName}, {defaultShop?.deliveryAddress?.address_1},
          </Text>
          <Text style={styles.store_title_address}>
            {defaultShop?.legalAddress?.address_1}, {defaultShop?.legalAddress?.address_2}
          </Text>
        </View>
      )}
      <ScrollView flex={1} contentContainerStyle={styles.main_wrapper}>
        {categories.length > 0 && (
          <CircleCategories navigation={navigation} categories={categories} />
        )}
        {/*<OfferPosterSlider slides={slides} />*/}
        <TopRatedItems navigation={navigation} items={topRated} isCategoryProduct={false} />
        <FeaturedItems navigation={navigation} items={featured} />
        <TopDiscountItems navigation={navigation} items={topDiscount} />
        <NewArrivalItems navigation={navigation} title={t('new_arrival')} items={newArrival} />
        <NewArrivalItems navigation={navigation} title={t('best_seller')} items={bestSeller} />
        <View style={styles.dummy}></View>
      </ScrollView>
    </>
  ) : (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  address_bar: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  dummy: {
    width: '100%',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },

  main_wrapper: {
    height: 'auto',
    paddingVertical: 20,
  },
  store_title: {
    textAlign: 'center',
  },
  store_title_address: {
    color: colors.grey,
    fontSize: 11,
    // fontWeight: 'bold',
    letterSpacing: 0.6,
    textAlign: 'center',
  },
})
