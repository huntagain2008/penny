import type { FC } from 'react'
import { CURRENCIES } from '../types'

interface HeaderProps {
  currency: string
  income: number
  expense: number
  balance: number
  symbol: string
  onCurrencyChange: (currency: string) => void
}

export const Header: FC<HeaderProps> = ({
  currency,
  income,
  expense,
  balance,
  symbol,
  onCurrencyChange,
}) => {
  return (
    <header className="header">
      <div className="header-top">
        <h1>Household Ledger</h1>
        <select
          className="currency-select"
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          aria-label="Select currency"
        >
          {CURRENCIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.symbol} {c.code}
            </option>
          ))}
        </select>
      </div>
      <div className="header-summary">
        <div className="summary-item income">
          <span>Income</span>
          <strong>
            {symbol}
            {income.toFixed(2)}
          </strong>
        </div>
        <div className="summary-item expense">
          <span>Expenses</span>
          <strong>
            {symbol}
            {expense.toFixed(2)}
          </strong>
        </div>
        <div className="summary-item balance">
          <span>Balance</span>
          <strong className={balance >= 0 ? 'positive' : 'negative'}>
            {symbol}
            {balance.toFixed(2)}
          </strong>
        </div>
      </div>
    </header>
  )
}