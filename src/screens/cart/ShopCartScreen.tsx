/**
 * was created by tigran at 09.08.23
 */
import {useFocusEffect} from '@react-navigation/native'
import {CheckIcon, Select} from 'native-base'
import React, {FC, useCallback, useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next'
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native'
import { ALERT_TYPE } from 'react-native-alert-notification'

import {SHOP_API} from '~api'
import {CartItems} from '~components/CartItem'
import {CustomButton} from '~components/molecules/CustomButton'
import {SCREEN} from '~constants'
import {getShopId, notification} from '~services/ShopService'
import {customStyles} from '~utils/style_helpers'

export const ShopCartScreen: FC = ({navigation}: any) => {
    const {t} = useTranslation()
    const [data, setData] = useState<null | any>([])
    const [carts, setCarts] = useState<null | any>([])
    const [carId, setCartId] = useState<string>('')
    const [trigger, setTrigger] = useState(false)
    const [selectedShops, setSelectedShops] = useState('')
    const [loding, setLoading] = useState(false)
    const [carData, setCarData] = useState({
        selectedShops: '',
        shop: '',
        total: 0,
        totalReward: 0,
    })

    useFocusEffect(
        useCallback(() => {
            setCarts([])
            const getShopCarts = async () => {
                const getID = await getShopId()

                if (getID) {
                    const data = await SHOP_API.getShopCarts(getID)
                    if (data) {
                        const item = data.payload.content
                        setSelectedShops(item[0].id)
                        setCarData({
                            selectedShops: item[0].supplier.companyName,
                            shop: item[0].shop.shopName,
                            total: item[0].cartTotal,
                            totalReward: item[0].totalReward,
                        })
                        setCarts(item[0].cartItems)
                        setCartId(item[0].id)
                        setData(item)

                    }
                    setLoading(true)
                }else{
                    await notification(t('shop.add'), ALERT_TYPE.DANGER)
                    navigation.navigate(SCREEN.STACK_SHOP_LIST)
                }
            }
            getShopCarts()
        }, [trigger])
    )

    useEffect(() => {
        const getCartData = async () => {
            data.map((item: any) => {
                if (item.id === selectedShops) {
                    setCarData({
                        selectedShops: item.supplier.companyName,
                        shop: item.shop.shopName,
                        total: item.cartTotal,
                        totalReward: item.totalReward,
                    })
                    setCarts(item.cartItems)
                    setLoading(true)
                }
            })
        }
        getCartData()
    }, [loding])

    ///console.log(carts,'cartscarts')
    const handleDelete = async (Ids: { "cartItemID": string, "itemId": string }) => {
        await SHOP_API.deleteFromCart(Ids.cartItemID, Ids.itemId)
        setTrigger(!trigger)
    }
    const handlerCheckOut = (id: string) => {
        navigation.navigate(SCREEN.CHECKOUT, {id})
    }

    return (
        loding ? (<>
            <View style={styles.ShopCartScreen_wrapper}>
                <View style={styles.ShopListScreen_wrapper}>
                    <View style={styles.select_wrapper}>
                        {carts.length > 0 && (
                            <Select
                                selectedValue={selectedShops}
                                minWidth="360"
                                height="50"
                                borderColor="#CCC"
                                marginY="2"
                                color="#000"
                                letterSpacing="1"
                                fontSize="17"
                                accessibilityLabel="Choose Service"
                                placeholder="Choose Service"
                                _selectedItem={{
                                    bg: 'teal.600',
                                    endIcon: <CheckIcon size="5"/>,
                                }}
                                mt={1}
                                onValueChange={(itemValue) => {
                                    setSelectedShops(itemValue)
                                    setLoading(false)
                                }}
                            >
                                {data.map((item: any) => {
                                    return (
                                        <Select.Item label={item.supplier.companyName} key={item.id} value={item.id}/>
                                    )
                                })}
                            </Select>
                        )}
                    </View>
                </View>
                <View style={styles.scrollView}>
                    {carts.length > 0 ? (
                        <CartItems trigger={trigger} setTrigger={setTrigger} isDelete={true} elem={carts}
                                   onDelete={handleDelete} cartItemId={selectedShops}/>
                    ) : (
                        <View style={styles.no_product}>
                            <Text>There is no products here</Text>
                        </View>
                    )}
                </View>
            </View>
            <View style={styles.btn_wrapper}>
                <View style={styles.orderViewContainer}>
                    <View style={styles.orderView}>
                        <Text> Итоги: </Text>
                        <View style={styles.hr}/>
                        <Text>Поставщик: {carData.selectedShops}</Text>
                        <Text>Магазин: {carData.shop} </Text>
                        <Text>Бонус за заказ : {carData.totalReward.toFixed(2)}</Text>
                        <Text>Итоговая сумма : {carData.total.toFixed(2)} </Text>
                    </View>
                </View>
                <CustomButton
                    width={340}
                    padding={10}
                    border="grey"
                    background="black"
                    color="white"
                    title={'Go To Checkout'}
                    onPress={() => handlerCheckOut(selectedShops)}
                />
            </View>
        </>) : (<View style={[styles.container, styles.horizontal]}><ActivityIndicator size="large"/></View>)
    )
}

const colors = {
    borderColor: '#d1d1d1',
    red: 'red',
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    ShopCartScreen_wrapper: {
        justifyContent: 'center',
    },
    ShopListScreen_wrapper: {
        flex: 1,
        position: 'relative',
    },
    btn_wrapper: {
        paddingVertical: 10,
        ...customStyles.border(1, 'solid', colors.borderColor),
        alignItems: 'center',
    },

    hr: {
        ...customStyles.border(1, 'solid', colors.borderColor),
        marginVertical: 3,
        width: 200,
    },
    no_product: {
        alignItems: 'center',
        marginTop: 20,
    },
    // image_wrapper: {
    //   ...customStyles.border(1, "solid", colors.borderColor),
    //   width: 100,
    //   height: 100,
    //   marginRight: 10
    // },
    orderView: {
        // width: 340,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 10,
        // backgroundColor: 'red',
    },
    orderViewContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: 340,
    },
    scrollView: {
        marginTop: 68,
    },
    select_wrapper: {
        alignItems: 'center',
    },
})
