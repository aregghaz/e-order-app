import { useFocusEffect } from '@react-navigation/native'
import { ScrollView, View } from 'native-base'
import React, { useCallback, useState } from 'react'
import { StyleSheet } from 'react-native'

import { fakeData } from '~FakeData'
import { SHOP_API } from '~api'
///import CarouselComponent from '~components/CarouselComponent'
import BestSellerItems from '~components/BestSellerItems'
import CircleCategories from '~components/CricleCategories'
import FeaturedItems from '~components/FeaturedItems'
import NewArrivalItems from '~components/NewArrivalItems'
import OfferPosterSlider from '~components/OfferPosterSlider'
import TopDiscountItems from '~components/TopDiscountItems'
import TopRatedItems from '~components/TopRatedItems'
import { getShopId } from '~services/ShopService'

const { slides } = fakeData.homeScreen

const options = {
  shopId: null,
  page: null,
  limit: null,
}
export const HomeScreen = (props: HomeScreenProps): JSX.Element => {
  const { navigation } = props
  const [categories, setCategories] = useState([])
  const [topDiscount, setTopDiscount] = useState([])
  const [featured, setFeatured] = useState([])
  const [newArrival, setNewArrival] = useState([])
  const [bestSeller, setBestSeller] = useState([])
  const [topRated, setTopRated] = useState([])
  const [shopId, setShopId] = useState('')

  // useEffect(() => {
  //   const getFetchID = async () => {
  //     const getID = await getShopId();
  //     setShopId(getID);
  //   };
  //   getFetchID();
  // }, [shopId]);
  useFocusEffect(
    useCallback(() => {
      const getAsyncData = async (): Promise<void> => {
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
        const getID = await getShopId()
        setShopId(getID)
      }
      getAsyncData()
    }, [shopId])
  )
  console.log(shopId, '__SHOP_ID')
  return (
    <ScrollView flex={1} style={styles.main_wrapper}>
      {categories.length > 0 && (
        <CircleCategories navigation={navigation} categories={categories} />
      )}
      <OfferPosterSlider slides={slides} />
      <TopRatedItems navigation={navigation} items={topRated} isCategoryProduct={false} />
      <FeaturedItems navigation={navigation} items={featured} />
      <TopDiscountItems navigation={navigation} items={topDiscount} />
      <NewArrivalItems navigation={navigation} items={newArrival} />
      {/*<CarouselComponent navigation={navigation} items={newArrival} title="New Arrivals" />*/}
      <BestSellerItems navigation={navigation} items={bestSeller} />
      {/*<CarouselComponent navigation={navigation} items={bestSeller} title="Best Seller" />*/}
      <View style={styles.dummy}></View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  dummy: {
    width: '100%',
  },

  main_wrapper: {
    paddingVertical: 20,
  },
})
