import { ScrollView } from 'native-base'
import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

import { SHOP_API } from '~api'
import { ImgOrSvg } from '~components/ImgOrSvg'
import { SCREEN } from '~constants'
import { ICategory } from '~types/category'

const locale = 'ru'
export const CategoryScreen = (props: any) => {
  const [categories, setCategories] = useState([])
  const {
    navigation: { navigate },
  } = props

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await SHOP_API.getCategory()
      setCategories(categories.payload.content)
    }
    fetchCategories()
  }, [locale])

  const goToCategoryStackDetails = useCallback(
    (category: ICategory) => {
      return navigate(SCREEN.STACK_CATEGORY_INNER, category)
    },
    [navigate]
  )
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.inner_scroll}>
        {categories &&
          categories.map((category: ICategory) => {
            return (
              <TouchableWithoutFeedback
                key={category.id}
                onPress={() => goToCategoryStackDetails(category)}
              >
                <View style={styles.category_block__wrapper}>
                  <Text style={styles.synchronized_block}>{category.name[locale]}</Text>
                  <View style={styles.img_wrapper}>
                    <ImgOrSvg item={category} radius={100} width={100} />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )
          })}
      </View>
    </ScrollView>
  )
}
const colors = {
  grey: '#ddd',
}
const styles = StyleSheet.create({
  category_block__wrapper: {
    alignItems: 'center',
    borderColor: colors.grey,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 16,
  },
  img_wrapper: {
    marginLeft: 10,
  },
  inner_scroll: {
    paddingVertical: 10,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  synchronized_block: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 20,
    fontWeight: '700',
  },
})
