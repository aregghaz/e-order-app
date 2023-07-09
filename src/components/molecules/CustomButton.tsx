/**
 * was created by tigran at 09.07.23
 */
import React, { FC } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

interface IProps {
  title: string
  onPress: () => void
}

export const CustomButton: FC<IProps> = ({ title = 'submit', onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

const colors = {
  white: 'white',
  black: 'black',
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.black,
    borderRadius: 8,
    elevation: 3,
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 12,
    width: '100%',
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    lineHeight: 21,
  },
})
