/**
 * was created by tigran at 27.06.23
 */
import { Image } from 'native-base'
import React, { FC, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { ICategory } from '~types/category'

interface IProps {
  route: {
    params: ICategory
  }
  navigation: any
}

const locale = 'ru'

export const CategoryInnerScreen: FC<IProps> = ({ route, navigation }) => {
  const [categories] = useState<ICategory[]>(route.params.children)
  console.log(categories, 'categoriescategoriescategories')
  const goToDetails = (item: ICategory) => navigation.navigate('CategoryDetail', item)
  const numColumns = 2
  return (
    <View>
      <FlatList
        numColumns={numColumns}
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => goToDetails(item)}>
            <View style={styles.category_wrap}>
              <Image
                style={styles.image}
                src="https://codervent.com/mobile/synrok/demo/assets/images/shop/01.webp"
                alt={item.name[locale]}
              />
              <Text style={styles.title}>{item.name[locale]}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
const width = Dimensions.get('window').width / 2

const styles = StyleSheet.create({
  category_wrap: {
    flex: 1,
    width,
  },
  image: {
    aspectRatio: 2 / 3,
    height: undefined,
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 20,
    textAlign: 'center',
  },
})
