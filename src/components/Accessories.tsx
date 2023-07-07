import { View, Text, Image } from 'native-base'
import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

import { getImagePath } from '~api'
import { SCREEN } from '~constants'
import { IFeatured } from '~types/featuredProducts'
import { getVW, screenWidth } from '~utils/breakpoints'

interface IAccessories {
  accessories: IFeatured[]
  navigation: any
}

const Accessories: FC<IAccessories> = ({ accessories, navigation }) => {
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
                alt={'test'}
                resizeMode={'contain'}
              />
              <View style={styles.textContainer}>
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

  image: {
    // flexGrow: 5
    aspectRatio: 1,
  },

  item: {
    backgroundColor: colors.itemColor,
    borderColor: colors.borderColor,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    height: '100%',
    marginHorizontal: 10,
    padding: 10,
    width: getVW(45),
  },

  main: {
    alignItems: 'center',
    height: 350,
    paddingTop: 20,
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
  textContainer: {
    // alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
})

export default Accessories
