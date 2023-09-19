/**
 * was created by tigran at 06.09.23
 */
import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useCallback, useState } from 'react'
import { Text, StyleSheet, SafeAreaView, ScrollView, View, ActivityIndicator } from 'react-native'

import { SHOP_API } from '~api'
import TopRatedItems from '~components/TopRatedItems'
import { getShopId } from '~services/ShopService'
import { screenHeight } from '~utils/breakpoints'

interface IProps {
  route: any
  navigation: any
}
export const SupplierSearch: FC<IProps> = ({ route, navigation }) => {
  // console.log(route, 'route!!!')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  useFocusEffect(
    useCallback(() => {
      const getAsyncData = async () => {
        try {
          setLoading(true)
          const getID = await getShopId()
          const data = await SHOP_API.getSupplierData(route.params.id, getID)
          setData(data.payload.content.products)
        } catch (err) {
          console.log(err, 'Error handle')
        } finally {
          setLoading(false)
        }
      }
      getAsyncData()
    }, [route.params.id])
  )
  return (
    <SafeAreaView>
      <ScrollView>
        {loading ? (
          <View style={styles.container}>
            <ActivityIndicator size="large" />
          </View>
        ) : data && data.length > 0 ? (
          <TopRatedItems
            items={data}
            navigation={navigation}
            isCategoryProduct={true}
            companyName={route.params.name}
            supplierId={route.params.id}
          />
        ) : (
          <View style={styles.text_wrapper}>
            <Text style={styles.text}>Nothing found</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: screenHeight - 100,
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
  text_wrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
  },
})
