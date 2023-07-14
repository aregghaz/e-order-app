import { Image, Text, View } from 'native-base'
import { FC } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native'

import { getImagePath } from '~api'
// import { SCREEN } from '~constants'
import { SCREEN } from '~constants'
import { IFeatured } from '~types/featuredProducts'

// import { getVH } from '~utils/breakpoints'

interface ITrendingItems {
  items: IFeatured[]
  navigation: any
  isCategoryProduct?: boolean
  onPress?: () => void
  isLoading?: boolean
}

const colors = {
  headingColor: '#212529',
  borderColor: '#D2D2D2',
  nameColor: '#646464',
}

// const TrendingItems: FC<ITrendingItems> = ({ items }) => {
const TrendingItems: FC<ITrendingItems> = ({
  items,
  navigation,
  isCategoryProduct,
  onPress,
  isLoading,
}) => {
  const handleEnd = () => {
    console.log('worked')
    if (onPress) {
      onPress()
    }
  }
  const renderFooter = () => {
    if (!isLoading) return null
    return (
      <View>
        <ActivityIndicator size="small" />
      </View>
    )
  }
  return (
    <View style={styles.main}>
      {items.length > 0 && !isCategoryProduct && <Text style={styles.heading}>Latest</Text>}
      {/*<View style={styles.container}>*/}
      {items && (
        <FlatList
          numColumns={2}
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              style={styles.item}
              onPress={() => {
                navigation.navigate(SCREEN.STACK_PRODUCT_INNER, item)
              }}
            >
              <Image
                src={getImagePath(item.gallery?.[0]?.filename, '-product')}
                alt={`Trending ${item.name}`}
                style={styles.image}
                resizeMode={'cover'}
              />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
              </View>
              <View>
                <Text style={styles.price}>₽ {item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={renderFooter}
          onEndReached={handleEnd}
          onEndReachedThreshold={0}
        />
      )}
      {/*</View>*/}
    </View>
  )
}

const styles = StyleSheet.create({
  // container: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   height: 'auto',
  //   justifyContent: 'space-between',
  //   width: '100%',
  // },

  heading: {
    color: colors.headingColor,
    fontSize: 20,
    marginBottom: 10,
  },

  image: {
    aspectRatio: 1,
    width: '100%',
  },

  item: {
    // alignItems: 'center',
    borderColor: colors.borderColor,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1.5,
    // height: getVH(35),
    justifyContent: 'flex-start',
    marginHorizontal: 2,
    marginVertical: 20,
    overflow: 'hidden',
    padding: 10,
    width: '48%',
  },

  main: {
    alignItems: 'center',
    flexDirection: 'column',
    height: 'auto',
    paddingHorizontal: 10,
    // paddingTop: 15,
  },

  name: {
    color: colors.nameColor,
    // fontSize: isMedium ? 18 : 16,
    fontWeight: '700',
  },
  price: {
    flex: 1,
    textAlign: 'left',
  },
  textContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
})

export default TrendingItems
