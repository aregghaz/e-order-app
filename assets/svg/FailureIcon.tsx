/**
 * was created by tigran at 03.09.23
 */
import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { Path, Svg, G } from 'react-native-svg'

export const FailureIcon: FC = () => {
  return (
    <View style={styles.FailureIcon_wrapper}>
      <Svg width={90} height={90} viewBox="0 0 256 256">
        <G
          fill="none"
          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
        >
          <Path
            d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z"
            fill="#EC0000"
          />
          <Path
            d="M 28.5 65.5 c -1.024 0 -2.047 -0.391 -2.829 -1.172 c -1.562 -1.562 -1.562 -4.095 0 -5.656 l 33 -33 c 1.561 -1.562 4.096 -1.562 5.656 0 c 1.563 1.563 1.563 4.095 0 5.657 l -33 33 C 30.547 65.109 29.524 65.5 28.5 65.5 z"
            fill="#FFFFFF"
          />
          <Path
            d="M 61.5 65.5 c -1.023 0 -2.048 -0.391 -2.828 -1.172 l -33 -33 c -1.562 -1.563 -1.562 -4.095 0 -5.657 c 1.563 -1.562 4.095 -1.562 5.657 0 l 33 33 c 1.563 1.562 1.563 4.095 0 5.656 C 63.548 65.109 62.523 65.5 61.5 65.5 z"
            fill="#FFFFFF"
          />
        </G>
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  FailureIcon_wrapper: {
    flex: 1,
  },
})
