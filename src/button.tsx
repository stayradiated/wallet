import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import * as COLORS from './colors'

interface ButtonProps {
  label: string,
  onPress: (string) => void,
  disabled?: boolean,
}

const Button = (props: ButtonProps) => {
  const { label, onPress, disabled } = props


  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress.bind(null, label)}
    >
      <View style={styles.button}>
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.darkbeige,
    width: 80,
    height: 80,
    borderRadius: 80/2,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 24
  }
})

export default Button
