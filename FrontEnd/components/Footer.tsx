import { cn } from "@/utils/cn";

export function Footer({ className }: { className?: string }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t border-border bg-muted/40 px-5 py-8 text-center text-xs text-muted-foreground",
        className
      )}
    >
      <p className="text-sm font-semibold text-foreground">Lexi Azteca</p>
      <p className="mt-1 max-w-sm mx-auto leading-relaxed">
        Educación financiera e inclusión para jóvenes en México.
      </p>
      <p className="mt-4 text-[11px] opacity-80">
        © {year} Lexi. Supervivencia financiera gamificada.
      </p>
    </footer>
  );
}
