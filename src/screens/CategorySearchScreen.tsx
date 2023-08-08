/**
 * was created by tigran at 28.06.23
 */
import React, { FC } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

import TopRatedItems from '~components/TopRatedItems'
//import { ICategory } from '~types/category'

// interface IProps {
//   route: {
//     params: ICategory
//   }
//   navigation: any
// }

export const CategorySearchScreen: FC<any> = ({ route, navigation }) => {
  const { products } = route.params
  console.log(products, 'pppp')
  return (
    <ScrollView contentContainerStyle={styles.center_text}>
      {products.length > 0 ? (
        <TopRatedItems items={products} navigation={navigation} isCategoryProduct={true} />
      ) : (
        <Text>Nothing found</Text>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  center_text: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})
