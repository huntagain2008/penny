import { z } from 'zod'

/**
 * Expense category options for tracking spending
 */
export const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Utilities',
  'Shopping',
  'Healthcare',
  'Entertainment',
  'Education',
  'Other',
] as const

/**
 * Income category options for tracking earnings
 */
export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Investment',
  'Gift',
  'Other',
] as const

/**
 * Supported currencies with symbol and code
 */
export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
] as const

/**
 * Zod schema for Transaction validation
 * @see Transaction
 */
export const TransactionSchema = z.object({
  id: z.string(),
  amount: z.number().positive(),
  type: z.enum(['income', 'expense']),
  category: z.string(),
  description: z.string().optional().default(''),
  date: z.string(),
  createdAt: z.string(),
})

/**
 * Zod schema for application configuration
 */
export const ConfigSchema = z.object({
  currency: z.string().default('USD'),
})

/**
 * Transaction type representing a single income or expense entry
 * @typedef {Object} Transaction
 * @property {string} id - Unique identifier
 * @property {number} amount - Transaction amount (positive number)
 * @property {'income' | 'expense'} type - Transaction type
 * @property {string} category - Category name
 * @property {string} [description] - Optional description
 * @property {string} date - Date in ISO format (YYYY-MM-DD)
 * @property {string} createdAt - Creation timestamp in ISO format
 */
export type Transaction = z.infer<typeof TransactionSchema>

/**
 * Currency type representing a supported currency
 */
export type Currency = typeof CURRENCIES[number]