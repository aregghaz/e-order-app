/**
 * was created by tigran at 09.10.23
 */
import React, { FC, useCallback, useState } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SHOP_API } from "~api";
import { useTranslation } from "react-i18next";
import RenderHtml from "react-native-render-html";
import { screenWidth } from "~utils/breakpoints";

export const TermConditionsScreen: FC = () => {
  const [terms, setTerms] = useState<any>(null)
  const { i18n } = useTranslation()
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const termsData = await SHOP_API.getTermConditions()
        setTerms(termsData)
      }
      fetchData()
    }, [])
  )
  console.log(terms, 'terms!!!!!!!!!!!!!')
  return (
    <ScrollView style={styles.TermConditionsScreen_wrapper}>
      <Text style={styles.title}>{terms?.payload?.title[i18n.language]}</Text>
      <RenderHtml source={{ html: terms?.payload?.body[i18n.language]}} contentWidth={screenWidth}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  TermConditionsScreen_wrapper: {
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
