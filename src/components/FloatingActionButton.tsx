import type { FC } from 'react'

interface FloatingActionButtonProps {
  onClick: () => void
}

export const FloatingActionButton: FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button type="button" className="fab" onClick={onClick} aria-label="Add transaction">
      +
    </button>
  )
}