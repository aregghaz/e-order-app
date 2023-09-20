import { Feather } from '@expo/vector-icons'
import { Text, View } from 'native-base'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { ImgOrSvg } from '~components/ImgOrSvg'
import { ModalWishList } from '~components/ModalWishList'
import { Price } from '~components/Price'
import { SCREEN } from '~constants'
import { IFeatured } from '~types/featuredProducts'
import { customStyles } from '~utils/style_helpers'

interface IFeaturedItems {
  items: IFeatured[]
  navigation: any
  isCategoryProduct: boolean
  onPress?: any
  isLoading?: boolean
  companyName?: string
  supplierId?: string
}

const colors = {
  headingColor: '#212529',
  borderColor: '#D2D2D2',
  nameColor: '#646464',
  red: 'red',
}

const TopRatedItems: FC<IFeaturedItems> = ({
  items,
  navigation,
  isCategoryProduct,
  companyName,
  supplierId,
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [productId, setProductId] = useState('')
  const { t } = useTranslation()
  const heightOfBlock = isCategoryProduct ? { height: 270 } : { height: 'auto' }
  return (
    <View style={styles.main}>
      {items.length > 0 && !isCategoryProduct && (
        <Text style={styles.heading}>{t('top_rated')}</Text>
      )}
      <View style={styles.container}>
        {items &&
          items.length > 0 &&
          items.map((item) => {
            const { name, id, price, reward, discount } = item
            return (
              <TouchableOpacity
                key={id}
                style={[styles.item, heightOfBlock]}
                onPress={() => {
                  navigation.navigate(
                    SCREEN.STACK_PRODUCT_INNER,
                    companyName ? { ...item, supplier: { companyName, id: supplierId } } : item
                  )
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
                  <Price price={price} discount={discount} />
                  {/*<Text style={styles.price}>₽ {price}</Text>*/}
                </View>
                <View style={styles.reward_block}>
                  <Text style={styles.price}>
                    {t('reward')} {reward}
                  </Text>
                  <Text style={styles.reward}>B</Text>
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
  reward: {
    color: colors.red,
  },
  reward_block: {
    flexDirection: 'row',
    gap: 5,
  },
})

export default TopRatedItems
