import { useState } from 'react'
import { useLedgerStore } from './store'
import { useTransactions, useCurrency, useAvailableMonths, formatDate } from './hooks'
import { getMonthKey, formatMonthName } from './services/transactionService'
import { Header } from './components/Header'
import { Filters } from './components/Filters'
import { TransactionList } from './components/TransactionList'
import { FloatingActionButton } from './components/FloatingActionButton'
import { TransactionModal } from './components/TransactionModal'
import { ConfirmModal } from './components/ConfirmModal'
import type { Transaction } from './types'

function App() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useLedgerStore()
  const { currency, symbol, setCurrency } = useCurrency()
  const now = new Date()
  const currentMonth = getMonthKey(now.toISOString())
  const [filterMonth, setFilterMonth] = useState(currentMonth)
  const [filterCategory, setFilterCategory] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { grouped, totals } = useTransactions(filterMonth, filterCategory)
  const availableMonths = useAvailableMonths()

  const displayMonths =
    transactions.length > 0 && !availableMonths.includes(filterMonth)
      ? availableMonths.includes(currentMonth)
        ? availableMonths
        : [currentMonth, ...availableMonths]
      : availableMonths

  const handleSave = (data: Omit<Transaction, 'id' | 'createdAt'>) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, data)
    } else {
      addTransaction(data)
    }
    setShowModal(false)
    setEditingTransaction(undefined)
  }

  const handleEdit = (tx: Transaction) => {
    setEditingTransaction(tx)
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    setDeleteId(id)
  }

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteTransaction(deleteId)
      setDeleteId(null)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingTransaction(undefined)
  }

  return (
    <div className="app">
      <Header
        currency={currency}
        income={totals.income}
        expense={totals.expense}
        balance={totals.balance}
        symbol={symbol}
        onCurrencyChange={setCurrency}
      />

      <Filters
        filterMonth={filterMonth}
        filterCategory={filterCategory}
        availableMonths={displayMonths}
        onMonthChange={setFilterMonth}
        onCategoryChange={setFilterCategory}
        formatMonthName={formatMonthName}
      />

      <TransactionList
        groupedTransactions={grouped}
        symbol={symbol}
        onEdit={handleEdit}
        onDelete={handleDelete}
        formatDate={formatDate}
      />

      <FloatingActionButton onClick={() => setShowModal(true)} />

      {showModal && (
        <TransactionModal
          transaction={editingTransaction}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}

      {deleteId && (
        <ConfirmModal
          message="Delete this transaction?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  )
}

export default App