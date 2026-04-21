# Household Ledger - Specification

## Overview
- **Type**: Single-page web application
- **Core functionality**: Track daily household expenses with categorization, currency selection, and summary views
- **Target users**: Individuals or families managing household budgets

## Visual & UI Specification

### Theme
- **Style**: Modern minimalist with warm earth tones
- **Color palette**:
  - Background: `#faf8f5` (warm off-white)
  - Card background: `#ffffff`
  - Primary accent: `#c4785a` (terracotta)
  - Secondary: `#5c8a6e` (sage green)
  - Text primary: `#2d2a26`
  - Text secondary: `#6b6560`
  - Danger/expense: `#d4574e`
  - Success/income: `#5c8a6e`
  - Border: `#e8e4df`
- **Typography**:
  - Headings: "Fraunces" (variable, serif) - Google Fonts
  - Body: "DM Sans" - Google Fonts

### Layout
- Header with app title, currency selector, and total summary
- Main content: transaction list with filters
- Floating action button for adding new entries
- Modal for add/edit transaction form

### Components
1. **Header**: App branding, currency dropdown, monthly total
2. **Transaction List**: Scrollable list with date grouping
3. **Transaction Card**: Amount, category, description, date, edit/delete
4. **Add Button**: FAB in bottom-right corner
5. **Transaction Modal**: Form with fields for amount, type, category, description, date
6. **Category Badge**: Color-coded category pills
7. **Filter Bar**: Date range, category filter

## Functionality Specification

### Core Features
1. **Add Transaction**: Amount, type (income/expense), category, description, date
2. **Edit Transaction**: Modify any field of existing transaction
3. **Delete Transaction**: Remove with confirmation
4. **Currency Selection**: Dropdown to select from preset currencies (USD, EUR, GBP, JPY, CNY, INR)
5. **Monthly Summary**: Total income vs expenses, balance
6. **Category Filtering**: Filter by expense category
7. **Date Filtering**: View transactions by month

### Expense Categories
- Food & Dining
- Transportation
- Utilities
- Shopping
- Healthcare
- Entertainment
- Education
- Other

### Income Categories
- Salary
- Freelance
- Investment
- Gift
- Other

### Data Handling
- LocalStorage for persistence
- Zustand for state management
- Zod for validation

### Edge Cases
- Empty state when no transactions
- Validation for required fields
- Amount must be positive number

## Acceptance Criteria
- [ ] User can add a new transaction with amount, type, category, description, date
- [ ] User can edit existing transactions
- [ ] User can delete transactions
- [ ] User can switch currency from a preset list
- [ ] Transaction list displays all entries grouped by date
- [ ] Monthly summary shows total income, expenses, and balance
- [ ] Category filter works correctly
- [ ] Data persists across page refresh
- [ ] Responsive on mobile and desktop