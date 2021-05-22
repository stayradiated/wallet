import { QueryClient, useQuery } from 'react-query'
import AsyncStorage from '@react-native-async-storage/async-storage'

const queryClient = new QueryClient()

const APP_KEY = 'COM_STAYRADIATED_WALLET:'
const WALLET_TRANSACTIONS = APP_KEY + 'WALLET_TRANSACTIONS'
const WALLET_LIST = APP_KEY + 'WALLET_LIST'

type WalletTransaction = {
  id: string,
  description: string,
  value: number,
}

const setWalletTransactions = async (
  walletId: string,
  transactions: WalletTransaction[],
) => {
  await AsyncStorage.setItem(
    WALLET_TRANSACTIONS + ':' + walletId,
    JSON.stringify(transactions),
  )
  queryClient.invalidateQueries(`wallet_transactions_${walletId}`)
}

const getWalletTransactions = async (
  walletId: string,
): Promise<WalletTransaction[]> => {
  const value = await AsyncStorage.getItem(WALLET_TRANSACTIONS + ':' + walletId)
  if (value != null) {
    try {
      const array = JSON.parse(value)
      return array
    } catch {
      return []
    }
  }
  return []
}

const appendWalletTranaction = async (
  walletId: string,
  tx: WalletTransaction,
) => {
  const list = await getWalletTransactions(walletId)
  return setWalletTransactions(walletId, [...list, tx])
}

const deleteWalletTransaction = async (
  walletId: string,
  transactionId: string,
) => {
  const list = await getWalletTransactions(walletId)
  return setWalletTransactions(
    walletId,
    list.filter((tx) => tx.id !== transactionId),
  )
}

const updateWalletTransaction = async (
  walletId: string,
  transaction: Transaction,
) => {
  const list = await getWalletTransactions(walletId)
  return setWalletTransactions(
    walletId,
    list.map((tx) => {
      if (tx.id === transaction.id) {
        return transaction
      }
      return tx
    }),
  )
}

const useWalletTransactions = (walletId: string) => {
  return useQuery(`wallet_transactions_${walletId}`, () => {
    return getWalletTransactions(walletId)
  })
}

const useWalletTransaction = (walletId: string, transactionId: string) => {
  return useQuery(
    [`wallet_transactions_${walletId}`, transactionId],
    async () => {
      const list = await getWalletTransactions(walletId)
      return list.find((tx) => {
        return tx.id === transactionId
      })
    },
  )
}

type Wallet = {
  id: string,
  name: string,
  currency: string,
}

const setWalletList = async (wallets: Wallet[]): Promise<void> => {
  await AsyncStorage.setItem(WALLET_LIST, JSON.stringify(wallets))
  queryClient.invalidateQueries('wallet_list')
}

const getWalletList = async (): Wallet[] => {
  const value = await AsyncStorage.getItem(WALLET_LIST)
  if (value != null) {
    try {
      return JSON.parse(value)
    } catch {
      return []
    }
  }
  return []
}

const appendWallet = async (wallet: Wallet) => {
  const list = await getWalletList()
  return setWalletList([...list, wallet])
}

const deleteWallet = async (walletId: string) => {
  const list = await getWalletList()
  return setWalletList(list.filter((wallet) => wallet.id !== walletId))
}

const useWallet = (walletId: string) => {
  return useQuery(['wallet_list', walletId], async () => {
    const list = await getWalletList()
    return list.find((w) => w.id === walletId)
  })
}

const updateWallet = async (wallet: Wallet) => {
  const list = await getWalletList()
  return setWalletList(list.map((w) => {
      if (w.id === wallet.id) {
        return wallet
      }
      return w
    }),
  )
}

export {
  appendWallet,
  appendWalletTranaction,
  deleteWallet,
  deleteWalletTransaction,
  getWalletList,
  getWalletTransactions,
  queryClient,
  setWalletTransactions,
  updateWallet,
  updateWalletTransaction,
  useWallet,
  useWalletTransaction,
  useWalletTransactions,
}
