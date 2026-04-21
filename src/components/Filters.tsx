import type { FC } from 'react'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../types'

const ALL_CATEGORIES = [...new Set([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES])]

interface FiltersProps {
  filterMonth: string
  filterCategory: string
  availableMonths: string[]
  onMonthChange: (month: string) => void
  onCategoryChange: (category: string) => void
  formatMonthName: (monthKey: string) => string
}

export const Filters: FC<FiltersProps> = ({
  filterMonth,
  filterCategory,
  availableMonths,
  onMonthChange,
  onCategoryChange,
  formatMonthName,
}) => {
  return (
    <div className="filters">
      <select
        value={filterMonth}
        onChange={(e) => onMonthChange(e.target.value)}
        aria-label="Filter by month"
      >
        {availableMonths.map((m) => (
          <option key={m} value={m}>
            {formatMonthName(m)}
          </option>
        ))}
      </select>
      <select
        value={filterCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        aria-label="Filter by category"
      >
        <option value="all">All Categories</option>
        {ALL_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  )
}