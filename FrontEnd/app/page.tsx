"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";

export default function Home() {
  const router = useRouter();
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const [storeHydrated, setStoreHydrated] = useState(false);

  useEffect(() => {
    const unsub = useAppStore.persist.onFinishHydration(() =>
      setStoreHydrated(true),
    );
    if (useAppStore.persist.hasHydrated()) {
      setStoreHydrated(true);
    }
    return unsub;
  }, []);

  useEffect(() => {
    if (!storeHydrated) return;
    router.replace(isAuthenticated ? "/dashboard" : "/login");
  }, [storeHydrated, isAuthenticated, router]);

  return (
    <div className="min-h-dvh flex items-center justify-center bg-background text-muted-foreground text-sm">
      Cargando…
    </div>
  );
}
