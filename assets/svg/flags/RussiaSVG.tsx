/**
 * was created by tigran at 05.09.23
 */
import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { Path, Polygon, Svg } from 'react-native-svg'

export const RussiaSVG: FC = () => {
  return (
    <View style={styles.RussiaSVG_wrapper}>
      <Svg width={25.32} height={28.32} viewBox="0 0 55.32 58.32">
        <Path
          fill="#FFFFFF"
          d="M3.09,0.06h49.13c1.67,0,3.03,1.36,3.03,3.03v16.17H0.06V3.09C0.06,1.42,1.42,0.06,3.09,0.06L3.09,0.06z"
        />
        <Path
          fill="#D52B1E"
          d="M0.06,19.26h55.2v16.17c0,1.67-1.36,3.03-3.03,3.03H3.09c-1.67,0-3.03-1.37-3.03-3.03V19.26L0.06,19.26z"
        />
        <Polygon fill="#0039A6" points="0.06,12.86 55.26,12.86 55.26,25.66 0.06,25.66 0.06,12.86" />
        <Path
          fill="none"
          stroke="#CCCCCC"
          strokeWidth="0.1199"
          strokeMiterlimit="2.6131"
          d="M3.09,0.06h49.13c1.67,0,3.03,1.36,3.03,3.03v32.33c0,1.67-1.36,3.03-3.03,3.03H3.09 c-1.67,0-3.03-1.37-3.03-3.03V3.09C0.06,1.42,1.42,0.06,3.09,0.06L3.09,0.06z"
        />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  RussiaSVG_wrapper: {
    flex: 1,
  },
})
