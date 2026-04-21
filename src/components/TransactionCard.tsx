import type { FC } from 'react'
import type { Transaction } from '../types'

interface TransactionCardProps {
  transaction: Transaction
  symbol: string
  onEdit: (transaction: Transaction) => void
  onDelete: (id: string) => void
  formatDate: (date: string) => string
}

export const TransactionCard: FC<TransactionCardProps> = ({
  transaction,
  symbol,
  onEdit,
  onDelete,
  formatDate,
}) => {
  const { id, amount, type, category, description, date } = transaction

  return (
    <div className={`transaction-card ${type}`}>
      <div className="tx-main">
        <span className={`category-badge ${type}`}>{category}</span>
        <span className="tx-description">{description || category}</span>
      </div>
      <div className="tx-details">
        <span className="tx-date">{formatDate(date)}</span>
        <span className={`tx-amount ${type}`}>
          {type === 'expense' ? '-' : '+'}
          {symbol}
          {amount.toFixed(2)}
        </span>
      </div>
      <div className="tx-actions">
        <button type="button" className="btn-edit" onClick={() => onEdit(transaction)}>
          Edit
        </button>
        <button type="button" className="btn-delete" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  )
}