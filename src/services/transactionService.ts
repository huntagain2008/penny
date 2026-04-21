import type { Transaction } from '../types'

export function calculateMonthlyTotals(transactions: Transaction[]) {
  let income = 0
  let expense = 0
  for (const tx of transactions) {
    if (tx.type === 'income') income += tx.amount
    else expense += tx.amount
  }
  return { income, expense, balance: income - expense }
}

export function filterTransactions(
  transactions: Transaction[],
  monthKey: string,
  category?: string
): Transaction[] {
  return transactions.filter((tx) => {
    const txMonth = getMonthKey(tx.date)
    const monthMatch = txMonth === monthKey
    const categoryMatch = !category || category === 'all' || tx.category === category
    return monthMatch && categoryMatch
  })
}

export function groupByMonth(transactions: Transaction[]): Map<string, Transaction[]> {
  const grouped = new Map<string, Transaction[]>()
  transactions.forEach((tx) => {
    const key = getMonthKey(tx.date)
    if (!grouped.has(key)) {
      grouped.set(key, [])
    }
    grouped.get(key)!.push(tx)
  })
  return grouped
}

export function getMonthKey(dateStr: string): string {
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export function formatMonthName(monthKey: string): string {
  const [year, month] = monthKey.split('-')
  const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export function getCurrencySymbol(
  currencyCode: string,
  currencies: readonly { code: string; symbol: string }[]
): string {
  return currencies.find((c) => c.code === currencyCode)?.symbol ?? '$'
}