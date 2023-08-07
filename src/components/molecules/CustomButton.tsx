/**
 * was created by tigran at 09.07.23
 */
import React, { FC } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

import { customStyles } from '~utils/style_helpers'

interface IProps {
  title: string
  onPress: () => void
  width?: number | string
  padding?: number | string
  color?: 'white' | 'blue' | 'black' | 'green' | 'red' | 'orange' | 'grey'
  background?: 'white' | 'blue' | 'black' | 'green' | 'red' | 'orange' | 'grey'
  border?: 'white' | 'blue' | 'black' | 'green' | 'red' | 'orange' | 'grey'
  elevation?: number
}

const colors = {
  white: 'white',
  black: 'black',
}
export const CustomButton: FC<IProps> = ({
  title = 'submit',
  onPress,
  width = '',
  padding = '',
  background = '',
  color = '',
  border,
}) => {
  const btnWidth = width ? { width } : { width: '100%' }
  const btnPaddingHorizontal = padding ? { padding } : { padding: 32 }
  const btnColor = color ? { color } : { color: colors.white }
  const btnBackground = padding
    ? { backgroundColor: background }
    : { backgroundColor: colors.black }
  const btnBorder = border
    ? { ...customStyles.border(1, 'solid', border) }
    : { ...customStyles.border(0, 'solid', 'transparent') }
  return (
    <Pressable
      style={[styles.button, btnWidth, btnPaddingHorizontal, btnBackground, btnBorder]}
      onPress={onPress}
    >
      <Text style={[styles.text, btnColor]}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    // backgroundColor: colors.black,
    borderRadius: 8,
    elevation: 0,
    justifyContent: 'center',
    // paddingHorizontal: 32,
    paddingVertical: 12,
    // width: btnWidth
  },
  text: {
    // color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    lineHeight: 21,
  },
})
