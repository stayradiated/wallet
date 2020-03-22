import React, { useState, useCallback } from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';

import * as COLORS from './colors'

interface CurrencyInputProps {
  value: string
}

const CurrencyInput = (props: CurrencyInputProps) => {
  const { value } = props

  let [integer, fraction] = value.split('.')
  if (integer.length === 0) {
    integer = <Text style={styles.placeholder}>0</Text>
  }
  for (let i = integer.length - 4; i >= 0; i -= 3) {
    console.log(i)
    integer = integer.slice(0, i+1) + ',' + integer.slice(i+1)
  }

  if (fraction == null || fraction.length === 0) {
    fraction = <Text style={styles.placeholder}>00</Text>
  } else if (fraction.length === 1) {
    fraction = <>{fraction}<Text style={styles.placeholder}>0</Text></>
  }

  const dot = value.includes('.')
    ? '.'
    : <Text style={styles.placeholder}>.</Text>

  return (
    <Text style={styles.main}>
      ${integer}{dot}{fraction}
    </Text>
  )
}

const styles = StyleSheet.create({
  main: {
    fontFamily: 'Menlo',
    fontSize: 50,
    minHeight: 50,
    marginVertical: 20,
    textAlign: 'right',
  },
  placeholder: {
    color: COLORS.placeholder
  }
})

export default CurrencyInput
