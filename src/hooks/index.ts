import { useMemo } from 'react'
import { useLedgerStore } from '../store'
import {
  calculateMonthlyTotals,
  filterTransactions,
  groupByMonth,
  getMonthKey,
  getCurrencySymbol,
} from '../services/transactionService'
import { CURRENCIES } from '../types'

export function useTransactions(filterMonth: string, filterCategory: string) {
  const { transactions } = useLedgerStore()

  const filtered = useMemo(
    () => filterTransactions(transactions, filterMonth, filterCategory),
    [transactions, filterMonth, filterCategory]
  )

  const grouped = useMemo(() => groupByMonth(filtered), [filtered])

  const totals = useMemo(() => calculateMonthlyTotals(filtered), [filtered])

  return {
    transactions: filtered,
    grouped,
    totals,
  }
}

export function useCurrency() {
  const { currency, setCurrency } = useLedgerStore()

  const symbol = useMemo(() => getCurrencySymbol(currency, CURRENCIES), [currency])

  return {
    currency,
    symbol,
    setCurrency,
    currencies: CURRENCIES,
  }
}

export function useAvailableMonths(): string[] {
  const { transactions } = useLedgerStore()

  return useMemo(() => {
    const months = new Set<string>()
    transactions.forEach((tx) => {
      months.add(getMonthKey(tx.date))
    })
    return Array.from(months).sort().reverse()
  }, [transactions])
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}