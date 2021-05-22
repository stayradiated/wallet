import React from 'react'
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'

import * as COLORS from '../colors'
import { useWallet, useWalletTransactions, deleteWallet } from '../data'

import TransactionList from './TransactionList'

const Wallet = (props) => {
  const { route, navigation } = props
  const { walletId } = route.params

  // re-render component when routing
  useIsFocused()

  const { data: wallet } = useWallet(walletId)
  const { data: transactionList } = useWalletTransactions(walletId)

  const total = transactionList?.reduce((sum, tx) => {
    return sum + tx.value
  }, 0)

  const handleEditWallet = () => {
    navigation.navigate('Edit Wallet', { walletId })
  }

  const handleDeleteWallet = () => {
    Alert.alert(
      'Delete Wallet',
      'Are you sure you want to delete this wallet?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteWallet(walletId)
            navigation.goBack()
          },
        },
      ],
    )
  }

  const handleAddItem = () => {
    navigation.navigate('Calc', { walletId })
  }

  const handleOpenTransaction = (tx) => {
    navigation.navigate('Transaction', { walletId, transactionId: tx.id })
  }

  return (
    <SafeAreaView>
      <Text style={styles.heading}>{wallet?.name}</Text>

      <TransactionList
        currency={wallet?.currency}
        list={transactionList}
        onPressItem={handleOpenTransaction}
      />

      <Text style={styles.total}>Total: {total}</Text>

      <TouchableOpacity style={styles.addBtn}>
        <Ionicons
          name="md-add-circle"
          size={60}
          color={COLORS.listN1}
          onPress={handleAddItem}
        />
      </TouchableOpacity>

      <Button title="Edit" onPress={handleEditWallet} />
      <Button title="Delete" onPress={handleDeleteWallet} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  heading: {
    padding: 20,
    fontSize: 40,
    fontWeight: 'bold',
  },
  total: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.listN2,
    fontSize: 18,
    fontWeight: 'bold',
  },
  addBtn: {
    alignSelf: 'center',
  },
})

export default Wallet
