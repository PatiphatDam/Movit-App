import { useState } from "react";
import { Home, Dumbbell, User } from "lucide-react";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import WorkoutDetail from "./WorkoutDetail";
import ProfileScreen from "./ProfileScreen";

type Tab = "home" | "workouts" | "profile";
type Screen = "login" | "home" | "detail" | "profile";

const tabs = [
  { id: "home" as Tab, label: "Home", icon: Home },
  { id: "workouts" as Tab, label: "Workouts", icon: Dumbbell },
  { id: "profile" as Tab, label: "Profile", icon: User },
];

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab("home");
  };

  const handleWorkoutSelect = (id: number) => {
    setSelectedWorkout(id);
  };

  const handleBackFromDetail = () => {
    setSelectedWorkout(null);
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSelectedWorkout(null);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Determine screen to show
  const showDetail = selectedWorkout !== null && activeTab === "home";

  return (
    <div className="min-h-screen bg-background relative">
      {/* Main Content */}
      <div className="max-w-md mx-auto">
        {showDetail ? (
          <WorkoutDetail workoutId={selectedWorkout!} onBack={handleBackFromDetail} />
        ) : activeTab === "home" ? (
          <HomeScreen onWorkoutSelect={handleWorkoutSelect} />
        ) : activeTab === "workouts" ? (
          <WorkoutsTab onWorkoutSelect={handleWorkoutSelect} />
        ) : (
          <ProfileScreen onLogout={handleLogout} />
        )}
      </div>

      {/* Bottom Tab Bar */}
      {!showDetail && (
        <nav className="fixed bottom-0 left-0 right-0 z-50">
          <div className="max-w-md mx-auto">
            <div className="surface-1 border-t border-border px-2 py-2 flex justify-around">
              {tabs.map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => handleTabChange(id)}
                    className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
                      isActive ? "text-orange" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div className={`relative ${isActive ? "scale-110" : ""} transition-transform`}>
                      <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                      {isActive && (
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange rounded-full" />
                      )}
                    </div>
                    <span className={`text-xs font-${isActive ? "bold" : "medium"}`}>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

// Workouts tab — list of all workouts
const workoutsList = [
  { id: 1, name: "Morning Run", type: "Running", icon: "🏃", duration: "32 min", calories: 285, difficulty: "Medium" },
  { id: 2, name: "Upper Body Strength", type: "Strength", icon: "💪", duration: "45 min", calories: 320, difficulty: "Hard" },
  { id: 3, name: "Evening Yoga", type: "Flexibility", icon: "🧘", duration: "20 min", calories: 95, difficulty: "Easy" },
  { id: 4, name: "HIIT Cardio", type: "Cardio", icon: "🔥", duration: "25 min", calories: 380, difficulty: "Hard" },
  { id: 5, name: "Core Crusher", type: "Strength", icon: "⚡", duration: "30 min", calories: 210, difficulty: "Medium" },
  { id: 6, name: "Recovery Stretch", type: "Flexibility", icon: "🌿", duration: "15 min", calories: 60, difficulty: "Easy" },
];

const difficultyColors: Record<string, string> = {
  Easy: "text-green-400 bg-green-400/10",
  Medium: "text-yellow-400 bg-yellow-400/10",
  Hard: "text-red-400 bg-red-400/10",
};

const WorkoutsTab = ({ onWorkoutSelect }: { onWorkoutSelect: (id: number) => void }) => {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Running", "Strength", "Cardio", "Flexibility"];

  const filtered = filter === "All" ? workoutsList : workoutsList.filter((w) => w.type === filter);

  return (
    <div className="min-h-screen bg-background pb-24 animate-fade-in">
      <div className="px-5 pt-12 pb-4">
        <h1 className="text-2xl font-black">Workouts</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Choose your workout</p>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 px-5 mb-4 overflow-x-auto pb-1 scrollbar-hide">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              filter === f
                ? "gradient-orange text-primary-foreground shadow-orange"
                : "surface-1 text-muted-foreground border border-border hover:border-orange/30"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Workout Cards */}
      <div className="px-5 space-y-3">
        {filtered.map((workout) => (
          <button
            key={workout.id}
            onClick={() => onWorkoutSelect(workout.id > 3 ? (workout.id % 3) + 1 : workout.id)}
            className="w-full surface-1 rounded-2xl p-4 shadow-card border border-border flex items-center gap-4 text-left hover:border-orange/30 transition-all active:scale-98"
          >
            <div className="w-14 h-14 bg-surface-3 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 border border-border">
              {workout.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold text-sm truncate">{workout.name}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColors[workout.difficulty]}`}>
                  {workout.difficulty}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{workout.type}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span>⏱ {workout.duration}</span>
                <span>⚡ {workout.calories} kcal</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Index;
