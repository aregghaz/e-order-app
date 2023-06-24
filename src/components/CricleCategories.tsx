import { Image, ScrollView, Text, View } from 'native-base'
import { FC, useCallback } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { isMedium, screenWidth } from '~utils/breakpoints'

interface ICircleCategories {
  // categories: TCircleCategories[]
  navigation: Function
  categories: (false | TCircleCategories)[]
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
    <View style={styles.main}>
      <ScrollView
        snapToInterval={isMedium ? 120 : (screenWidth * 22) / 100}
        snapToAlignment={'start'}
        snapToStart={true}
        decelerationRate={0}
        // scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        style={styles.body}
        // containerStyle={styles.container}
        // contentContainerStyle={styles.content}
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
                  height={isMedium ? 120 : 20}
                  width={isMedium ? 120 : 20}
                  style={styles.image}
                />
                <Text style={styles.text}>{name}</Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    flexGrow: 0,
    height: isMedium ? 170 : 120,
    maxWidth: 800,
    width: '100%',
  },

  categoryButton: {
    alignItems: 'center',
    flexGrow: 0,
    // flexGrow: 1,
    height: '100%',
    // width: '100%',
  },

  // content: {
  //   width: 10,
  //   // flex: 1,
  //   // justifyContent: 'space-between',
  // },

  // container: {
  //   width: 20,
  // },

  image: {
    height: isMedium ? 120 : (screenWidth * 22) / 100,
    width: isMedium ? 120 : (screenWidth * 22) / 100,
  },

  items: {
    height: '100%',
    marginRight: 10,
  },

  main: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingStart: 10,
    width: '100%',
  },

  text: {
    fontSize: isMedium ? 18 : 12,
    fontWeight: 'bold',
    marginTop: isMedium ? 18 : 10,
  },
})

export default CircleCategories
