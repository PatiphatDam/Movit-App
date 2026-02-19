import { Flame, Footprints, Zap, Clock, ChevronRight, Plus, TrendingUp } from "lucide-react";

const workouts = [
  {
    id: 1,
    name: "Morning Run",
    type: "Running",
    duration: "32 min",
    calories: 285,
    difficulty: "Medium",
    icon: "🏃",
    progress: 0,
  },
  {
    id: 2,
    name: "Upper Body Strength",
    type: "Strength",
    duration: "45 min",
    calories: 320,
    difficulty: "Hard",
    icon: "💪",
    progress: 0,
  },
  {
    id: 3,
    name: "Evening Yoga",
    type: "Flexibility",
    duration: "20 min",
    calories: 95,
    difficulty: "Easy",
    icon: "🧘",
    progress: 0,
  },
];

const difficultyColors: Record<string, string> = {
  Easy: "text-green-400 bg-green-400/10",
  Medium: "text-yellow-400 bg-yellow-400/10",
  Hard: "text-red-400 bg-red-400/10",
};

interface HomeScreenProps {
  onWorkoutSelect: (id: number) => void;
}

const HomeScreen = ({ onWorkoutSelect }: HomeScreenProps) => {
  return (
    <div className="min-h-screen bg-background pb-24 animate-fade-in">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <p className="text-muted-foreground text-sm font-medium">Good Morning 👋</p>
        <h1 className="text-3xl font-black mt-0.5 tracking-tight">Patiphat</h1>
      </div>

      {/* Streak Banner */}
      <div className="mx-5 mb-5">
        <div className="gradient-orange rounded-2xl px-5 py-4 flex items-center justify-between shadow-orange animate-pulse-orange">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
              <Flame className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-primary-foreground/80 text-xs font-medium">Current Streak</p>
              <p className="text-primary-foreground text-2xl font-black leading-none">7 Days 🔥</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-primary-foreground/80 text-xs">Best: 14 days</p>
            <p className="text-primary-foreground text-sm font-bold mt-0.5">Keep going!</p>
          </div>
        </div>
      </div>

      {/* Daily Stats */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold">Today's Stats</h2>
          <span className="text-xs text-muted-foreground">Feb 19</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {/* Steps */}
          <div className="surface-1 rounded-2xl p-4 shadow-card border border-border">
            <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center mb-2">
              <Footprints className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-xl font-black">8,432</p>
            <p className="text-xs text-muted-foreground mt-0.5">Steps</p>
            <div className="mt-2 w-full h-1.5 bg-surface-3 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: "84%" }} />
            </div>
          </div>

          {/* Calories */}
          <div className="surface-1 rounded-2xl p-4 shadow-card border border-border">
            <div className="w-8 h-8 bg-orange/10 rounded-lg flex items-center justify-center mb-2">
              <Zap className="w-4 h-4 text-orange" />
            </div>
            <p className="text-xl font-black">642</p>
            <p className="text-xs text-muted-foreground mt-0.5">Calories</p>
            <div className="mt-2 w-full h-1.5 bg-surface-3 rounded-full overflow-hidden">
              <div className="h-full bg-orange rounded-full" style={{ width: "64%" }} />
            </div>
          </div>

          {/* Minutes */}
          <div className="surface-1 rounded-2xl p-4 shadow-card border border-border">
            <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center mb-2">
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-xl font-black">47</p>
            <p className="text-xs text-muted-foreground mt-0.5">Minutes</p>
            <div className="mt-2 w-full h-1.5 bg-surface-3 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: "47%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="px-5 mb-5">
        <div className="surface-1 rounded-2xl p-4 shadow-card border border-border">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-orange" />
            <span className="text-sm font-bold">Weekly Progress</span>
            <span className="ml-auto text-xs text-orange font-semibold">5/7 days</span>
          </div>
          <div className="flex items-end gap-1.5 h-12">
            {[65, 80, 45, 90, 70, 0, 0].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-sm transition-all"
                  style={{
                    height: `${val}%`,
                    background: val > 0 ? "hsl(var(--orange))" : "hsl(var(--surface-3))",
                    opacity: val > 0 ? 1 : 0.4,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span key={i} className="flex-1 text-center text-xs text-muted-foreground">{d}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Workouts */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold">Today's Workouts</h2>
          <button className="text-xs text-orange font-semibold">See all</button>
        </div>

        <div className="space-y-3">
          {workouts.map((workout) => (
            <button
              key={workout.id}
              onClick={() => onWorkoutSelect(workout.id)}
              className="w-full surface-1 rounded-2xl p-4 shadow-card border border-border flex items-center gap-4 text-left hover:border-orange/30 transition-all active:scale-98"
            >
              <div className="w-12 h-12 bg-surface-3 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                {workout.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-bold text-sm truncate">{workout.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColors[workout.difficulty]}`}>
                    {workout.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {workout.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" /> {workout.calories} kcal
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </button>
          ))}
        </div>

        {/* Start Workout CTA */}
        <button className="w-full mt-4 gradient-orange text-primary-foreground font-bold py-4 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-orange hover:opacity-90 active:scale-95 transition-all">
          <Plus className="w-5 h-5" />
          Start New Workout
        </button>
      </div>
    </div>
  );
};

export { workouts };
export default HomeScreen;
