import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { enableScreens } from 'react-native-screens'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import AddWallet from './AddWallet'
import Calc from './Calc'
import EditWallet from './EditWallet'
import Transaction from './Transaction'
import Wallet from './Wallet'
import WalletList from './WalletList'

import { queryClient } from './data'

enableScreens()
const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator>
          <Stack.Screen name="Wallets" component={WalletList} />
          <Stack.Screen name="Add Wallet" component={AddWallet} />
          <Stack.Screen name="Calc" component={Calc} />
          <Stack.Screen name="Wallet" component={Wallet} />
          <Stack.Screen name="Edit Wallet" component={EditWallet} />
          <Stack.Screen name="Transaction" component={Transaction} />
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  )
}

export default App
