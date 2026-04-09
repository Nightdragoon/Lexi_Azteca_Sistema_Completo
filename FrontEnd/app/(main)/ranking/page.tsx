import Link from "next/link";
import { ArrowLeft, Trophy, Flame, Medal, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Mock Data
const LEADERBOARD_DATA = [
  { id: 1, name: "María G.", score: 2150, avatar: "👩🏻", trend: "up", isCurrentUser: false },
  { id: 2, name: "Carlos R.", score: 1840, avatar: "👨🏽", trend: "same", isCurrentUser: false },
  { id: 3, name: "Ana P.", score: 1620, avatar: "👱🏼‍♀️", trend: "down", isCurrentUser: false },
  { id: 4, name: "Tú", score: 1250, avatar: "🧑🏻", trend: "up", isCurrentUser: true },
  { id: 5, name: "Luis F.", score: 1100, avatar: "👨🏻", trend: "down", isCurrentUser: false },
  { id: 6, name: "Sofía M.", score: 950, avatar: "👩🏽", trend: "up", isCurrentUser: false },
  { id: 7, name: "Pedro H.", score: 820, avatar: "👨🏼", trend: "same", isCurrentUser: false },
];

export default function RankingPage() {
  const currentUserIndex = LEADERBOARD_DATA.findIndex(u => u.isCurrentUser);
  const pointsToNext = (LEADERBOARD_DATA[currentUserIndex - 1]?.score || 0) - LEADERBOARD_DATA[currentUserIndex].score;

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-background text-foreground font-sans">
      <div className="max-w-[800px] mx-auto min-h-screen bg-background relative shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <header className="px-5 py-4 flex items-center justify-between border-b bg-white dark:bg-card z-10 sticky top-0">
          <Link href="/dashboard" className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">Ranking Semanal</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </header>

        <main className="flex-1 overflow-y-auto pb-28">
          {/* User Progress Header */}
          <div className="bg-linear-to-b from-amber-400 to-orange-500 dark:from-amber-600 dark:to-orange-800 text-white px-5 pt-8 pb-12 text-center rounded-b-3xl shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-900/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>

            <div className="relative z-10">
              <div className="inline-flex justify-center items-center bg-white/20 backdrop-blur-sm p-4 rounded-full mb-4 shadow-inner border border-white/30">
                <Trophy className="w-14 h-14 text-yellow-200 drop-shadow-lg" />
              </div>
              <h2 className="text-4xl font-black mb-1 drop-shadow-md">Liga Oro</h2>
              <p className="text-amber-100 font-medium text-lg flex items-center justify-center gap-2 drop-shadow">
                <Flame className="w-5 h-5 text-orange-200" /> Racha de 3 días
              </p>
              
              <Card className="mt-8 bg-white/10 backdrop-blur-md border-white/20 text-white shadow-xl">
                <CardContent className="p-5">
                  <div className="flex justify-between items-end mb-3">
                    <div className="text-left">
                      <p className="text-sm text-amber-100 font-medium opacity-90">Puntaje Total</p>
                      <p className="text-3xl font-black drop-shadow-sm">1,250 <span className="text-sm font-bold opacity-80">pts</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-amber-100 font-medium opacity-90">Siguiente nivel</p>
                      <p className="text-sm font-bold bg-white/20 px-2 py-0.5 rounded-md mt-1 inline-block">Faltan {pointsToNext} pts</p>
                    </div>
                  </div>
                  <Progress value={75} indicatorColor="bg-white" className="h-3 bg-amber-950/30" />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Leaderboard List */}
          <div className="px-5 mt-8">
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-xl font-bold text-foreground">Top Jugadores</h3>
              <p className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">Esta Semana</p>
            </div>

            <div className="flex flex-col gap-3">
              {LEADERBOARD_DATA.map((user, index) => {
                const position = index + 1;
                let positionIcon = <span className="font-bold text-muted-foreground w-7 text-center text-lg">{position}</span>;
                
                if (position === 1) positionIcon = <Medal className="w-7 h-7 text-yellow-500 drop-shadow-sm" />;
                if (position === 2) positionIcon = <Medal className="w-7 h-7 text-gray-400 drop-shadow-sm" />;
                if (position === 3) positionIcon = <Medal className="w-7 h-7 text-amber-700 drop-shadow-sm" />;

                let trendIcon = <Minus className="w-4 h-4 text-gray-400" />;
                if (user.trend === 'up') trendIcon = <ArrowUp className="w-4 h-4 text-green-500" />;
                if (user.trend === 'down') trendIcon = <ArrowDown className="w-4 h-4 text-red-500" />;

                return (
                  <div 
                    key={user.id} 
                    className={`flex items-center p-4 rounded-2xl transition-all ${
                      user.isCurrentUser 
                      ? 'bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-400 dark:border-amber-600 shadow-md scale-[1.02]' 
                      : 'bg-card border border-border hover:border-amber-200 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-center w-8 mr-3">
                      {positionIcon}
                    </div>
                    
                    <div className="text-4xl mr-4 bg-muted w-14 h-14 rounded-full flex items-center justify-center shadow-inner border border-white dark:border-gray-800">
                      {user.avatar}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className={`font-bold text-lg ${user.isCurrentUser ? 'text-amber-700 dark:text-amber-400' : 'text-foreground'}`}>
                        {user.name}
                      </h4>
                      <p className="text-sm font-medium text-muted-foreground">{user.score} <span className="text-xs">pts</span></p>
                    </div>

                    <div className="flex flex-col items-end gap-1 justify-center h-full">
                      {trendIcon}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
