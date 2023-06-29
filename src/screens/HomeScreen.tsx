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
    const getAsyncCategory = async () => {
      const categoryData = await HomeApi.getCategory()
      setData(categoryData.payload.content)
    }
    getAsyncCategory()
  }, [])

  return (
    <ScrollView flex={1} style={styles.main_wrapper}>
      {data.length > 0 && <CircleCategories categories={data} />}
      <OfferPosterSlider navigation={navigate} slides={slides} />
      <Advantages advantages={advantages} />
      <TrendingItems items={trending} />
      <Trending name={'Shoes'} items={trendingSecond} />
      <TopBrands brands={brands} />
      <Accessories accessories={accessories} />
      <View style={styles.dummy}></View>
      {/*<Image*/}
      {/*  source={require('~assets/logo.png')}*/}
      {/*  resizeMode="contain"*/}
      {/*  resizeMethod="resize"*/}
      {/*  height={24}*/}
      {/*  alt="logo"*/}
      {/*/>*/}
      {/*<Text textAlign="center">{t('hello')}</Text>*/}
      {/*<Text textAlign="center">{t('thanks')}</Text>*/}
      {/*<Text textAlign="center">{t('app_information')}</Text>*/}
      {/*<Button mt={4} onPress={navigateToDetails}>*/}
      {/*  {t('home_screen.details')}*/}
      {/*</Button>*/}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  dummy: {
    // height: 500,
    width: '100%',
  },

  main_wrapper: {
    paddingVertical: 20,
  },
})
