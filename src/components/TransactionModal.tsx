import { useState, type FC } from 'react'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../types'
import type { Transaction } from '../types'

interface TransactionModalProps {
  transaction?: Transaction
  onClose: () => void
  onSave: (data: Omit<Transaction, 'id' | 'createdAt'>) => void
}

/**
 * Modal form for adding or editing transactions
 */
export const TransactionModal: FC<TransactionModalProps> = ({
  transaction,
  onClose,
  onSave,
}) => {
  const [amount, setAmount] = useState(transaction?.amount.toString() || '')
  const [type, setType] = useState<'income' | 'expense'>(transaction?.type || 'expense')
  const [category, setCategory] = useState(transaction?.category || EXPENSE_CATEGORIES[0])
  const [description, setDescription] = useState(transaction?.description || '')
  const [date, setDate] = useState(transaction?.date || new Date().toISOString().split('T')[0])
  const [error, setError] = useState('')

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const parsedAmount = parseFloat(amount)
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid positive amount')
      return
    }
    onSave({ amount: parsedAmount, type, category, description, date })
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{transaction ? 'Edit Transaction' : 'Add Transaction'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              autoFocus
            />
            {error && <span className="error">{error}</span>}
          </div>

          <div className="form-group">
            <label>Type</label>
            <div className="type-toggle">
              <button
                type="button"
                className={`type-btn ${type === 'expense' ? 'active expense' : ''}`}
                onClick={() => {
                  setType('expense')
                  setCategory(EXPENSE_CATEGORIES[0])
                }}
              >
                Expense
              </button>
              <button
                type="button"
                className={`type-btn ${type === 'income' ? 'active income' : ''}`}
                onClick={() => {
                  setType('income')
                  setCategory(INCOME_CATEGORIES[0])
                }}
              >
                Income
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What was this for?"
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}