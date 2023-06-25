/**
 * was created by tigran at 25.06.23
 */
import { Feather } from '@expo/vector-icons'
import React, { FC, useCallback, useRef, useState } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

export type TIcon =
  | 'home'
  | 'user'
  | 'shopping-cart'
  | 'credit-card'
  | 'grid'
  | 'lock'
  | 'star'
  | 'smile'
  | 'headphones'

interface IProps {
  hasChildren?: boolean
  title: string
  iconName?: TIcon
  subChildren?: object
}

export const Accordion: FC<IProps> = ({ hasChildren, iconName, title }) => {
  const [rotateState, setRotateState] = useState(false)
  const rotateRefValue = useRef('0deg')
  const handlePress = useCallback(() => {
    setRotateState(!rotateState)
    if (rotateState) {
      rotateRefValue.current = '0deg'
    } else {
      rotateRefValue.current = '-90deg'
    }
  }, [rotateState])
  const chevronStyle = { transform: [{ rotate: rotateRefValue.current }] }
  // const childrenElements = hasChildren ? (
  //   subChildren.map((item) => (
  //     <View key={item.id}>
  //       <Accordion title={item.title} subChildren={item.subChildren} />
  //     </View>
  //   ))
  // ) : (
  //   <Text style={styles.text}>{title}</Text>
  // )
  return (
    <View style={styles.accordion_block}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.accordion_text__wrapper}>
          <View style={styles.sidebar_icon__block}>
            <Feather name={iconName} size={20} />
            <Text style={styles.text}>{title}</Text>
          </View>
          {/*{childrenElements}*/}
          {hasChildren && <Feather name="chevron-left" size={18} style={chevronStyle} />}
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const colors = {
  grey: '#ddd',
}

const styles = StyleSheet.create({
  accordion_block: {
    flex: 1,
  },
  accordion_text__wrapper: {
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  sidebar_icon__block: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    marginLeft: 10,
  },
})
