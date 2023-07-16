import { ScrollView, Image } from 'native-base'
import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

import { SHOP_API, getImagePath } from '~api'
import { SCREEN } from '~constants'
import { ICategory } from '~types/category'
///import NoImage from "../../assets/svg/NoImage";

const locale = 'ru'
export const CategoryScreen = (props: ExamplesScreenProps): JSX.Element => {
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
      console.log(category, 'varod!!!!x')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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
                  <Image
                    src={`${getImagePath(category.mainImage?.filename)}`}
                    alt="gweger"
                    style={styles.image}
                  />
                  {/*<NoImage />*/}
                </View>
              </TouchableWithoutFeedback>
            )
          })}
      </View>
      {/*<Center>*/}
      {/*<Button size="lg" width="64" mb={2} onPress={goToApplicationInfo}>*/}
      {/*  {t('examples_screen.go_to_application_info')}*/}
      {/*</Button>*/}
      {/*<Button size="lg" width="64" mb={2} onPress={goToColors}>*/}
      {/*  {t('examples_screen.go_to_colors')}*/}
      {/*</Button>*/}
      {/*<Button size="lg" width="64" mb={2} onPress={goToComponents}>*/}
      {/*  {t('examples_screen.go_to_components')}*/}
      {/*</Button>*/}
      {/*<Button size="lg" width="64" mb={2} onPress={goToTypography}>*/}
      {/*  {t('examples_screen.go_to_typography')}*/}
      {/*</Button>*/}
      {/*<Button size="lg" width="64" mb={2} onPress={goToHomeStackDetails}>*/}
      {/*  {t('examples_screen.go_to_home_stack_details')}*/}
      {/*</Button>*/}
      {/*<Button size="lg" width="64" mb={2} onPress={goToAppSettings}>*/}
      {/*  {t('examples_screen.go_to_settings')}*/}
      {/*</Button>*/}
      {/*</Center>*/}
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
  image: {
    borderRadius: 50,
    height: 100,
    marginLeft: 10,
    // resizeMode: 'contain',
    width: 100,
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
