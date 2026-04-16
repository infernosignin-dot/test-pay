interface StepIndicatorProps {
  current: number
  total: number
  label: string
  compact?: boolean
}

export function StepIndicator({ current, total, label, compact }: StepIndicatorProps) {
  return (
    <div className={`px-6 ${compact ? "pt-3" : "pt-6"}`}>
      <div className="flex gap-1.5 mb-1.5">
        {Array.from({ length: total }, (_, i) => {
          const step = i + 1
          let bgClass = "bg-[#ECF5E0]" // default/upcoming
          if (step < current) bgClass = "bg-[#4A7C1F]" // done
          if (step === current) bgClass = "bg-[#639922]" // active
          
          return (
            <div
              key={step}
              className={`h-[3px] flex-1 rounded-sm transition-colors duration-[350ms] ${bgClass}`}
            />
          )
        })}
      </div>
      <p className="text-[10px] text-[#7A8F6A] tracking-[0.06em] uppercase font-medium">
        Step {current} of {total} — {label}
      </p>
    </div>
  )
}
