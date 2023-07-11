/**
 * was created by tigran at 28.06.23
 */
// import { Image } from 'native-base'
import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useCallback, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import { SHOP_API } from '~api'
import TrendingItems from '~components/TrendingItems'
import { ICategory } from '~types/category'

// const locale = 'ru'

interface IProps {
  route: {
    params: ICategory
  }
  navigation: any
}

export const CategoryDetailScreen: FC<IProps> = ({ route, navigation }) => {
  const detail = route.params
  const [data, setData] = useState([])
  // console.log(detail, "detail!!!!")
  useFocusEffect(
    useCallback(() => {
      ;(async () => {
        const dataProduct = await SHOP_API.getCategoryProducts(detail.id)
        // console.log(dataProduct.payload.content.products, "datatattat")
        setData(dataProduct.payload.content.products)
      })()
    }, [detail.id])
  )
  return (
    <View style={styles.detail_wrapper}>
      <TrendingItems items={data} navigation={navigation} isCategoryProduct />
      {/*<Image*/}
      {/*  // src="https://codervent.com/mobile/synrok/demo/assets/images/shop/02.webp"*/}
      {/*  // src='https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg'*/}
      {/*  src="https://simplot-media.azureedge.net/-/media/feature/simplotfoods/components/data/blog/blog-posts/unicorn-salad.jpg?rev=90dabe21a5984a969e92a632d369e5b9"*/}
      {/*  alt="gweger"*/}
      {/*  style={styles.image}*/}
      {/*/>*/}
      {/*<Text style={styles.detail_title}>{detail.name[locale]}</Text>*/}
    </View>
  )
}

const styles = StyleSheet.create({
  // detail_title: {
  //   fontWeight: 'bold',
  //   paddingHorizontal: 10,
  //   paddingVertical: 20,
  //   textAlign: 'center',
  // },
  detail_wrapper: {},
  // image: {
  //   // aspectRatio: 4 / 5,
  //   aspectRatio: 1,
  //   height: undefined,
  //   width: '100%',
  // },
})
