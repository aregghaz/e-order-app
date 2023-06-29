import { View, Text, Image } from 'native-base'
import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

import { getVW, screenWidth } from '~utils/breakpoints'

export type TBrand = {
  id: number
  name: string
  image: string
}

interface ITopBrands {
  brands: TBrand[]
}

const TopBrands: FC<ITopBrands> = ({ brands }) => {
  return (
    <View style={styles.main}>
      <Text style={styles.heading}>Top Brands</Text>
      <Carousel
        width={getVW(50)}
        style={styles.container}
        height={65}
        data={brands}
        loop
        autoPlay
        autoPlayInterval={1000}
        renderItem={({ item, index }: { item: TBrand; index: number }) => {
          return (
            <TouchableOpacity key={index} style={styles.item}>
              <Image style={styles.image} src={item.image} alt={item.name} resizeMode={'contain'} />
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
    flexGrow: 1,
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
    height: 130,
    paddingTop: 20,
    width: '100%',
  },
})

export default TopBrands
