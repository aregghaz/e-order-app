import { View, Text, Image } from 'native-base'
import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

import { TTrendingItems } from '~components/Trending'
import { getVW, screenWidth } from '~utils/breakpoints'

interface IAccessories {
  accessories: TTrendingItems[]
}

const Accessories: FC<IAccessories> = ({ accessories }) => {
  return (
    <View style={styles.main}>
      <Text style={styles.heading}>Best seller</Text>
      <Carousel
        width={getVW(50)}
        style={styles.container}
        height={250}
        data={accessories}
        loop
        autoPlay
        autoPlayInterval={2000}
        renderItem={({ item, index }: { item: TTrendingItems; index: number }) => {
          return (
            <TouchableOpacity key={index} style={styles.item}>
              <Image style={styles.image} src={item.image} alt={'test'} resizeMode={'contain'} />
              <View style={styles.textContainer}>
                <Text style={styles.text}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const colors = {
  headingColor: '#212529',
  borderColor: '#D2D2D2',
  nameColor: '#646464',
  itemColor: '#FFFFFF',
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
  },

  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
  },

  image: {
    flexGrow: 5,
  },

  item: {
    backgroundColor: colors.itemColor,
    borderColor: colors.borderColor,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    height: '100%',
    marginHorizontal: 10,
    width: getVW(45),
  },

  main: {
    alignItems: 'center',
    height: 350,
    paddingTop: 20,
    width: '100%',
  },

  text: {
    color: colors.nameColor,
    fontSize: 16,
    fontWeight: '600',
  },

  textContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
})

export default Accessories
