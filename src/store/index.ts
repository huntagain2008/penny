import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Transaction } from '../types'

interface LedgerState {
  transactions: Transaction[]
  currency: string
  addTransaction: (tx: Omit<Transaction, 'id' | 'createdAt'>) => void
  updateTransaction: (id: string, tx: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void
  setCurrency: (currency: string) => void
}

export const useLedgerStore = create<LedgerState>()(
  persist(
    (set) => ({
      transactions: [],
      currency: 'USD',

      addTransaction: (tx) => {
        const newTx: Transaction = {
          ...tx,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        }
        set((state) => ({
          transactions: [newTx, ...state.transactions],
        }))
      },

      updateTransaction: (id, updates) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        }))
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }))
      },

      setCurrency: (currency) => {
        set({ currency })
      },
    }),
    {
      name: 'household-ledger',
    }
  )
)