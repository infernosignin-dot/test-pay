"use client"

import { useRef, type MouseEvent, type ReactNode } from "react"

interface CTAButtonProps {
  onClick: () => void
  disabled?: boolean
  children: ReactNode
}

export function CTAButton({ onClick, disabled, children }: CTAButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    
    // Create ripple effect
    const button = buttonRef.current
    if (button) {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const ripple = document.createElement("span")
      const size = Math.max(rect.width, rect.height) * 1.5
      
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.35);
        transform: scale(0);
        animation: rippleAnim 0.45s linear;
        pointer-events: none;
        width: ${size}px;
        height: ${size}px;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
      `
      
      button.appendChild(ripple)
      setTimeout(() => ripple.remove(), 500)
    }
    
    onClick()
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      disabled={disabled}
      className={`
        w-full py-[15px] px-4 rounded-[14px] text-[15px] font-medium text-white
        bg-gradient-to-br from-[#4A7C1F] to-[#639922]
        shadow-[0_4px_14px_rgba(74,124,31,0.3)]
        transition-all duration-[180ms] relative overflow-hidden
        select-none cursor-pointer font-sans tracking-[0.01em]
        hover:enabled:-translate-y-[1px] hover:enabled:shadow-[0_6px_20px_rgba(74,124,31,0.35)]
        active:enabled:scale-[0.97] active:enabled:opacity-[0.92]
        disabled:opacity-45 disabled:cursor-not-allowed
        before:content-[''] before:absolute before:inset-0
        before:bg-gradient-to-br before:from-white/[0.12] before:to-transparent
        before:rounded-[14px] before:pointer-events-none
      `}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {children}
    </button>
  )
}
