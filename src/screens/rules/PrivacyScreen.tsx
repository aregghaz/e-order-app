/**
 * was created by tigran at 09.10.23
 */
import React, { FC, useCallback, useState } from 'react'
import { Text, StyleSheet, ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { SHOP_API } from '~api'
import RenderHtml from 'react-native-render-html'
import { useTranslation } from 'react-i18next'
import { screenWidth } from '~utils/breakpoints'

export const PrivacyScreen: FC = () => {
  const [policy, setPolicy] = useState<any>(null)
  const { i18n } = useTranslation()
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const policyData = await SHOP_API.getPrivacyPolicy()
        setPolicy(policyData)
      }
      fetchData()
    }, [])
  )

  return (
    <ScrollView style={styles.PrivacyScreen_wrapper}>
      <Text style={styles.title}>{policy?.payload?.title[i18n.language]}</Text>
      <RenderHtml
        source={{ html: policy?.payload?.body[i18n.language] }}
        contentWidth={screenWidth}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  PrivacyScreen_wrapper: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
})
