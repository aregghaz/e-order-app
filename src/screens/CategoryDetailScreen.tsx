/**
 * was created by tigran at 28.06.23
 */
import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useCallback, useState } from 'react'
import { ScrollView } from 'react-native'

import { SHOP_API } from '~api'
import TopRatedItems from '~components/TopRatedItems'
//import { ICategory } from '~types/category'

// interface IProps {
//   route: {
//     params: ICategory
//   }
//   navigation: any
// }

export const CategoryDetailScreen: FC<any> = ({ route, navigation }) => {
  const detail = route.params
  const [data, setData] = useState([])
  useFocusEffect(
    useCallback(() => {
      ;(async () => {
        const dataProduct = await SHOP_API.getCategoryProducts(detail.id, 20)
        setData(dataProduct.payload.content.products)
      })()
    }, [detail.id])
  )
  return (
    <ScrollView>
      <TopRatedItems items={data} navigation={navigation} isCategoryProduct={true} />
    </ScrollView>
  )
}
