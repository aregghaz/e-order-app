import { View, Text, Image } from 'native-base'
import { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { isMedium, screenHeight } from '~utils/breakpoints'

interface ITrendingItems {
  items: TTrendingItems[]
}

export type TTrendingItems = {
  image: string
  name: string
}

const colors = {
  headingColor: '#212529',
  borderColor: 'rgb(0,0,0,0.175)',
  nameColor: '#646464',
}

const TrendingItems: FC<ITrendingItems> = ({ items }) => {
  return (
    <View style={styles.main}>
      <Text style={styles.heading}>Trending</Text>
      <View style={styles.container}>
        {items.map(({ image, name }, index) => {
          return (
            <TouchableOpacity key={index} style={styles.item}>
              <Image
                src={image}
                alt={`Trending ${name}`}
                style={styles.image}
                // width={300}
                // height={300}
                resizeMode={'cover'}
              />
              <Text style={styles.name}>{name}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 'auto',
    justifyContent: 'space-between',
    width: '100%',
  },

  heading: {
    color: colors.headingColor,
    fontSize: 20,
    marginBottom: 10,
  },

  image: {
    height: isMedium ? '85%' : '80%',
    marginBottom: isMedium ? 18 : 15,
    width: '100%',
    // borderTopLeftRadius: 8,
    // borderTopRightRadius: 8,
  },

  item: {
    alignItems: 'center',
    borderColor: colors.borderColor,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1.5,
    height: (screenHeight * 30) / 100,
    justifyContent: 'flex-start',
    marginHorizontal: 2,
    marginVertical: 10,
    overflow: 'hidden',
    width: isMedium ? '30%' : '48%',
  },

  main: {
    alignItems: 'center',
    flexDirection: 'column',
    height: 'auto',
    paddingHorizontal: 10,
    paddingTop: 15,
  },

  name: {
    color: colors.nameColor,
    fontSize: isMedium ? 18 : 16,
    fontWeight: '700',
  },
})

export default TrendingItems
