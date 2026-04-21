import type { FC } from 'react'
import type { Transaction } from '../types'
import { TransactionCard } from './TransactionCard'
import { formatMonthName } from '../services/transactionService'

interface TransactionListProps {
  groupedTransactions: Map<string, Transaction[]>
  symbol: string
  onEdit: (transaction: Transaction) => void
  onDelete: (id: string) => void
  formatDate: (date: string) => string
}

export const TransactionList: FC<TransactionListProps> = ({
  groupedTransactions,
  symbol,
  onEdit,
  onDelete,
  formatDate,
}) => {
  if (groupedTransactions.size === 0) {
    return (
      <div className="empty-state">
        <p>No transactions this month</p>
      </div>
    )
  }

  return (
    <div className="transactions">
      {[...groupedTransactions.entries()].map(([monthKey, txs]) => (
        <div key={monthKey} className="month-group">
          <div className="month-header">{formatMonthName(monthKey)}</div>
          {txs.map((tx) => (
            <TransactionCard
              key={tx.id}
              transaction={tx}
              symbol={symbol}
              onEdit={onEdit}
              onDelete={onDelete}
              formatDate={formatDate}
            />
          ))}
        </div>
      ))}
    </div>
  )
}