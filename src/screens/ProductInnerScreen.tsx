/**
 * was created by tigran at 02.07.23
 */
import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { Image } from 'native-base'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

import { getImagePath, SHOP_API } from '~api'
import TrendingItems from '~components/TrendingItems'
import { IFeatured } from '~types/featuredProducts'

export const ProductInnerScreen: FC = ({ route, navigation }: any) => {
  const [featured, setFeatured] = useState<IFeatured[]>([])
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const scrollViewRef = useRef<any>(null)
  const width = Dimensions.get('window').width
  const params = route.params
  const getAsyncData = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const featuredData = await SHOP_API.getLatestProducts(10, page)
      const filteredArr = featuredData.payload.content.filter(
        (item: IFeatured) => item.id !== params.id
      )
      if (featured.some((item: IFeatured) => item.id === params.id)) {
        console.log('if')
        // setFeatured(featured.length > 0 ? featured : filteredArr)
        setFeatured(filteredArr)
      } else {
        console.log('else')
        setFeatured((featured) => [...featured, ...filteredArr])
        // setFeatured(featured => [...featured, ...filteredArr])
      }
      // setFeatured(filteredArr)
      // setFeatured(featured => [...featured, ...filteredArr])
      setHasNext(featuredData.payload.pagination.hasNext)
    } catch (err) {
      console.error('Error fetching latest products:', err)
    } finally {
      setIsLoading(false)
    }
  }
  useFocusEffect(
    useCallback(() => {
      ;(async () => {
        await getAsyncData()
      })()
    }, [params.id, page])
  )
  useEffect(() => {
    // Scroll to the top when the selected product ID changes
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true })
    }
  }, [params.id])

  const increment = () => {
    console.log(
      featured.some((item: IFeatured) => item.id === params.id),
      '!!!!___!!!!____!!!!'
    )
    console.log(page, 'page!!!')
    if (hasNext) {
      setPage(page + 1)
    }
  }

  return (
    <ScrollView style={styles.ProductInnerScreen_wrapper} ref={scrollViewRef}>
      <Carousel
        width={width}
        style={styles.carousel}
        height={width}
        data={params.gallery}
        renderItem={({ item, index }: any) => {
          return (
            <Image
              key={index}
              style={styles.image}
              src={getImagePath(item?.filename, '-product')}
              alt={params.name}
            />
          )
        }}
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
          <Text style={styles.price}>₽ {params.price}</Text>
        </View>
        <View style={styles.horizontal_row} />
        <View>
          <Text style={styles.details}>Product Details</Text>
          <Text>{params.description}</Text>
        </View>
        <View style={styles.horizontal_row} />
      </View>
      <TrendingItems
        items={featured}
        navigation={navigation}
        onPress={increment}
        isLoading={isLoading}
      />
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
  carousel: {
    marginTop: 20,
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
