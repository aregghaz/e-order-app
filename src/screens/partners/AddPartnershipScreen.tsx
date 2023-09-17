import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'

import { SHOP_API } from '~api'
import { CustomButton } from '~components/molecules/CustomButton'
import { PARTNERS_STATUS, TPartners, TPartnersStatus } from '~constants'
import { getShopId, notification } from '~services/ShopService'
import { customStyles } from '~utils/style_helpers'

export const AddPartnershipScreen: FC = () => {
  const [suppliers, setSuppliers] = useState<any>([])

  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        const getID = await getShopId()
        if (getID !== undefined && getID.length > 10) {
          const data = await SHOP_API.searchParthner(getID, 1)
          setSuppliers(data.payload.content)
        }
      }

      getData()
    }, [loading])
  )
  const handleOnPress = async (id: string) => {
    const getID = await getShopId()

    if (getID !== undefined) {
      await SHOP_API.addParthner(id, getID)
      setPage(1)
      setLoading(!loading)
      await notification('Добавлено')
    }
  }

  const renderFooter = () => {
    return (
      <View>
        <ActivityIndicator />
      </View>
    )
  }
  const handleLoadMore = async () => {
    const getID = await getShopId()
    const data = await SHOP_API.searchParthner(getID, page)
    setSuppliers([...suppliers, ...data.payload.content])
    setPage(page + 1)
  }
  return (
    <View style={styles.ShopListScreen_wrapper}>
      <FlatList
        data={suppliers}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={() => handleLoadMore()}
        onEndReachedThreshold={0.5}
        renderItem={(e: any) => {
          const item = e.item
          return (
            <View key={item.id} style={styles.box}>
              <Text style={styles.title}>{item.companyName}</Text>
              <View style={styles.buttonsContainer}>
                <CustomButton
                  title={t(PARTNERS_STATUS[item.partnershipStatus as TPartnersStatus] as TPartners)}
                  width={200}
                  padding={15}
                  border="grey"
                  background="white"
                  color="red"
                  onPress={() => handleOnPress(item.id)}
                />
              </View>
            </View>
          )
        }}
      />
    </View>
  )
}

const colors = {
  black: 'black',
  white: 'white',
  borderColor: '#d1d1d1',
  background: '#f1f1f1',
}

const styles = StyleSheet.create({
  ShopListScreen_wrapper: {
    flex: 1,
    position: 'relative',
  },
  box: {
    borderRadius: 5,
    margin: 10,
    minHeight: 100,
    padding: 5,
    ...customStyles.border(1, 'solid', colors.borderColor),
  },
  buttonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
    margin: 5,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
})
