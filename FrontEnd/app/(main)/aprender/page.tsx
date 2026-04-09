"use client";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";

export default function AprenderPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 p-6 pb-28 flex flex-col items-center justify-center text-center">
        <div className="bg-secondary/30 p-8 rounded-full mb-6">
          <BookOpen size={48} className="text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Módulos Educativos
        </h1>
        <p className="text-muted-foreground max-w-md mb-8">
          Acceso a los módulos educativos para mejorar el &quot;Score de Supervivencia&quot;. Aprende conceptos clave de finanzas personales.
        </p>
        
        <Button 
          onClick={() => router.push("/dashboard")}
          variant="outline"
          className="w-full max-w-xs"
        >
          Volver al Dashboard
        </Button>
      </main>
    </div>
  );
}
