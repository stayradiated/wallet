import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, Text, TextInput, Button } from 'react-native'

import { useWallet, updateWallet } from './data'

const EditWallet = (props) => {
  const { navigation, route } = props
  const { walletId } = route.params

  const { status, data: wallet } = useWallet(walletId)

  const [name, setName] = useState('')
  const [currency, setCurrency] = useState('')

  const hasChanges =
    name !== wallet?.name ||
    currency !== wallet?.currency

  useEffect(() => {
    if (status === 'success') {
      setName(wallet.name)
      setCurrency(wallet.currency)
    }
  }, [status, wallet])

  const handleSave = () => {
    updateWallet({
      ...wallet,
      id: walletId,
      name,
      currency,
      updatedAt: Date.now()
    })
    navigation.goBack()
  }


  return (
    <SafeAreaView>
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
      <Button title="Save Changes" onPress={handleSave} disabled={!hasChanges} />
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

export default EditWallet
