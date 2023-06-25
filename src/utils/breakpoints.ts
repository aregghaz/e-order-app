import { Dimensions } from 'react-native'

export const screenWidth = Dimensions.get('window').width
export const screenScale = Dimensions.get('window').scale
export const screenHeight = Dimensions.get('window').height

export const isLarge = screenWidth >= 800
export const isMedium = screenWidth >= 400
export const isSmall = screenWidth >= 380

export const getVH = (percent: number) => (screenHeight * percent) / 100
export const getVW = (percent: number) => (screenWidth * percent) / 100
