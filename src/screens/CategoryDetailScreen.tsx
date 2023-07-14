/**
 * was created by tigran at 28.06.23
 */
import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useCallback, useState } from 'react'
import { View } from 'react-native'

import { SHOP_API } from '~api'
import TrendingItems from '~components/TrendingItems'
import { ICategory } from '~types/category'

interface IProps {
  route: {
    params: ICategory
  }
  navigation: any
}

export const CategoryDetailScreen: FC<IProps> = ({ route, navigation }) => {
  const detail = route.params
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  useFocusEffect(
    useCallback(() => {
      ;(async () => {
        const dataProduct = await SHOP_API.getCategoryProducts(detail.id, 20, page)
        setData(dataProduct.payload.content.products)
      })()
    }, [detail.id])
  )
  const increment = () => {
    setPage(page + 1)
  }
  return (
    <View>
      <TrendingItems items={data} navigation={navigation} isCategoryProduct onPress={increment} />
    </View>
  )
}
