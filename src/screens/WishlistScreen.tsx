/**
 * was created by tigran at 08.08.23
 */
import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useCallback, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import { SHOP_API } from '~api'
import { customStyles } from '~utils/style_helpers'

const colors = {
  headingColor: '#212529',
  borderColor: '#D2D2D2',
  nameColor: '#646464',
}
// const WishListProductSection: FC<any> = ({ products }) => {
//   return (
//     <View>
//       {
//         products.length > 0 &&
//         products.map((item: any) => {
//           return (
//             <View key={item.id}>
//               <ImgOrSvg item={item} product="-product" padding={20} />
//               <View>
//                 <Text>{item.name}</Text>
//               </View>
//             </View>
//           );
//         })
//       }
//     </View>
//   );
// };

export const WishlistScreen: FC = () => {
  const [wishList, setWishList] = useState<any>([])

  useFocusEffect(
    useCallback(() => {
      const getWishListData = async () => {
        const wishListData = await SHOP_API.getWishList()
        setWishList(wishListData.payload.content)
      }
      getWishListData()
    }, [])
  )
  return (
    <View style={styles.WishlistScreen_wrapper}>
      <ScrollView>
        <View>
          <ScrollView horizontal={true}>
            {wishList.length > 0 ? (
              wishList.map((item: any) => {
                return (
                  <Pressable
                    key={item.id}
                    style={[styles.wishlist_name, styles.wishlist_name__first]}
                    onPress={() => alert(item.id)}
                  >
                    <View>
                      <Text>
                        {item.name} ( {item.products.length} )
                      </Text>
                    </View>
                  </Pressable>
                )
              })
            ) : (
              <View>
                <Text>There is no products here yet</Text>
              </View>
            )}
          </ScrollView>
          {/*<WishListProductSection products={item.products} />*/}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  WishlistScreen_wrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  wishlist_name: {
    ...customStyles.border(1, 'solid', colors.borderColor),
    borderRadius: 4,
    marginRight: 10,
    marginVertical: 10,
    padding: 5,
  },
  wishlist_name__first: {
    marginLeft: 10,
  },
})
