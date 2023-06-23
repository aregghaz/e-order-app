import { FC } from 'React'
import { Image, ScrollView, Text, View } from 'native-base'
import { useCallback } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

interface ICircleCategories {
  categories: TCircleCategories[]
  navigation: Function
}

export type TCircleCategories = {
  name: string
  image: string
  navigate: {
    to: string
    param: never
  }
}
const CircleCategories: FC<ICircleCategories> = ({ categories, navigation }) => {
  const navigateToCategory = useCallback(
    ({ to, param }: TCircleCategories['navigate']) => {
      navigation(to, param)
    },
    [navigation]
  )
  return (
    <ScrollView
      scrollEnabled={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      horizontal={true}
      style={styles.body}
    >
      {categories.map(({ name, image, navigate }, index) => {
        return (
          <View key={index} style={styles.items}>
            <TouchableOpacity
              onPress={() => {
                navigateToCategory(navigate)
              }}
              style={styles.categoryButton}
            >
              <Image
                // source={require(image)}
                src={image}
                alt={`category ${name}`}
                height={24}
                width={24}
              />
              <Text style={styles.text}>{name}</Text>
            </TouchableOpacity>
          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  body: {
    flexGrow: 0,
    height: 140,
    paddingHorizontal: 20,
    width: '100%',
  },

  categoryButton: {
    alignItems: 'center',
    flexGrow: 1,
    height: '100%',
    width: '100%',
  },

  items: {
    flexGrow: 1,
    height: '100%',
    marginRight: 40,
  },

  text: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
  },
})

export default CircleCategories
