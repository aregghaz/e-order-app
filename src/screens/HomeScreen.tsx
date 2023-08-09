import { useFocusEffect } from '@react-navigation/native'
import { ScrollView, View } from 'native-base'
import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

import { fakeData } from '~FakeData'
import { SHOP_API } from '~api'
import CarouselComponent from '~components/CarouselComponent'
import CircleCategories from '~components/CricleCategories'
import FeaturedItems from '~components/FeaturedItems'
import OfferPosterSlider from '~components/OfferPosterSlider'
import TopDiscountItems from '~components/TopDiscountItems'
import TopRatedItems from '~components/TopRatedItems'
import { getShopId } from '~services/ShopService'

const { slides } = fakeData.homeScreen

export const HomeScreen = (props: HomeScreenProps): JSX.Element => {
  const { navigation } = props
  const [categories, setCategories] = useState([])
  const [topDiscount, setTopDiscount] = useState([])
  // const [featured, setFeatured] = useState([])
  // const [newArrival, setNewArrival] = useState([])
  // const [bestSeller, setBestSeller] = useState([])
  // const [topRated, setTopRated] = useState([])
  const [shopId, setShopId] = useState('')

  useEffect(() => {
    const getFetchID = async () => {
      const getID = await getShopId()
      setShopId(getID)
    }
    getFetchID()
  }, [shopId])
  useFocusEffect(
    useCallback(() => {
      ;(async () => {
        const getAsyncData = async (): Promise<void> => {
          const categoryData = await SHOP_API.getCategory()
          console.log(categoryData, 'categoryData')
          setCategories(categoryData.payload.content)
          const topDiscountData = await SHOP_API.getTopDiscounts()
          setTopDiscount(topDiscountData.payload.content)
          // const featuredData = await SHOP_API.getFeaturedProducts(shopId)
          // setFeatured(featuredData.payload.content)
          // const newArrivalsData = await SHOP_API.getNewArrivals(shopId)
          // setNewArrival(newArrivalsData.payload.content)
          // const bestSellerData = await SHOP_API.getBestSeller(shopId)
          // setBestSeller(bestSellerData.payload.content)
          // const topRatedData = await SHOP_API.getTopRated(shopId)
          // setTopRated(topRatedData.payload.content)
        }
        await getAsyncData()
      })()
    }, [shopId])
  )
  return (
    <ScrollView flex={1} style={styles.main_wrapper}>
      {categories.length > 0 && (
        <CircleCategories navigation={navigation} categories={categories} />
      )}
      <OfferPosterSlider slides={slides} />
      <TopRatedItems navigation={navigation} items={topDiscount} isCategoryProduct={false} />
      <FeaturedItems navigation={navigation} items={topDiscount} />
      <TopDiscountItems navigation={navigation} items={topDiscount} />
      {/*<NewArrivalItems navigation={navigation} items={topDiscount} />*/}
      <CarouselComponent navigation={navigation} items={topDiscount} title="New Arrivals" />
      {/*<BestSellerItems navigation={navigation} items={topDiscount} />*/}
      <CarouselComponent navigation={navigation} items={topDiscount} title="Best Seller" />
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
