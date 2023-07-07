import { View, Text, Image } from 'native-base'
import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-snap-carousel'

import { getImagePath } from '~api'
import { SCREEN } from '~constants'
import { IFeatured } from '~types/featuredProducts'
import { getVH, getVW, screenWidth } from '~utils/breakpoints'

export type TTrendingItems = {
  id: number
  image: string
  name: string
}

interface ITrending {
  items: IFeatured[]
  navigation: any
}

// const Trending: FC<ITrending> = ({ name, items }) => {
const Trending: FC<ITrending> = ({ items, navigation }) => {
  return (
    <View style={styles.body}>
      <Text style={styles.heading}>Featured</Text>
      <View style={styles.main}>
        <Carousel
          loop
          autoplay
          vertical={false}
          style={styles.swiper}
          enableSnap
          data={items}
          useScrollView
          renderItem={({ item, index }: any) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={() => {
                  navigation.navigate(SCREEN.STACK_PRODUCT_INNER, item)
                }}
              >
                <Image
                  src={getImagePath(item.gallery?.[0]?.filename, '-product')}
                  alt={`Trending ${item.name}`}
                  style={styles.image}
                  width={'100%'}
                  // height={"100%"}
                  resizeMode={'cover'}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
                <View>
                  <Text style={styles.price}>₽ {item.price}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
          sliderWidth={screenWidth}
          itemWidth={getVW(75)}
        />
      </View>
    </View>
  )
}

const colors = {
  headingColor: '#212529',
  borderColor: '#D2D2D2',
  nameColor: '#646464',
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    height: getVH(60),
    paddingTop: 20,
    width: '100%',
  },

  heading: {
    color: colors.headingColor,
    fontSize: 22,
    marginBottom: 20,
  },

  image: {
    height: '85%',
    width: '100%',
  },

  item: {
    borderColor: colors.borderColor,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    height: getVH(50),
    padding: 10,
    width: '100%',
  },

  main: {
    flexGrow: 1,
  },

  name: {
    color: colors.nameColor,
    fontSize: 16,
  },

  price: {
    textAlign: 'left',
  },

  swiper: {
    flexGrow: 1,
  },

  textContainer: {
    flexGrow: 1,
  },
})

export default Trending
