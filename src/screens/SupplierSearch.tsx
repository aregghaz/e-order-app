/**
 * was created by tigran at 06.09.23
 */
import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useCallback, useState } from 'react'
import { Text, StyleSheet, SafeAreaView, ScrollView, View, ActivityIndicator } from 'react-native'

import { SHOP_API } from '~api'
import TopRatedItems from '~components/TopRatedItems'
import { screenHeight } from '~utils/breakpoints'

interface IProps {
  route: any
  navigation: any
}
export const SupplierSearch: FC<IProps> = ({ route, navigation }) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  useFocusEffect(
    useCallback(() => {
      const getAsyncData = async () => {
        try {
          setLoading(true)
          const data = await SHOP_API.getSupplierData(route.params.id)
          setData(data.payload.content.products)
        } catch (err) {
          console.log(err, 'Error handle')
        } finally {
          setLoading(false)
        }
      }
      getAsyncData()
    }, [])
  )
  return (
    <SafeAreaView>
      <ScrollView>
        {data && data.length > 0 ? (
          loading ? (
            <View style={styles.container}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <TopRatedItems items={data} navigation={navigation} isCategoryProduct={true} />
          )
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
