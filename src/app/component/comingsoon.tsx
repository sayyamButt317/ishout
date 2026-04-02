// ComingSoon.tsx
interface ComingSoonProps {
  children?: React.ReactNode;
  enabled?: boolean;
  title?: string;
  message?: string;
  badge?: string;
}

export function ComingSoon({
  children,
  enabled = true,
  title = "Coming Soon",
  message = "We're working hard to bring you something amazing. This feature will be available shortly.",
  badge = "In Development",
}: ComingSoonProps) {
  if (!enabled) return <>{children}</>;

  return (
    <div className="relative w-full min-h-screen">
      {children}

      {/* Overlay — left-0 on mobile (sidebar hidden), left-64 on desktop */}
      <div className="fixed inset-0 z-50 left-0 md:left-74 flex items-center justify-center backdrop-blur-sm bg-black/60">
        <div className="bg-[#0f0f1a] border border-white/10 rounded-2xl shadow-2xl text-center
                        w-[90vw] max-w-[340px] px-6 py-7
                        sm:px-8 sm:py-8
                        md:px-10 md:py-8">

          {/* Icon */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 sm:mb-5 rounded-full bg-violet-500/20 border border-violet-400/20 flex items-center justify-center">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:w-6 sm:h-6"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>

          {/* Badge */}
          <span className="inline-block text-[10px] sm:text-[11px] font-medium tracking-widest uppercase text-violet-400 bg-violet-500/15 border border-violet-400/20 rounded-full px-3 py-1 mb-3 sm:mb-4">
            {badge}
          </span>

          {/* Title */}
          <h2 className="text-white text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
            {title}
          </h2>

          {/* Message */}
          <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
            {message}
          </p>

          {/* Divider */}
          <div className="border-t border-white/10 pt-4 sm:pt-5">
            <p className="text-white/30 text-[11px] sm:text-xs tracking-wide">
              Stay tuned for updates
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}