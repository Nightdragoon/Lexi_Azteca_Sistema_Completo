"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useMacToastStore } from "@/store/useMacToastStore";
import { cn } from "@/utils/cn";

export function MacToast() {
  const visible = useMacToastStore((s) => s.visible);
  const title = useMacToastStore((s) => s.title);
  const subtitle = useMacToastStore((s) => s.subtitle);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[200] flex justify-end p-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:p-4"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key="mac-toast"
            role="status"
            initial={{ opacity: 0, x: 56, scale: 0.92, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 32, scale: 0.96 }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 32,
              mass: 0.65,
            }}
            className="pointer-events-auto w-[min(100%,20rem)]"
          >
            <div
              className={cn(
                "flex gap-3 rounded-2xl border border-white/25 px-3.5 py-3 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.35),inset_0_0_0_0.5px_rgba(0,0,0,0.04)]",
                "bg-white/72 backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-900/75",
                "ring-1 ring-black/5 dark:ring-white/10"
              )}
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#34C759]/15 text-[#248a3d] dark:bg-[#30d158]/20 dark:text-[#32d74b]">
                <CheckCircle2 className="size-6" strokeWidth={2} aria-hidden />
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-[13px] font-semibold leading-tight tracking-[-0.01em] text-[#1d1d1f] dark:text-zinc-100">
                  {title}
                </p>
                {subtitle ? (
                  <p className="mt-0.5 text-[12px] leading-snug text-[#636366] dark:text-zinc-400">
                    {subtitle}
                  </p>
                ) : null}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
