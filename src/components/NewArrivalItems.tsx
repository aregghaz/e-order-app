import { View, Text } from 'native-base'
import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

import { ImgOrSvg } from '~components/ImgOrSvg'
import { SCREEN } from '~constants'
import { IFeatured } from '~types/featuredProducts'
import { getVW, screenWidth } from '~utils/breakpoints'
import { customStyles } from '~utils/style_helpers'

interface ITopBrands {
  items: IFeatured[]
  navigation: any
}

const NewArrivalItems: FC<ITopBrands> = ({ items, navigation }) => {
  return (
    <View style={styles.main}>
      {items.length > 0 && <Text style={styles.heading}>New arrivals</Text>}
      <Carousel
        loop
        autoPlay
        style={styles.container}
        width={getVW(50)}
        // height={'auto'}
        data={items}
        autoPlayInterval={2500}
        // contentContainerCustomStyle={{ flex: 1 }}
        renderItem={({ item, index }: { item: IFeatured; index: number }) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => {
                navigation.navigate(SCREEN.STACK_PRODUCT_INNER, item)
              }}
            >
              <ImgOrSvg item={item} product="-product" padding={16} />
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
    // ...customStyles.border(1, 'solid', colors.borderColor),
    flex: 1,
    height: 'auto',
    width: screenWidth,
  },

  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 20,
  },

  item: {
    backgroundColor: colors.itemColor,
    borderRadius: 8,
    ...customStyles.border(1, 'solid', colors.borderColor),
    height: '100%',
    marginHorizontal: 10,
    overflow: 'hidden',
    padding: 5,
  },

  main: {
    alignItems: 'center',
    flex: 1,
    height: 250,
    width: '100%',
  },
})

export default NewArrivalItems
