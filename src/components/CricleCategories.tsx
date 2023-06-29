import { Image, ScrollView, Text, View } from 'native-base'
import { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { ICategory } from '~types/category'
import { getVH, getVW, isMedium } from '~utils/breakpoints'

interface ICircleCategories {
  categories: ICategory[]
  navigation: (to: string, param: object) => void
}

//
// export type TCircleCategories = {
//   navigate?: {
//     to: string
//     param: object
//   }
// }
const local = 'ru'
const CircleCategories: FC<ICircleCategories> = ({ categories, navigation }) => {
  // const navigateToCategory = useCallback(
  //   ({ to, param }: { to: string; param: object }) => {
  //     navigation(to, param)
  //   },
  //   [navigation]
  // )
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
        {(categories ?? []).map(({ name, id }) => {
          return (
            <View key={id} style={styles.items}>
              <TouchableOpacity
                // onPress={() => {
                //   if (navigate) navigateToCategory(navigate)
                // }}
                style={styles.categoryButton}
              >
                <Image
                  src="https://codervent.com/mobile/synrok/demo/assets/images/category/04.webp"
                  alt={`category ${name}`}
                  height={isMedium ? 120 : 20}
                  width={isMedium ? 120 : 20}
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
    // height: isMedium ? 170 : 120,
    height: 'auto',
    // maxWidth: 800,
    width: '100%',
  },

  categoryButton: {
    alignItems: 'center',
    flexGrow: 1,
  },

  image: {
    width: '100%',
    // height: isMedium ? 130 : getVW(22),
    // width: isMedium ? 130 : getVW(20),
  },

  items: {
    height: 'auto',
    // marginRight: getVW(10),
    width: getVW(25),
  },

  main: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    // paddingStart: 10,
    width: '100%',
  },

  text: {
    fontSize: getVH(1),
    fontWeight: '500',
    letterSpacing: -0.3,
    lineHeight: 0,
    marginTop: 5,
    textAlign: 'center',
    // backgroundColor: "red",
  },

  textContainer: {
    // backgroundColor: "orange",
    flexGrow: 1,
    justifyContent: 'center',
  },
})

export default CircleCategories
