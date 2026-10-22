type StatPillProps = {
  icon: string
  label: string
  value: string | number
  className?: string
}

export function StatPill({ icon, label, value, className = '' }: StatPillProps) {
  return (
    <div className={`stat-pill ${className}`} aria-label={`${label}: ${value}`}>
      <span className="stat-icon" aria-hidden="true">{icon}</span>
      <span className="stat-label">{label}</span>
      <strong>{value}</strong>
    </div>
  )
}
