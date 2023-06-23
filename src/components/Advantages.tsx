import { View, Text, Image } from 'native-base'
import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

const borderColor = 'gray'

export type TAdvantages = {
  icon: string
  text: string
}

interface IAdvantages {
  advantages: TAdvantages[]
}

const Advantages: FC<IAdvantages> = ({ advantages }) => {
  return (
    <View style={styles.body}>
      {advantages.map(({ icon, text }, index) => {
        return (
          <View style={styles.item} key={index}>
            <TouchableOpacity style={styles.button}>
              <Image src={icon} alt={text} width={40} height={55} resizeMode={'contain'} />
              <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
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
    width: '100%',
  },

  button: {
    alignItems: 'center',
    borderColor,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
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
