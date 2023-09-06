/**
 * was created by tigran at 03.09.23
 */
import { Feather } from '@expo/vector-icons'
import React, { FC, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

import { customStyles } from '~utils/style_helpers'

interface IProps {
  id: string
  min: number
  max?: number
  step?: number
  cartItemId: string
  size?: string
  onChange?: (arg: number) => void
  disabled?: boolean
  style?: any
  qty: number
  handleUpdateQuantity: (cartId: string, itemId: string, qty: number) => void
}

const colors = {
  headingColor: '#212529',
  borderColor: '#D2D2D2',
  nameColor: '#646464',
  menuColor: '#d2d2d2',
  background: 'lightgrey',
  white: 'white',
  opacity: '#00000056',
  grey: '#dee2e6',
  edit: 'orange',
  delete: 'red',
}

const InputNumber: FC<IProps> = ({
  step = 1,
  max = null,
  min = null,
  onChange,
  qty,
  handleUpdateQuantity,
  cartItemId,
  id,
}) => {
  const [value, setValue] = useState<number>(qty)
  const handleAddSubMousePress = (direction: number) => {
    let newValue = value + step * direction

    if (max !== null) {
      newValue = Math.min(max, newValue)
    }
    if (min !== null) {
      newValue = Math.max(min, newValue)
    }
    if (newValue !== value) {
      setValue(newValue)
      handleUpdateQuantity(cartItemId, id, newValue)
    }
  }
  return (
    <View style={styles.InputNumber_wrapper}>
      <TouchableOpacity style={styles.input_number__sub} onPress={() => handleAddSubMousePress(-1)}>
        <Feather name="minus" size={20} color="black" />
      </TouchableOpacity>
      {/*<TextInput*/}
      {/*  style={styles.form_control}*/}
      {/*  onChangeText={handleChange}*/}
      {/*  keyboardType={'number-pad'}*/}
      {/*/>*/}
      <Text style={styles.form_control}>{value}</Text>
      <TouchableOpacity style={styles.input_number__add} onPress={() => handleAddSubMousePress(+1)}>
        <Feather name="plus" size={20} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  InputNumber_wrapper: {
    flex: 1,
    flexDirection: 'row',
    width: 140,
    // ...customStyles.border(1, 'solid', colors.borderColor),
  },
  form_control: {
    ...customStyles.border(1, 'solid', colors.borderColor),
    alignItems: 'center',
    flexDirection: 'row',
    height: 30,
    justifyContent: 'center',
    paddingVertical: 4,
    textAlign: 'center',
    width: 80,
  },
  input_number__add: {
    ...customStyles.border(1, 'solid', colors.borderColor),
    alignItems: 'center',
    borderBottomRightRadius: 4,
    borderLeftWidth: 0,
    borderTopRightRadius: 4,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  input_number__sub: {
    ...customStyles.border(1, 'solid', colors.borderColor),
    alignItems: 'center',
    borderBottomLeftRadius: 4,
    borderRightWidth: 0,
    borderTopLeftRadius: 4,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
})

export default InputNumber
