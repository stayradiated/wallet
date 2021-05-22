import React, { useState, useCallback } from 'react'
import { Dimensions, TextInput, StyleSheet, Text, View } from 'react-native'

import * as COLORS from './colors'

interface CurrencyInputProps {
  value: string,
}

const WINDOW_WIDTH = Dimensions.get('window').width
const FONT_SIZE_RATIO = 1.7
const MAX_FONT_SIZE = 50

const CurrencyInput = (props: CurrencyInputProps) => {
  const { value } = props

  let textLength = 0

  let [integer, fraction] = value.split('.')
  if (integer.length === 0) {
    integer = <Text style={styles.placeholder}>0</Text>
    textLength += 1
  } else {
    for (let i = integer.length - 4; i >= 0; i -= 3) {
      integer = integer.slice(0, i + 1) + ',' + integer.slice(i + 1)
    }
    textLength += integer.length
  }

  if (fraction == null || fraction.length === 0) {
    fraction = <Text style={styles.placeholder}>00</Text>
  } else if (fraction.length === 1) {
    fraction = (
      <>
        {fraction}
        <Text style={styles.placeholder}>0</Text>
      </>
    )
  }

  const dot = value.includes('.') ? (
    '.'
  ) : (
    <Text style={styles.placeholder}>.</Text>
  )

  textLength += 4
  const fontSize = Math.floor(
    Math.min(MAX_FONT_SIZE, (1 / textLength) * FONT_SIZE_RATIO * WINDOW_WIDTH),
  )
  console.log(textLength, fontSize)

  return (
    <Text style={[styles.main, { fontSize }]}>
      ${integer}
      {dot}
      {fraction}
    </Text>
  )
}

const styles = StyleSheet.create({
  main: {
    fontFamily: 'Menlo',
    minHeight: 50,
    marginVertical: 20,
    textAlign: 'right',
  },
  placeholder: {
    color: COLORS.placeholder,
  },
})

export default CurrencyInput
