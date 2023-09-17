/**
 * was created by tigran at 01.07.23
 */
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { SCREEN, TMenusType } from '~constants'
import { setShopId } from '~services/ShopService'
import { ScreenNameChanger } from '~utils/helper'

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
  const { t } = useTranslation()
  const handlePressCheck = async (title: string, group: string, shop_id: string) => {
    console.log(title, 'title')
    if (group === 'shop') {
      navigation.navigate(SCREEN.STACK_SHOP_LIST, { title })
      handlePress()
      await setShopId(shop_id)
      navigation.closeDrawer()
    } else if (title === 'ProfileEdit') {
      navigation.navigate(SCREEN.PROFILE_EDIT, { title, type: 'edit' })
    } else if (title === 'PasswordStack') {
      navigation.navigate(SCREEN.STACK_PASSWORD, { title, reset: true })
    } else {
      handlePress()
      !hasChildren ? navigation.navigate(findScreenName, { title }) : null
    }
  }
  const findScreenName = ScreenNameChanger(title)
  return (
    <TouchableOpacity onPress={() => handlePressCheck(title, group!, shop_id!)}>
      <View style={styles.SubList_wrapper}>
        {/*<Text>{title}</Text>*/}
        <Text>{t(title as TMenusType)}</Text>
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
