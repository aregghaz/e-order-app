import { useFocusEffect } from '@react-navigation/native'
import { ScrollView, View } from 'native-base'
import React, { useCallback, useState } from 'react'
import { StyleSheet } from 'react-native'
import { SHOP_API } from '~api'
///import CarouselComponent from '~components/CarouselComponent'
///import BestSellerItems from '~components/BestSellerItems'
import CircleCategories from '~components/CricleCategories'
import FeaturedItems from '~components/FeaturedItems'
import NewArrivalItems from '~components/NewArrivalItems'
///import OfferPosterSlider from '~components/OfferPosterSlider'
import TopDiscountItems from '~components/TopDiscountItems'
import TopRatedItems from '~components/TopRatedItems'
import { getShopId, setShopId } from '~services/ShopService'
import { useAuth } from '~hooks'
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
  const { isSignedIn } = useAuth()

  useFocusEffect(
    useCallback(() => {
      const getAsyncData = async (): Promise<void> => {
        const getID = await getShopId()

        if (isSignedIn && !getID && getID.length > 0) {
          const shopData = await SHOP_API.getShopsData()
          await setShopId(shopData.payload.content[0].id)
          setShopDefaultId(shopData.payload.content[0].id)
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

        setShopDefaultId(getID)
      }
      getAsyncData()
    }, [shopId])
  )
  return (
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
  )
}

const styles = StyleSheet.create({
  dummy: {
    width: '100%',
  },

  main_wrapper: {
    height: 'auto',
    paddingVertical: 20,
  },
})
