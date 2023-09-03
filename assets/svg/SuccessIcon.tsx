/**
 * was created by tigran at 03.09.23
 */

import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, { SvgProps, Circle, Polyline } from 'react-native-svg'

export const SuccessIcon: FC<SvgProps> = () => {
  return (
    <View style={styles.SuccessIcon_wrapper}>
      <Svg width={90} height={90} viewBox="0 0 50 50">
        <Circle cx={25} cy={25} r={25} fill="#25AE88" />
        <Polyline
          points="38,15 22,33 12,25"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
        />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  SuccessIcon_wrapper: {
    flex: 1,
  },
})
