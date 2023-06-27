import { View, Text, Image } from 'native-base'
import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-snap-carousel'

import { TTrendingItems } from '~components/TrendingItems'
import { getVH, getVW, screenWidth } from '~utils/breakpoints'

interface ITrending {
  name?: string
  items: TTrendingItems[]
}

const Trending: FC<ITrending> = ({ name, items }) => {
  return (
    <View style={styles.body}>
      <Text style={styles.heading}>Trending {name && `in ${name}`}</Text>
      <View style={styles.main}>
        <Carousel
          loop={true}
          enableSnap={true}
          autoplay={true}
          data={items}
          style={styles.swiper}
          renderItem={({ item, index }: { item: TTrendingItems; index: number }) => {
            return (
              <TouchableOpacity key={index} style={styles.item}>
                <Image
                  src={item.image}
                  alt={`Trending ${item.name}`}
                  style={styles.image}
                  width={'100%'}
                  // height={"100%"}
                  resizeMode={'cover'}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{item.name}</Text>
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
    borderWidth: 1.5,
    height: getVH(50),
    width: '100%',
  },

  main: {
    flexGrow: 1,
  },

  name: {
    color: colors.nameColor,
    fontSize: 16,
  },

  swiper: {
    flexGrow: 1,
  },

  // 426225

  textContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },

  // swiper: {
  //   flexGrow: 1,
  // },
  //
  // item: {
  //   flexGrow: 1,
  // },
})

export default Trending
