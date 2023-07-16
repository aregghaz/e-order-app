import { useFocusEffect } from '@react-navigation/native'
import { ScrollView, View } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'

import { fakeData } from '~FakeData'
import { SHOP_API } from '~api'
import BestSellerItems from '~components/BestSellerItems'
import CircleCategories from '~components/CricleCategories'
import FeaturedItems from '~components/FeaturedItems'
import LatestItems from '~components/LatestItems'
import NewArrivalItems from '~components/NewArrivalItems'
import OfferPosterSlider from '~components/OfferPosterSlider'

const { slides } = fakeData.homeScreen

export const HomeScreen = (props: HomeScreenProps): JSX.Element => {
  const { navigation } = props
  const [data, setData] = useState([])
  const [latest, setLatest] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      ;(async () => {
        const getAsyncData = async (): Promise<void> => {
          const categoryData = await SHOP_API.getCategory()
          const latestData = await SHOP_API.getLatestProducts()
          setData(categoryData.payload.content)
          setLatest(latestData.payload.content)
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
      <LatestItems navigation={navigation} items={latest} isCategoryProduct={false} />
      <FeaturedItems navigation={navigation} items={latest} />
      <NewArrivalItems navigation={navigation} items={latest} />
      <BestSellerItems navigation={navigation} items={latest} />
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
