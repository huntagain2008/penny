import { describe, it, expect } from 'vitest'
import {
  calculateMonthlyTotals,
  filterTransactions,
  groupByMonth,
  getMonthKey,
  formatMonthName,
  getCurrencySymbol,
} from './transactionService'
import type { Transaction } from '../types'

const createTransaction = (
  overrides: Partial<Transaction> = {}
): Transaction => ({
  id: 'test-1',
  amount: 100,
  type: 'expense',
  category: 'Food & Dining',
  description: '',
  date: '2026-04-21',
  createdAt: '2026-04-21T00:00:00.000Z',
  ...overrides,
})

describe('transactionService', () => {
  describe('calculateMonthlyTotals', () => {
    it('should return zero for empty transaction list', () => {
      const result = calculateMonthlyTotals([])
      expect(result).toEqual({ income: 0, expense: 0, balance: 0 })
    })

    it('should calculate totals with only expenses', () => {
      const transactions = [
        createTransaction({ id: '1', amount: 50, type: 'expense' }),
        createTransaction({ id: '2', amount: 30, type: 'expense' }),
      ]
      const result = calculateMonthlyTotals(transactions)
      expect(result).toEqual({ income: 0, expense: 80, balance: -80 })
    })

    it('should calculate totals with only income', () => {
      const transactions = [
        createTransaction({ id: '1', amount: 1000, type: 'income' }),
        createTransaction({ id: '2', amount: 500, type: 'income' }),
      ]
      const result = calculateMonthlyTotals(transactions)
      expect(result).toEqual({ income: 1500, expense: 0, balance: 1500 })
    })

    it('should calculate correct balance (income - expense)', () => {
      const transactions = [
        createTransaction({ id: '1', amount: 1000, type: 'income' }),
        createTransaction({ id: '2', amount: 300, type: 'expense' }),
      ]
      const result = calculateMonthlyTotals(transactions)
      expect(result).toEqual({ income: 1000, expense: 300, balance: 700 })
    })
  })

  describe('filterTransactions', () => {
    const transactions = [
      createTransaction({ id: '1', date: '2026-04-01', category: 'Food & Dining' }),
      createTransaction({ id: '2', date: '2026-04-15', category: 'Transportation' }),
      createTransaction({ id: '3', date: '2026-03-01', category: 'Food & Dining' }),
    ]

    it('should filter by month', () => {
      const result = filterTransactions(transactions, '2026-04')
      expect(result).toHaveLength(2)
      expect(result.map((t) => t.id)).toEqual(['1', '2'])
    })

    it('should filter by category', () => {
      const result = filterTransactions(transactions, '2026-04', 'Food & Dining')
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('1')
    })

    it('should return empty array for non-matching month', () => {
      const result = filterTransactions(transactions, '2025-01')
      expect(result).toHaveLength(0)
    })

    it('should treat "all" category as no filter', () => {
      const result = filterTransactions(transactions, '2026-04', 'all')
      expect(result).toHaveLength(2)
    })

    it('should handle undefined category as no filter', () => {
      const result = filterTransactions(transactions, '2026-04', undefined)
      expect(result).toHaveLength(2)
    })
  })

  describe('groupByMonth', () => {
    it('should group transactions by month', () => {
      const transactions = [
        createTransaction({ id: '1', date: '2026-04-01' }),
        createTransaction({ id: '2', date: '2026-04-15' }),
        createTransaction({ id: '3', date: '2026-03-01' }),
      ]
      const result = groupByMonth(transactions)
      expect(result.size).toBe(2)
      expect(result.get('2026-04')).toHaveLength(2)
      expect(result.get('2026-03')).toHaveLength(1)
    })

    it('should return empty map for empty input', () => {
      const result = groupByMonth([])
      expect(result.size).toBe(0)
    })
  })

  describe('getMonthKey', () => {
    it('should return correct month key format', () => {
      expect(getMonthKey('2026-04-21')).toBe('2026-04')
      expect(getMonthKey('2026-12-31')).toBe('2026-12')
      expect(getMonthKey('2026-01-01')).toBe('2026-01')
    })

    it('should pad single digit months', () => {
      expect(getMonthKey('2026-04-01')).toBe('2026-04')
    })
  })

  describe('formatMonthName', () => {
    it('should format month key to readable name', () => {
      expect(formatMonthName('2026-04')).toBe('April 2026')
      expect(formatMonthName('2026-12')).toBe('December 2026')
    })
  })

  describe('getCurrencySymbol', () => {
    const currencies = [
      { code: 'USD', symbol: '$', name: 'US Dollar' },
      { code: 'EUR', symbol: '€', name: 'Euro' },
    ] as const

    it('should return correct symbol for known currency', () => {
      expect(getCurrencySymbol('USD', currencies)).toBe('$')
      expect(getCurrencySymbol('EUR', currencies)).toBe('€')
    })

    it('should return default symbol for unknown currency', () => {
      expect(getCurrencySymbol('XYZ', currencies)).toBe('$')
    })
  })
})