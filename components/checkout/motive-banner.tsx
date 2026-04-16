"use client"

interface MotiveBannerProps {
  title: string
  subtitle: string
  show: boolean
}

export function MotiveBanner({ title, subtitle, show }: MotiveBannerProps) {
  return (
    <div 
      className={`text-center px-6 pt-5 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        show 
          ? "opacity-100 translate-y-0 scale-100" 
          : "opacity-0 -translate-y-3 scale-[0.97]"
      }`}
    >
      <p 
        className={`font-serif text-[22px] font-semibold text-[#4A7C1F] leading-[1.3] tracking-[-0.01em] whitespace-pre-line transition-all duration-[280ms] ease-out ${
          show ? "opacity-100 translate-y-0 delay-[80ms]" : "opacity-0 translate-y-1.5"
        }`}
      >
        {title}
      </p>
      <p 
        className={`text-[12px] text-[#7A8F6A] mt-1 font-light transition-all duration-[280ms] ease-out ${
          show ? "opacity-100 translate-y-0 delay-[180ms]" : "opacity-0 translate-y-1.5"
        }`}
      >
        {subtitle}
      </p>
    </div>
  )
}
