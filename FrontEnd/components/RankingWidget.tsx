import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Flame, ChevronRight } from "lucide-react";

export function RankingWidget() {
  return (
    <Link href="/ranking" className="group relative block h-full">
      <div className="absolute -inset-0.5 rounded-2xl bg-linear-to-r from-amber-400 to-orange-500 opacity-30 blur transition duration-500 group-hover:opacity-70"></div>

      <Card className="relative h-full overflow-hidden border-2 border-amber-200 bg-white shadow-sm dark:border-amber-900 dark:bg-card/90">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-100 dark:bg-amber-900/20 rounded-full blur-3xl"></div>
        
        <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-[0.03] dark:opacity-5 pointer-events-none translate-x-4">
          <Trophy size={120} />
        </div>

        <CardContent className="relative z-10 flex h-full min-h-[8.5rem] items-center justify-between p-4 lg:min-h-36">
          <div className="flex gap-4 items-center">
            <div className="bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 p-3 rounded-2xl shadow-sm border border-amber-200 dark:border-amber-800">
              <Trophy className="w-8 h-8 text-amber-500 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider mb-0.5">Ranking Semanal</p>
              <h3 className="text-xl font-black flex items-center gap-2 text-foreground">
                Liga Oro
                <span className="flex items-center text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/50 px-2 py-0.5 rounded-full border border-orange-200 dark:border-orange-900">
                  <Flame className="w-3.5 h-3.5 mr-0.5" /> racha x3
                </span>
              </h3>
              <p className="text-sm font-medium mt-1 text-muted-foreground">Estás en la posición <span className="text-primary font-bold">#4</span> de 50</p>
            </div>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center group-hover:bg-amber-100 dark:group-hover:bg-amber-900/60 transition-colors">
            <ChevronRight className="w-6 h-6 text-amber-500" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
