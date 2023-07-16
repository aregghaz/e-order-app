import { Text, View } from 'native-base'
import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

import { ImgOrSvg } from '~components/ImgOrSvg'
import { SCREEN } from '~constants'
import { IFeatured } from '~types/featuredProducts'
import { getVW, screenWidth } from '~utils/breakpoints'
import { customStyles } from '~utils/style_helpers'

interface IBestSellerItems {
  items: IFeatured[]
  navigation: any
}

const BestSellerItems: FC<IBestSellerItems> = ({ items, navigation }) => {
  return (
    <View style={styles.main}>
      {items.length > 0 && <Text style={styles.heading}>Best seller</Text>}
      <Carousel
        width={getVW(50)}
        style={styles.container}
        height={290}
        data={items}
        loop
        autoPlay
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
              <ImgOrSvg item={item} product="-product" padding={20} />
              <View>
                <Text style={styles.text}>{item.name}</Text>
              </View>
              <View>
                <Text style={styles.price}>₽ {item.price}</Text>
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

  item: {
    backgroundColor: colors.itemColor,
    borderRadius: 8,
    ...customStyles.border(1, 'solid', colors.borderColor),
    height: '100%',
    marginHorizontal: 10,
    padding: 10,
  },

  main: {
    alignItems: 'center',
    height: 370,
    marginTop: 100,
    width: '100%',
  },

  price: {
    textAlign: 'left',
  },

  text: {
    color: colors.nameColor,
    fontSize: 16,
    fontWeight: '600',
  },
})

export default BestSellerItems
