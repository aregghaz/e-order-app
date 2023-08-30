import { Feather } from '@expo/vector-icons'
import { Text, View } from 'native-base'
import React, { FC, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { ImgOrSvg } from '~components/ImgOrSvg'
import { ModalWishList } from '~components/ModalWishList'
import { SCREEN } from '~constants'
import { IFeatured } from '~types/featuredProducts'
import { customStyles } from '~utils/style_helpers'

interface IFeaturedItems {
  items: IFeatured[]
  navigation: any
  isCategoryProduct: boolean
  onPress?: any
  isLoading?: boolean
}

const colors = {
  headingColor: '#212529',
  borderColor: '#D2D2D2',
  nameColor: '#646464',
}

const TopRatedItems: FC<IFeaturedItems> = ({ items, navigation, isCategoryProduct }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [productId, setProductId] = useState('')
  const heightOfBlock = isCategoryProduct ? { height: 270 } : { height: 'auto' }
  return (
    <View style={styles.main}>
      {items.length > 0 && !isCategoryProduct && <Text style={styles.heading}>Top Rated</Text>}
      <View style={styles.container}>
        {items &&
          items.length > 0 &&
          items.map((item) => {
            const { name, id, price, views } = item
            return (
              <TouchableOpacity
                key={id}
                style={[styles.item, heightOfBlock]}
                onPress={() => {
                  navigation.navigate(SCREEN.STACK_PRODUCT_INNER, item)
                }}
              >
                <Feather
                  onPress={() => {
                    setModalVisible(true)
                    setProductId(id)
                  }}
                  style={styles.heart}
                  name="heart"
                  size={20}
                  color="darkslategrey"
                />
                <ImgOrSvg item={item} padding={20} product="-product" />
                <View>
                  <Text style={styles.name}>{name}</Text>
                </View>
                <View>
                  <Text style={styles.price}>₽ {price}</Text>
                </View>
                <View>
                  <Text style={styles.price}>views {views}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
      </View>
      <ModalWishList
        productId={productId}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 'auto',
    justifyContent: 'space-between',
    width: '100%',
  },

  heading: {
    color: colors.headingColor,
    fontSize: 20,
    marginBottom: 10,
  },
  heart: {
    position: 'absolute',
    right: 5,
    top: 5,
    zIndex: 1,
  },
  item: {
    borderRadius: 8,
    ...customStyles.border(1, 'solid', colors.borderColor),
    justifyContent: 'flex-start',
    marginHorizontal: 2,
    marginVertical: 10,
    overflow: 'hidden',
    padding: 10,
    position: 'relative',
    width: '48%',
  },

  main: {
    alignItems: 'center',
    flexDirection: 'column',
    height: 'auto',
    paddingHorizontal: 10,
    paddingTop: 15,
  },

  name: {
    color: colors.nameColor,
    fontWeight: '700',
  },
  // notFound: {
  //   alignItems: 'center',
  //   flex: 1,
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   justifyContent: 'center',
  //   textAlign: 'center',
  // },
  price: {
    textAlign: 'left',
  },
})

export default TopRatedItems
