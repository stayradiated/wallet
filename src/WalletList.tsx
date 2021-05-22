import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useQuery } from 'react-query'
import { useIsFocused } from '@react-navigation/native'

import { getWalletList } from './data'
import * as COLORS from './colors'

const Wallets = (props) => {
  const { navigation } = props

  // re-render component when routing
  useIsFocused()

  const { status, data } = useQuery('wallet_list', getWalletList)

  const handleAddAccount = () => {
    navigation.navigate('Add Wallet')
  }

  const handleOpenWallet = (wallet) => {
    navigation.navigate('Wallet', {
      walletId: wallet.id,
    })
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.heading}>Wallets</Text>

      <FlatList
        alwaysBounceVertical={false}
        data={data}
        renderItem={({ index, item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleOpenWallet(item)}
          >
            <View style={[styles.item, index % 2 === 0 && styles.itemOdd]}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemValue}>{item.currency}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.addWalletBtn}>
        <Ionicons
          name="md-add-circle"
          size={60}
          color={COLORS.listN1}
          onPress={handleAddAccount}
        />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  heading: {
    padding: 20,
    fontSize: 40,
    fontWeight: 'bold',
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.listN2,
  },
  itemOdd: {
    backgroundColor: COLORS.listN1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemValue: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Menlo',
  },
  addWalletBtn: {
    alignSelf: 'center',
  },
})

export default Wallets
