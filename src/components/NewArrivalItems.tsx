import { Feather } from '@expo/vector-icons'
import { View, Text } from 'native-base'
import React, { FC, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

import { ImgOrSvg } from '~components/ImgOrSvg'
import { ModalWishList } from '~components/ModalWishList'
import { SCREEN } from '~constants'
import { IFeatured } from '~types/featuredProducts'
import { getVW, screenWidth } from '~utils/breakpoints'
import { customStyles } from '~utils/style_helpers'

interface ITopBrands {
  items: IFeatured[]
  navigation: any
  title: string
}

const NewArrivalItems: FC<ITopBrands> = ({ items, navigation,title }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [productId, setProductId] = useState('')
  return (
    <>
      <View style={styles.main}>
        {items.length > 0 && <Text style={styles.heading}>{title}</Text>}
        <Carousel
          loop
          autoPlay
          style={styles.container}
          width={getVW(50)}
          data={items}
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
                <Feather
                  onPress={() => {
                    setModalVisible(true)
                    setProductId(item.id)
                  }}
                  style={styles.heart}
                  name="heart"
                  size={20}
                  color="darkslategrey"
                />
                <ImgOrSvg item={item} product="-product" padding={16} />
              </TouchableOpacity>
            )
          }}
        />
      </View>
      <ModalWishList
        productId={productId}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
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
    flex: 1,

    height: 'auto',
    width: screenWidth,
  },

  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 20,
  },

  heart: {
    position: 'absolute',
    right: 5,
    top: 5,
    zIndex: 1,
  },

  item: {
    backgroundColor: colors.itemColor,
    borderRadius: 8,
    position: 'relative',
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
    overflow: 'hidden',
    width: '100%',
  },
})

export default NewArrivalItems
