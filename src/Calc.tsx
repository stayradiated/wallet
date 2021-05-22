import React, { useEffect, useState, useCallback } from 'react'
import { StatusBar, TextInput, StyleSheet, Text, View } from 'react-native'
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler'
import { useQuery } from 'react-query'
import uuid from 'react-native-uuid'

import Button from './button'
import CheckmarkButton from './button-checkmark'
import CurrencyInput from './currency-input'
import * as COLORS from './colors'

import { appendWalletTranaction } from './data'

const BUTTONS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', 'x', '.']

const appendButton = (userValue: string, button: string) => {
  return transformUserValue(userValue + button)
}

const transformUserValue = (userValue: string) => {
  return userValue.replace(/^0(\d)/, '$1')
}

const Calc = (props) => {
  const { route, navigation } = props
  const { walletId } = route.params

  const [userValue, setUserValue] = useState('')
  const [userText, setUserText] = useState('')

  const containsDot = userValue.indexOf('.') >= 0
  const startsWithZero = userValue[0] === '0'
  const complete = /\.\d\d$/.test(userValue)

  const handleButtonPress = useCallback((button) => {
    setUserValue(appendButton(userValue, button))
  })

  const handleSave = useCallback(() => {
    appendWalletTranaction(walletId, {
      id: uuid.v4(),
      description: userText,
      value: parseFloat(userValue),
      date: Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    navigation.goBack()
  })

  return (
    <View style={styles.appContainer}>
      <StatusBar barStyle="dark-content" />

      <TextInput
        style={styles.userTextInput}
        placeholder="What did you buy?"
        onChangeText={setUserText}
        value={userText}
      />
      <FlingGestureHandler
        direction={Directions.LEFT}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            setUserValue(userValue.slice(0, -1))
          }
        }}
      >
        <View>
          <CurrencyInput value={userValue} />
        </View>
      </FlingGestureHandler>
      <View style={styles.buttonContainer}>
        {BUTTONS.map((label) => {
          const disabled =
            complete ||
            (label === '0' && startsWithZero) ||
            (label === '.' && containsDot)

          if (label === 'x') {
            return (
              <CheckmarkButton
                key={label}
                onPress={handleSave}
                disabled={userValue.length === 0}
              />
            )
          }

          return (
            <Button
              key={label}
              label={label}
              disabled={disabled}
              onPress={handleButtonPress}
            />
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: COLORS.beige,
    paddingHorizontal: 20,
  },
  userTextInput: {
    marginTop: 10,
    fontSize: 18,
    height: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
})

export default Calc
