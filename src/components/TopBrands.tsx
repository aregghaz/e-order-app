// import React, { FC } from 'react'
// import { View, Text, ScrollView } from "native-base";
// import { StyleSheet } from 'react-native'
// import Carousel from 'react-native-snap-carousel'
// import { getVW, screenWidth } from "~utils/breakpoints";
//
// interface ITopBrands {}
//
// const TopBrands: FC<ITopBrands> = () => {
//   return (
//     <View style={styles.main}>
//       <Text style={styles.heading}>Hello world</Text>
//       <ScrollView style={styles.container} horizontal={true}>
//         {
//           Array(5).fill(undefined).map(item => {
//             return (
//               <View>
//                 <Text>Hello world</Text>
//               </View>
//             )
//           })
//         }
//       </ScrollView>
//     </View>
//   )
// }
//
// const styles = StyleSheet.create({
//   main: {
//     backgroundColor: 'red',
//     width: '100%',
//     height: 200,
//     alignItems: 'center',
//     paddingTop: 20,
//   },
//
//   heading: {
//     fontSize: 18,
//   },
//
//   container: {
//     width: '100%',
//     height: 100,
//     backgroundColor: 'aqua',
//   },
// })
//
// export default TopBrands
