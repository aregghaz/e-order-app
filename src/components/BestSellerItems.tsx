import { Feather } from '@expo/vector-icons'
import { Text, View } from 'native-base'
import React, { FC, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

import { ImgOrSvg } from '~components/ImgOrSvg'
import { ModalWishList } from '~components/ModalWishList'
import { SCREEN } from '~constants'
import { IFeatured } from '~types/featuredProducts'
import { getVW, screenWidth } from '~utils/breakpoints'
import { customStyles } from '~utils/style_helpers'

interface IBestSellerItems {
  items: IFeatured[]
  navigation: any
}

const BestSellerItems: FC<IBestSellerItems> = ({ items, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [productId, setProductId] = useState('')
  return (
    <>
      <View style={styles.main}>
        {items.length > 0 && <Text style={styles.heading}>Best seller</Text>}
        <Carousel
          width={getVW(50)}
          style={styles.container}
          // height={250}
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
                <ImgOrSvg item={item} product="-product" padding={20} />
                <View style={styles.info_block}>
                  <View>
                    <Text style={styles.text}>{item.name}</Text>
                  </View>
                  <View>
                    <Text style={styles.price}>₽ {item.price}</Text>
                  </View>
                </View>
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

  info_block: {
    marginTop: 10,
  },

  item: {
    backgroundColor: colors.itemColor,
    borderRadius: 8,
    position: 'relative',
    ...customStyles.border(1, 'solid', colors.borderColor),
    height: '100%',
    marginHorizontal: 10,
    padding: 10,
  },

  main: {
    alignItems: 'center',
    height: 350,
    marginBottom: 50,
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
