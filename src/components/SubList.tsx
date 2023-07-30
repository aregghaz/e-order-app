/**
 * was created by tigran at 01.07.23
 */
import React, { FC } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { SCREEN } from '~constants'
import { setShopId } from '~services/ShopService'

interface IProps {
  title: string
  group?: string
  shop_id?: string
  navigation?: any
  onPage?: (elem: string) => void
  hasChildren?: boolean
  handlePress: () => void
}

export const SubList: FC<IProps> = ({
  title,
  navigation,
  hasChildren,
  handlePress,
  group,
  shop_id,
}) => {
  const handlePressCheck = async (title: string, group: string, shop_id: string) => {
    if (group === 'shop') {
      navigation.navigate(SCREEN.STACK_MAIN_TAB, { title })
      handlePress()
      await setShopId(shop_id)
      // navigation.navigate(SCREEN.DRAWER_MENU, { title })
      console.log(shop_id, 'PPPPPPP')
      // navigation.closeDrawer()
    } else {
      handlePress()
      !hasChildren ? navigation.navigate(findScreenName, { title }) : null
    }
  }
  /*** checking if there is matching screen name ***/
  const findScreenName = Object.values(SCREEN).find((item) => item === title) || 'Menu'
  return (
    <TouchableOpacity
      // onPress={() => {
      //   !hasChildren ? navigation.navigate(findScreenName, { title }) : null
      //   handlePress()
      // }}
      onPress={() => handlePressCheck(title, group!, shop_id!)}
    >
      <View style={styles.SubList_wrapper}>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}
const colors = {
  grey: '#ddd',
}

const styles = StyleSheet.create({
  SubList_wrapper: {
    borderBottomWidth: 1,
    borderColor: colors.grey,
    borderStyle: 'solid',
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
})
