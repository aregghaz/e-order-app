import { View, Text, Image } from 'native-base'
import React, { FC } from 'react'
import { StyleSheet } from 'react-native'

const colors = {
  borderColor: '#D2D2D2',
}

export type TAdvantages = {
  id: number
  icon: string
  text: string
  color: string
}

interface IAdvantages {
  advantages: TAdvantages[]
}

const Advantages: FC<IAdvantages> = ({ advantages }) => {
  return (
    <View style={styles.body}>
      {advantages.map(({ icon, text, color, id }) => {
        return (
          <View style={styles.item} key={id}>
            <View style={styles.button}>
              <View style={styles.iconWrapper} backgroundColor={color}>
                <Image src={icon} alt={text} width={25} height={25} resizeMode={'contain'} />
              </View>
              <Text style={styles.text}>{text}</Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 'auto',
    justifyContent: 'space-evenly',
    paddingHorizontal: 5,
    width: '100%',
  },

  button: {
    alignItems: 'center',
    borderColor: colors.borderColor,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
  },

  iconWrapper: {
    alignItems: 'center',
    borderRadius: 100,
    flex: 0,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },

  item: {
    flexGrow: 1,
    height: 130,
    maxWidth: 195,
    padding: 5,
    width: '50%',
  },

  text: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
})

export default Advantages
