import React, { useCallback } from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'

import * as COLORS from '../../colors'

type Props = {
  transaction: Transaction,
  index: number,
  currency: string,
}

const Transaction = (props: TransactionProps) => {
  const { transaction, index, currency, onPress } = props

  const { description, createdAt, value } = transaction

  const handlePressItem = useCallback(() => onPress(transaction), [
    onPress,
    transaction,
  ])

  return (
    <TouchableOpacity onPress={handlePressItem}>
      <View style={[styles.item, index % 2 === 0 && styles.itemOdd]}>
        <Text style={styles.name}>{description}</Text>
        <Text style={styles.date}>{createdAt}</Text>
        <Text style={styles.value}>
          {currency}
          {value.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Menlo',
  },
})

export default Transaction
