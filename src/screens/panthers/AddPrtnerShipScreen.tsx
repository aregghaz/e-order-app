import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'

import { SHOP_API } from '~api'
import { CustomButton } from '~components/molecules/CustomButton'
import { getShopId } from '~services/ShopService'
import { customStyles } from '~utils/style_helpers'

export const AddPrtnerShipScreen: FC = () => {
  const [suppliers, setSuppliers] = useState<any>([])

  const [page, setPage] = useState(1)
  ///   const [isLoading, setIsLoading] = useState(false);
  const [loding, setLoading] = useState(false)
  ///   const [hasMoreData, setHasMoreData] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        const getID = await getShopId()
        console.log(getID.length, 'stexxxx')

        if (getID !== undefined && getID.length > 10) {
          const data = await SHOP_API.searchParthner(getID, 1)
          setSuppliers(data.payload.content)
        }
      }

      getData()
    }, [loding])
  )
  const handleOnPress = async (id: string) => {
    const getID = await getShopId()
    console.log(getID, 'getID')
    if (getID !== undefined) {
      SHOP_API.addParthner(id, getID)
      setPage(1)
      setLoading(!loding)
    }
  }

  const renderFooter = () => {
    // if (!isLoading) return null;

    // if (!hasMoreData) {
    //     return (
    //         <View>
    //             <Text>No more data</Text>
    //         </View>
    //     );
    // }
    return (
      <View>
        <ActivityIndicator />
      </View>
    )
  }
  const handleLoadMore = async () => {
    const getID = await getShopId()
    const data = await SHOP_API.searchParthner(getID, page)
    setSuppliers([...suppliers, ...data.payload.content])
    setPage(page + 1)
  }
  return (
    <View style={styles.ShopListScreen_wrapper}>
      <FlatList
        data={suppliers}
        keyExtractor={(item, index) => index.toString()}
        /// ItemSeparatorComponent={ItemSeparatorView}
        /// enableEmptySections={true}
        ListFooterComponent={renderFooter}
        onEndReached={() => handleLoadMore()}
        onEndReachedThreshold={0.5}
        renderItem={(e: any) => {
          const item = e.item
          return (
            <View key={item.id} style={styles.box}>
              <Text style={styles.title}>{item.companyName}</Text>
              <View style={styles.buttonsContainer}>
                <CustomButton
                  title={item.partnershipStatus}
                  width={150}
                  padding={15}
                  border="grey"
                  background="white"
                  color="red"
                  onPress={() => handleOnPress(item.id)}
                />
              </View>
            </View>
          )
        }}
      />
    </View>
  )
}

const colors = {
  black: 'black',
  white: 'white',
  borderColor: '#d1d1d1',
  background: '#f1f1f1',
}

const styles = StyleSheet.create({
  ShopListScreen_wrapper: {
    flex: 1,
    position: 'relative',
  },
  box: {
    borderRadius: 5,
    margin: 10,
    minHeight: 100,
    padding: 5,
    ...customStyles.border(1, 'solid', colors.borderColor),
  },
  buttonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
    margin: 5,
    padding: 10,
    // backgroundColor: colors.background,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
})
