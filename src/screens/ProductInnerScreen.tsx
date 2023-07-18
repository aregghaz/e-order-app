/**
 * was created by tigran at 02.07.23
 */

import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Swiper from 'react-native-swiper'

import { SHOP_API } from '~api'
import { ImgOrSvg } from '~components/ImgOrSvg'
import { SCREEN } from '~constants'
import { useIncrement } from '~hooks/useIncrement'
import { IFeatured } from '~types/featuredProducts'
import { customStyles } from '~utils/style_helpers'

const colors = {
  grey: '#dee2e6',
  headingColor: '#212529',
  borderColor: '#D2D2D2',
  nameColor: '#646464',
}
const renderFooter = ({ isLoading }: any) => {
  if (!isLoading) return null
  return (
    <View>
      <ActivityIndicator size="large" color={colors.borderColor} />
    </View>
  )
}

export const ProductInnerScreen: FC = ({ route, navigation }: any) => {
  const [featured, setFeatured] = useState<IFeatured[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const scrollViewRef = useRef<any>(null)
  const [value, addOption] = useIncrement()
  const width = Dimensions.get('window').width
  const { params } = route

  useFocusEffect(
    useCallback(() => {
      const getAsyncData = async (): Promise<void> => {
        try {
          setIsLoading(true)
          const featuredData = await SHOP_API.getLatestProducts(6, value as number)
          setFeatured((featured) => [...featured, ...featuredData.payload.content])
        } catch (err) {
          console.error('Error fetching latest products:', err)
        } finally {
          setIsLoading(false)
        }
      }
      // ;(async () => {
      // await getAsyncData()
      getAsyncData()
      // })()
    }, [params.id, value])
  )
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToOffset({ offset: 0 })
    }
  }, [params.id])

  const Header = () => {
    return (
      <>
        <Swiper
          width={width}
          height={width}
          horizontal={true}
          loop={true}
          showsPagination={true}
          scrollEnabled={true}
          showsButtons={false}
          autoplay={false}
          autoplayTimeout={500}
          autoplayDirection={true}
          pagingEnabled={true}
        >
          {params.gallery.map((item: IFeatured) => {
            return (
              <React.Fragment key={item.id}>
                <ImgOrSvg item={item} product="-product" />
              </React.Fragment>
            )
          })}
        </Swiper>
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
          <Text style={styles.heading}>Latest</Text>
        </View>
      </>
    )
  }

  return (
    <View style={styles.ProductInnerScreen_wrapper}>
      <FlatList
        numColumns={2}
        ref={scrollViewRef}
        data={featured}
        ListHeaderComponent={Header}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            onPress={() => {
              navigation.navigate(SCREEN.STACK_PRODUCT_INNER, item)
            }}
          >
            <ImgOrSvg item={item} padding={20} product="-product" />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
            </View>
            <View>
              <Text style={styles.price}>₽ {item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => renderFooter(isLoading)}
        onEndReached={() => addOption(1)}
        onEndReachedThreshold={0.5}
      />
    </View>
  )
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
  heading: {
    color: colors.headingColor,
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  horizontal_row: {
    backgroundColor: colors.grey,
    height: 1,
    marginVertical: 20,
    width: '100%',
  },
  inner_wrapper: {
    paddingHorizontal: 20,
  },
  item: {
    borderRadius: 8,
    ...customStyles.border(1, 'solid', colors.borderColor),
    justifyContent: 'flex-start',
    marginHorizontal: 8,
    marginVertical: 10,
    overflow: 'hidden',
    padding: 10,
    width: '46%',
  },
  name: {
    color: colors.nameColor,
    fontWeight: '700',
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
  textContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
})
