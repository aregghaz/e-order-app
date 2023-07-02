import { Image, ScrollView, Text, View } from 'native-base'
import { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { getImagePath } from '~api'
import { SCREEN } from '~constants'
import { ICategory } from '~types/category'
import { getVW } from '~utils/breakpoints'

interface ICircleCategories {
  categories: ICategory[]
  navigation: (to: string, param: object) => void
}

const local = 'ru'
const CircleCategories: FC<ICircleCategories> = ({ categories, navigation }) => {
  return (
    <View style={styles.main}>
      <ScrollView
        snapToInterval={getVW(25)}
        snapToAlignment={'start'}
        snapToStart={true}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        style={styles.body}
      >
        {(categories ?? []).map((item) => {
          const { name, id, mainImage } = item
          return (
            <View key={id} style={styles.items}>
              <TouchableOpacity
                onPress={() => {
                  navigation(SCREEN.STACK_CATEGORY_INNER, item)
                }}
                style={styles.categoryButton}
              >
                <Image
                  src={`${getImagePath(mainImage?.filename)}`}
                  alt={`category ${name}`}
                  style={styles.image}
                  resizeMode={'contain'}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{name[local]}</Text>
                </View>
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
    width: '100%',
  },

  categoryButton: {
    alignItems: 'center',
    flexGrow: 1,
    height: 100,
    padding: 4,
    width: 100,
  },

  image: {
    aspectRatio: 1,
    borderRadius: 50,
    // resizeMode: 'contain',
    width: '100%',
  },

  items: {
    paddingBottom: 100,
    width: getVW(25),
  },

  main: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },

  text: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: -0.3,
    marginTop: 5,
    textAlign: 'center',
  },

  textContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
})

export default CircleCategories
