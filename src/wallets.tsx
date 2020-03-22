import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import * as COLORS from './colors'

const Wallets = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle='dark-content' />

      <Text style={styles.heading}>Wallets</Text>
      <FlatList 
        alwaysBounceVertical={false}
        data={[
          {key: 'NZ Cash', value: '$ 27.00'},
          {key: 'EU Cash', value: '€ 72.00'},
          {key: 'Croatian Cash', value: 'HRK 24.50'},
          {key: 'UK Cash', value: '£ 88.10'},
        ]}
        renderItem={({ index, item }) => (
          <View
            style={[
              styles.item,
              index % 2 === 0 && styles.itemOdd
            ]}
          >
            <Text style={styles.itemName}>{item.key}</Text>
            <Text style={styles.itemValue}>{item.value}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addAccountBtn}>
        <Ionicons
          name='md-add-circle'
          size={60}
          color={COLORS.listN1}
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
    backgroundColor: COLORS.listN2
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
    fontFamily: 'Menlo'
  },
  addAccountBtn: {
    alignSelf: 'center'
  }
})

export default Wallets
