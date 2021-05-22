import React from 'react'
import { FlatList } from 'react-native'

import TransactionListItem from './TransactionListItem'

type Props = {
  list: Transaction[],
  currency: string,
  onPressItem: (transaction: Transaction) => void,
}

const TransactionList = (props: TransactionListProps) => {
  const { list, currency, onPressItem } = props

  return (
    <FlatList
      style={{height: 200}}
      alwaysBounceVertical={false}
      data={list}
      renderItem={({ index, item }) => (
        <TransactionListItem
          key={item.id}
          index={index}
          transaction={item}
          currency={currency}
          onPress={onPressItem}
        />
      )}
    />
  )
}

export default TransactionList
