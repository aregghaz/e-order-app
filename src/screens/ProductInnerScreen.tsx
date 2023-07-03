/**
 * was created by tigran at 02.07.23
 */
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'native-base'
import React, { FC, useEffect, useState } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'

// import { IFeatured } from '~types/featuredProducts'
import { fakeData } from '~FakeData'
import { getImagePath, SHOP_API } from '~api'
import TrendingItems from '~components/TrendingItems'

// export const ProductInnerScreen: FC<IFeatured> = () => {
export const ProductInnerScreen: FC = () => {
  const [product] = useState(fakeData.productInner)
  const [featured, setFeatured] = useState([])
  useEffect(() => {
    const getAsyncData = async (): Promise<void> => {
      const featuredData = await SHOP_API.getFeaturedProducts()
      setFeatured(featuredData.payload.content)
    }
    getAsyncData()
  }, [])
  return (
    <ScrollView style={styles.ProductInnerScreen_wrapper}>
      <Image
        src={getImagePath(product.gallery?.[0]?.filename, '-product')}
        alt={`Trending ${product.name}`}
        style={styles.image}
      />
      <View style={styles.inner_wrapper}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.rating_block}>
          <Text style={styles.rates}>{product.reward}</Text>
          <Ionicons name="star" size={16} color="#FFC107" />
          <View style={styles.slash} />
          <Text style={styles.rates}>{product.rating} Ratings</Text>
        </View>
        <View style={styles.horizontal_row} />
        <View>
          <Text style={styles.price}>$ {product.price}</Text>
        </View>
        <View style={styles.horizontal_row} />
        <View>
          <Text style={styles.details}>Product Details</Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto at delectus hic
            iure molestias, perferendis quam quidem ratione, sint totam veniam! A aspernatur
            blanditiis consequuntur deleniti dolores exercitationem fuga impedit ipsa libero magni
            minus obcaecati odit porro possimus quaerat quam quisquam quod, reiciendis repellendus
            rerum, sint tempora veniam voluptas? Animi architecto labore minima odio perferendis
            quae repellendus. Cum doloremque eum excepturi facere impedit laborum nam necessitatibus
            officia ut! Adipisci aliquid architecto assumenda debitis deserunt dolorum eaque error
            expedita explicabo hic id impedit ipsam ipsum modi nobis numquam odio qui quia quis,
            quod repellendus sed temporibus ut velit, veritatis vitae?
          </Text>
        </View>
        <View style={styles.horizontal_row} />
        <TrendingItems items={featured} />
      </View>
    </ScrollView>
  )
}

const colors = {
  grey: '#dee2e6',
}

const styles = StyleSheet.create({
  ProductInnerScreen_wrapper: {
    flex: 1,
  },
  description: {},
  details: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  horizontal_row: {
    backgroundColor: colors.grey,
    height: 1,
    marginVertical: 20,
    width: '100%',
  },
  image: {
    aspectRatio: 1,
    width: '100%',
  },
  inner_wrapper: {
    paddingHorizontal: 20,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rates: {
    fontSize: 14,
    padding: 5,
  },
  rating_block: {
    alignItems: 'center',
    borderColor: colors.grey,
    borderStyle: 'solid',
    borderWidth: 0.5,
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 4,
    width: 180,
  },
  slash: {
    backgroundColor: colors.grey,
    height: '100%',
    marginHorizontal: 10,
    width: 1,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
})
