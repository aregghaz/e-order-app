/**
 * was created by tigran at 27.06.23
 */
import { Image } from 'native-base'
import React, { FC, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { SCREEN } from '~constants'
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
  const goToDetails = (item: ICategory) => navigation.navigate(SCREEN.STACK_CATEGORY_DETAIL, item)
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
              <View>
                <Image
                  style={styles.image}
                  // src="https://codervent.com/mobile/synrok/demo/assets/images/shop/01.webp"
                  // src='https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg'
                  src="https://simplot-media.azureedge.net/-/media/feature/simplotfoods/components/data/blog/blog-posts/unicorn-salad.jpg?rev=90dabe21a5984a969e92a632d369e5b9"
                  alt={item.name[locale]}
                />
              </View>
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
    padding: 10,
    width,
  },
  image: {
    // aspectRatio: 2 / 3,
    aspectRatio: 1,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: 'center',
  },
})
