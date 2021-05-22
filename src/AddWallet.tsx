import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, Button } from 'react-native'
import uuid from 'react-native-uuid'

import { appendWallet } from './data'

const AddWallet = (props) => {
  const { navigation } = props

  const [name, setName] = useState('')
  const [currency, setCurrency] = useState('')

  const handleAddWallet = () => {
    appendWallet({ name, currency, id: uuid.v4(), createdAt: Date.now(), updatedAt: Date.now() })
    navigation.goBack()
  }

  return (
    <SafeAreaView>
      <Text>Add Wallet</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="currency"
        value={currency}
        onChangeText={setCurrency}
      />
      <Button title="Add Wallet" onPress={handleAddWallet} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
})

export default AddWallet
