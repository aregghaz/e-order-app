import { View, Text, Image } from 'native-base'
import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

import { getImagePath } from '~api'
import { SCREEN } from '~constants'
import { IFeatured } from '~types/featuredProducts'
import { getVW, screenWidth } from '~utils/breakpoints'

// export type TBrand = {
//   id: number
//   name: string
//   image: string
// }

interface ITopBrands {
  brands: IFeatured[]
  navigation: any
}

const TopBrands: FC<ITopBrands> = ({ brands, navigation }) => {
  return (
    <View style={styles.main}>
      <Text style={styles.heading}>New arrivals</Text>
      <Carousel
        loop
        autoPlay
        style={styles.container}
        width={getVW(50)}
        height={100}
        data={brands}
        autoPlayInterval={2500}
        renderItem={({ item, index }: { item: IFeatured; index: number }) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => {
                navigation.navigate(SCREEN.STACK_PRODUCT_INNER, item)
              }}
            >
              <Image
                style={styles.image}
                src={getImagePath(item.gallery?.[0]?.filename, '-product')}
                alt={item.name}
                resizeMode={'contain'}
              />
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
    marginVertical: 20,
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
    height: 180,
    width: '100%',
  },
})

export default TopBrands
