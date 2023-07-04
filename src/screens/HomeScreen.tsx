import { useFocusEffect } from '@react-navigation/native'
import { ScrollView, View } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'

import { fakeData } from '~FakeData'
import { SHOP_API } from '~api'
import Accessories from '~components/Accessories'
import Advantages from '~components/Advantages'
import CircleCategories from '~components/CricleCategories'
import OfferPosterSlider from '~components/OfferPosterSlider'
import TopBrands from '~components/TopBrands'
import Trending from '~components/Trending'
import TrendingItems from '~components/TrendingItems'
// import { ProductInnerScreen } from '~screens/ProductInnerScreen'

const { slides, advantages, trendingSecond, brands, accessories } = fakeData.homeScreen

export const HomeScreen = (props: HomeScreenProps): JSX.Element => {
  const { navigation } = props
  const [data, setData] = useState([])
  const [featured, setFeatured] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      ;(async () => {
        const getAsyncData = async (): Promise<void> => {
          const categoryData = await SHOP_API.getCategory()
          const featuredData = await SHOP_API.getLatestProducts()
          setData(categoryData.payload.content)
          setFeatured(featuredData.payload.content)
        }
        await getAsyncData()
      })()

      //  return () => clientData();
    }, [])
  )
  return (
    <ScrollView flex={1} style={styles.main_wrapper}>
      {data.length > 0 && <CircleCategories navigation={navigation} categories={data} />}
      <OfferPosterSlider slides={slides} />
      <Advantages advantages={advantages} />
      <TrendingItems navigation={navigation} items={featured} />
      <Trending name={'Shoes'} items={trendingSecond} />
      <TopBrands brands={brands} />
      <Accessories accessories={accessories} />
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
