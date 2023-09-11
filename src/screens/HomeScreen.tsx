import { useFocusEffect } from '@react-navigation/native'
import { ScrollView, View } from 'native-base'
import React, { useCallback, useState } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { SHOP_API } from '~api'
///import CarouselComponent from '~components/CarouselComponent'
///import BestSellerItems from '~components/BestSellerItems'
import CircleCategories from '~components/CricleCategories'
import FeaturedItems from '~components/FeaturedItems'
import NewArrivalItems from '~components/NewArrivalItems'
///import OfferPosterSlider from '~components/OfferPosterSlider'
import TopDiscountItems from '~components/TopDiscountItems'
import TopRatedItems from '~components/TopRatedItems'
import { getShopId, notification, setShopId } from '~services/ShopService'
import { useAuth, useTranslation } from '~hooks'
import { ALERT_TYPE } from 'react-native-alert-notification'
//
// const { slides } = fakeData.homeScreen

const options = {
  shopId: null,
  page: null,
  limit: null,
}
export const HomeScreen = ({ navigation }: any): JSX.Element => {
  const [categories, setCategories] = useState([])
  const [topDiscount, setTopDiscount] = useState([])
  const [featured, setFeatured] = useState([])
  const [newArrival, setNewArrival] = useState([])
  const [bestSeller, setBestSeller] = useState([])
  const [topRated, setTopRated] = useState([])
  const [shopId, setShopDefaultId] = useState('')
  const [laoding, setLoading] = useState(false)
  const { isSignedIn } = useAuth()
  const { t } = useTranslation()
  useFocusEffect(
    useCallback(() => {
      const getAsyncData = async (): Promise<void> => {
        if (isSignedIn) {
          const getID = await getShopId()
          console.log(getID, 'getIDgetID')
          if (!getID) {
            const shopData = await SHOP_API.getShopsData()
            console.log(shopData, 'shopDatashopData')
            if (shopData.payload.content.length > 0) {
              await setShopId(shopData.payload.content[0].id)
              setShopDefaultId(shopData.payload.content[0].id)
            }
            // else{
            //   await notification(t('shop.add'), ALERT_TYPE.WARNING)
            // }
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
    }, [shopId])
  )
  return laoding ? (
    <ScrollView flex={1} style={styles.main_wrapper}>
      {categories.length > 0 && (
        <CircleCategories navigation={navigation} categories={categories} />
      )}
      {/*<OfferPosterSlider slides={slides} />*/}
      <TopRatedItems navigation={navigation} items={topRated} isCategoryProduct={false} />
      <FeaturedItems navigation={navigation} items={featured} />
      <TopDiscountItems navigation={navigation} items={topDiscount} />
      <NewArrivalItems navigation={navigation} title={'New Arrival'} items={newArrival} />
      <NewArrivalItems navigation={navigation} title={'Best Seller'} items={bestSeller} />
      <View style={styles.dummy}></View>
    </ScrollView>
  ) : (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  dummy: {
    width: '100%',
  },

  main_wrapper: {
    height: 'auto',
    paddingVertical: 20,
  },
})
