/**
 * was created by tigran at 27.06.23
 */
import React, { FC } from 'react'
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { ImgOrSvg } from '~components/ImgOrSvg'
import { SCREEN } from '~constants'
import { ICategory } from '~types/category'

interface IProps {
  route: {
    params: ICategory
  }
  navigation: any
}

const locale = 'ru'
const width = Dimensions.get('window').width / 2
const padding = 10
export const CategoryInnerScreen: FC<IProps> = ({ route, navigation }) => {
  const categories = route.params.children
  const goToDetails = (item: ICategory) => {
    if (item.children.length > 0) {
      navigation.navigate(SCREEN.STACK_CATEGORY_INNER, item)
    } else {
      navigation.navigate(SCREEN.STACK_CATEGORY_DETAIL, item)
    }
  }
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
              <ImgOrSvg item={item} radius={width} padding={padding} />
              <Text style={styles.title}>{item.name[locale]}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  category_wrap: {
    flex: 1,
    padding,
    width,
  },
  title: {
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: 'center',
  },
})
