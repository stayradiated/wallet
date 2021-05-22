import React, { useState, useEffect } from 'react'
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
} from 'react-native'

import {
  updateWalletTransaction,
  deleteWalletTransaction,
  useWalletTransaction,
} from '../data'

const Transaction = (props) => {
  const { navigation, route } = props
  const { walletId, transactionId } = route.params

  const { status, data: transaction } = useWalletTransaction(
    walletId,
    transactionId,
  )

  const [description, setDescription] = useState(transaction?.description)
  const [value, setValue] = useState(transaction?.value?.toFixed(2))

  const hasChanges =
    description !== transaction?.description ||
    parseFloat(value) !== transaction?.value

  useEffect(() => {
    if (status === 'success') {
      setDescription(transaction?.description)
      setValue(transaction?.value.toFixed(2))
    }
  }, [status, transaction])

  const handleSave = () => {
    updateWalletTransaction(walletId, {
      ...transaction,
      description,
      value: parseFloat(value),
      updatedAt: Date.now(),
    })
    navigation.goBack()
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteWalletTransaction(walletId, transactionId)
            navigation.goBack()
          },
        },
      ],
    )
  }

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Value"
        value={value}
        onChangeText={setValue}
      />
      <Button
        title="Save Changes"
        onPress={handleSave}
        disabled={!hasChanges}
      />
      <Button title="Delete" onPress={handleDelete} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    margin: 12,
    padding: 12,
    borderWidth: 1,
  },
})

export default Transaction
