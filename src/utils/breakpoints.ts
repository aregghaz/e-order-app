import { Dimensions } from 'react-native'

export const screenWidth = Dimensions.get('window').width

export const isLarge = screenWidth >= 800
export const isMedium = screenWidth >= 600

export const isSmall = screenWidth >= 400
