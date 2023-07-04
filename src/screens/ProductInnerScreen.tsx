/**
 * was created by tigran at 02.07.23
 */
import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { Image } from 'native-base'
import React, { FC, useState } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'

// import { IFeatured } from '~types/featuredProducts'
///import { fakeData } from '~FakeData'
import { getImagePath, SHOP_API } from '~api'
import TrendingItems from '~components/TrendingItems'

// export const ProductInnerScreen: FC<IFeatured> = () => {
export const ProductInnerScreen: FC = ({ route, navigation }: any) => {
  const [featured, setFeatured] = useState([])
  const params = route.params
  console.log(params, 'itemitemitem')
  const getAsyncData = async (): Promise<void> => {
    const featuredData = await SHOP_API.getFeaturedProducts()
    setFeatured(featuredData.payload.content)
  }
  useFocusEffect(
    React.useCallback(() => {
      ;(async () => {
        await getAsyncData()
      })()
    }, [params.id])
  )
  return (
    <ScrollView style={styles.ProductInnerScreen_wrapper}>
      <Image
        src={getImagePath(params.gallery?.[0]?.filename, '-product')}
        alt={`Trending ${params.name}`}
        style={styles.image}
      />
      <View style={styles.inner_wrapper}>
        <Text style={styles.title}>{params.name}</Text>
        <Text style={styles.description}>{params.description}</Text>
        <View style={styles.rating_block}>
          <Text style={styles.rates}>{params.reward}</Text>
          <Ionicons name="star" size={16} color="#FFC107" />
          <View style={styles.slash} />
          <Text style={styles.rates}>{params.rating} Ratings</Text>
        </View>
        <View style={styles.horizontal_row} />
        <View>
          <Text style={styles.price}>$ {params.price}</Text>
        </View>
        <View style={styles.horizontal_row} />
        <View>
          <Text style={styles.details}>Product Details</Text>
          <Text>{params.description}</Text>
        </View>
        <View style={styles.horizontal_row} />
        <TrendingItems items={featured} navigation={navigation} />
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
