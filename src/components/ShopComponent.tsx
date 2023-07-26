/**
 * was created by tigran at 27.07.23
 */
import React, { FC } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { fakeData } from '~FakeData'
import { setShopId } from '~services/ShopService'
import { screenWidth } from '~utils/breakpoints'
import { customStyles } from '~utils/style_helpers'

interface IProps {
  handleChangeShopId: (value: string) => void
}

export const ShopComponent: FC<IProps> = ({ handleChangeShopId }) => {
  return (
    <ScrollView>
      <View style={styles.ShopComponent_wrapper}>
        {fakeData.shopIds.map((item: any) => (
          <TouchableOpacity
            style={styles.shopId}
            key={item.id}
            onPress={async () => {
              await setShopId(item.shopId)
              handleChangeShopId(item.shopId)
            }}
          >
            <Text>{item.shopId}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

const colors = {
  grey: '#d1d1d1',
}

const styles = StyleSheet.create({
  ShopComponent_wrapper: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  shopId: {
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    margin: 3,
    padding: 5,
    width: screenWidth / 3 - 6,
    ...customStyles.border(1, 'solid', colors.grey),
  },
})
