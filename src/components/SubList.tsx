/**
 * was created by tigran at 01.07.23
 */
import React, { FC } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { SCREEN } from '~constants'

interface IProps {
  title: string
  navigation?: any
  onPage?: (elem: string) => void
  hasChildren?: boolean
}

export const SubList: FC<IProps> = ({ title, navigation, hasChildren }) => {
  /*** checking if there is matching screen name ***/
  const findScreenName = Object.values(SCREEN).find((item) => item === title) || 'Menu'
  return (
    <View style={styles.SubList_wrapper}>
      <TouchableOpacity
        onPress={() => (!hasChildren ? navigation.navigate(findScreenName, { title }) : null)}
      >
        {/*<TouchableOpacity>*/}
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
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
