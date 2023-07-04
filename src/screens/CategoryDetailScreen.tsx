/**
 * was created by tigran at 28.06.23
 */
import { Image } from 'native-base'
import React, { FC, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { ICategory } from '~types/category'

const locale = 'ru'

interface IProps {
  route: {
    params: ICategory
  }
  navigation: any
}

export const CategoryDetailScreen: FC<IProps> = ({ route, navigation }) => {
  const [detail] = useState(route.params)
  console.log(detail, 'detaildetail')
  return (
    <View style={styles.detail_wrapper}>
      <Image
        src="https://codervent.com/mobile/synrok/demo/assets/images/shop/02.webp"
        alt="gweger"
        style={styles.image}
      />
      <Text style={styles.detail_title}>{detail.name[locale]}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  detail_title: {
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 20,
    textAlign: 'center',
  },
  detail_wrapper: {},
  image: {
    aspectRatio: 4 / 5,
    height: undefined,
    width: '100%',
  },
})
