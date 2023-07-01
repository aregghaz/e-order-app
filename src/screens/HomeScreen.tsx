import { ScrollView, View } from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

import { fakeData } from '~FakeData'
import { HomeApi } from '~api/home-api'
import Accessories from '~components/Accessories'
import Advantages from '~components/Advantages'
import CircleCategories from '~components/CricleCategories'
import OfferPosterSlider from '~components/OfferPosterSlider'
import TopBrands from '~components/TopBrands'
import Trending from '~components/Trending'
import TrendingItems from '~components/TrendingItems'

const { slides, advantages, trending, trendingSecond, brands, accessories } = fakeData.homeScreen

export const HomeScreen = (props: HomeScreenProps): JSX.Element => {
  const {
    navigation: { navigate },
  } = props
  const [data, setData] = useState([])

  useEffect(() => {
    const getAsyncCategory = async (): Promise<void> => {
      const categoryData = await HomeApi.getCategory()
      setData(categoryData.payload.content)
    }
    getAsyncCategory()
  }, [])

  return (
    <ScrollView flex={1} style={styles.main_wrapper}>
      {data.length > 0 && <CircleCategories navigation={navigate} categories={data} />}
      <OfferPosterSlider navigation={navigate} slides={slides} />
      <Advantages advantages={advantages} />
      <TrendingItems items={trending} />
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
