/**
 * was created by tigran at 28.06.23
 */
import React, { FC } from 'react'
import { ScrollView } from 'react-native'

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
  return (
    <ScrollView>
      <TopRatedItems items={products} navigation={navigation} isCategoryProduct={true} />
    </ScrollView>
  )
}
