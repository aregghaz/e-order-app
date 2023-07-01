/**
 * was created by tigran at 29.06.23
 */
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { FC } from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native'

interface IProps {
  props: object
}

export const CustomTabBar: FC<IProps> = (props) => {
  return (
    <View style={styles.custom_bottom_nav}>
      <TouchableWithoutFeedback>
        <View style={[styles.bottom_nav__icons, styles.border_right]}>
          <MaterialCommunityIcons name="sort-descending" size={24} color="black" />
          <Text style={styles.text_gap}>SORT BY</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <View style={styles.bottom_nav__icons}>
          <MaterialCommunityIcons name="sort-variant" size={24} color="black" />
          <Text style={styles.text_gap}>FILTER</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const colors = {
  grey: '#e5e5e5',
}
const width50 = Dimensions.get('window').width / 2

const styles = StyleSheet.create({
  border_right: {
    borderColor: colors.grey,
    borderRightWidth: 1,
    borderStyle: 'solid',
  },
  bottom_nav__icons: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    width: width50,
  },
  custom_bottom_nav: {
    alignItems: 'center',
    borderColor: colors.grey,
    borderStyle: 'solid',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 70,
    width: '100%',
  },
  text_gap: {
    marginLeft: 10,
  },
})
