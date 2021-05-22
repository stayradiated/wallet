import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import * as COLORS from './colors'

interface ButtonProps {
  onPress: (string) => void,
  disabled?: boolean,
}

const CheckmarkButton = (props: ButtonProps) => {
  const { onPress, disabled } = props

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={[styles.button, disabled && styles.disabledButton]}>
        <Ionicons name="md-checkmark" size={40} color="white" />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.accent,
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  disabledButton: {
    opacity: 0.3,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 24,
  },
})

export default CheckmarkButton
