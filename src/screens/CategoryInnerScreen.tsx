/**
 * was created by tigran at 27.06.23
 */
import React, { FC } from 'react'
import { View } from 'react-native'

import { ICategory } from '~types/category'

interface IProps {
  route: any
  product: ICategory
  navigation: object
}

// const locale = 'ru'

export const CategoryInnerScreen: FC<IProps> = ({ product, route, navigation }) => {
  // const id = route.params.id
  console.log(route, '-------')
  console.log(navigation, '+++++')
  return (
    <View>
      {/*<Text>{product.name[locale]}</Text>*/}
      {/*<View>*/}
      {/*  {product.children &&*/}
      {/*    product.children.map((item) => (*/}
      {/*      <View key={item.id}>*/}
      {/*        <Image src="https://codervent.com/mobile/synrok/demo/assets/images/circular-category/01.webp" />*/}
      {/*        /!*<Text>{item.name[locale]}</Text>*!/*/}
      {/*      </View>*/}
      {/*    ))}*/}
      {/*</View>*/}
    </View>
  )
}
