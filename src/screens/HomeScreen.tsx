import { useFocusEffect } from '@react-navigation/native'
import { ScrollView, View } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'

import { fakeData } from '~FakeData'
import { SHOP_API } from '~api'
import Accessories from '~components/Accessories'
//import Advantages from '~components/Advantages'
import CircleCategories from '~components/CricleCategories'
import OfferPosterSlider from '~components/OfferPosterSlider'
import TopBrands from '~components/TopBrands'
import Trending from '~components/Trending'
import TrendingItems from '~components/TrendingItems'
// import { useAuth } from '~hooks'
// import { ProductInnerScreen } from '~screens/ProductInnerScreen'

const { slides } = fakeData.homeScreen

export const HomeScreen = (props: HomeScreenProps): JSX.Element => {
  const { navigation } = props
  const [data, setData] = useState([])
  const [latest, setLatest] = useState([])
  // const [page, setPage] = useState(1)
  //   const { signOut } = useAuth()

  useFocusEffect(
    React.useCallback(() => {
      ;(async () => {
        const getAsyncData = async (): Promise<void> => {
          const categoryData = await SHOP_API.getCategory()
          // const latestData = await SHOP_API.getLatestProducts(20, page)
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
      {/*<Advantages advantages={advantages} />*/}
      <TrendingItems navigation={navigation} items={latest} />
      <Trending navigation={navigation} items={latest} />
      <TopBrands navigation={navigation} brands={latest} />
      <Accessories navigation={navigation} accessories={latest} />
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
