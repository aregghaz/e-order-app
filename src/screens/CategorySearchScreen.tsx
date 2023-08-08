/**
 * was created by tigran at 28.06.23
 */
import React, { FC } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import TopRatedItems from '~components/TopRatedItems'

export const CategorySearchScreen: FC<any> = ({ route, navigation }) => {
  const { products } = route.params
  console.log(products, 'pppp')
  return (
    <ScrollView>
      {products.length > 0 ? (
        <TopRatedItems items={products} navigation={navigation} isCategoryProduct={true} />
      ) : (
        <View style={styles.text_wrapper}>
          <Text style={styles.text}>Nothing found</Text>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
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
